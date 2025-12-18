<?php

namespace App\Http\Controllers;

use App\Models\BusinessCard;
use App\Models\CardLead;
use App\Mail\NewLeadNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class CardLeadController extends Controller
{
    public function index()
    {
        $leads = CardLead::forUser(auth()->id())
            ->with('businessCard:id,name,display_name')
            ->latest()
            ->paginate(20);

        $unreadCount = CardLead::forUser(auth()->id())->unread()->count();

        return Inertia::render('Leads/Index', [
            'leads' => $leads,
            'unreadCount' => $unreadCount,
        ]);
    }

    public function show(CardLead $lead)
    {
        $this->authorize('view', $lead);

        $lead->markAsRead();

        return Inertia::render('Leads/Show', [
            'lead' => $lead->load('businessCard:id,name,display_name'),
        ]);
    }

    public function store(Request $request, string $slug)
    {
        $card = BusinessCard::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'nullable|string|max:2000',
            'type' => 'nullable|in:contact,meeting,callback,inquiry',
        ]);

        $lead = CardLead::create([
            'business_card_id' => $card->id,
            'user_id' => $card->user_id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'company' => $validated['company'] ?? null,
            'subject' => $validated['subject'] ?? null,
            'message' => $validated['message'] ?? null,
            'type' => $validated['type'] ?? 'contact',
        ]);

        // Send notification email to card owner
        try {
            Mail::to($card->user)->send(new NewLeadNotification($lead, $card));
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Log::error('Failed to send lead notification: ' . $e->getMessage());
        }

        return back()->with('success', 'Your message has been sent successfully!');
    }

    public function markAsRead(CardLead $lead)
    {
        $this->authorize('update', $lead);

        $lead->markAsRead();

        return back()->with('success', 'Lead marked as read.');
    }

    public function reply(Request $request, CardLead $lead)
    {
        $this->authorize('update', $lead);

        $validated = $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        // Send reply email
        Mail::to($lead->email)->send(new \App\Mail\LeadReply(
            $lead,
            $lead->businessCard,
            auth()->user(),
            $validated['message']
        ));

        $lead->update(['status' => 'replied']);

        return back()->with('success', 'Reply sent successfully!');
    }

    public function destroy(CardLead $lead)
    {
        $this->authorize('delete', $lead);

        $lead->delete();

        return redirect()->route('leads.index')
            ->with('success', 'Lead deleted successfully.');
    }
}
