<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display inbox for authenticated user
     */
    public function index(Request $request)
    {
        $messages = $request->user()
            ->contactMessages()
            ->orderByDesc('created_at')
            ->paginate(20);

        return Inertia::render('Messages/Index', [
            'messages' => $messages,
            'unreadCount' => $request->user()->unreadMessagesCount(),
        ]);
    }

    /**
     * Show a specific message
     */
    public function show(Request $request, ContactMessage $message)
    {
        // Ensure user owns this message
        if ($message->user_id !== $request->user()->id) {
            abort(403);
        }

        // Mark as read
        if (!$message->is_read) {
            $message->markAsRead();
        }

        return Inertia::render('Messages/Show', [
            'message' => $message,
        ]);
    }

    /**
     * Store a new contact message (public endpoint)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'sender_name' => 'required|string|max:255',
            'sender_email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $message = ContactMessage::create([
            ...$validated,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        // Optionally send email notification to user
        $user = User::find($validated['user_id']);
        if ($user && $user->email) {
            // Could send notification email here
            // Mail::to($user)->send(new NewContactMessage($message));
        }

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully!',
        ]);
    }

    /**
     * Mark message as read
     */
    public function markAsRead(Request $request, ContactMessage $message)
    {
        if ($message->user_id !== $request->user()->id) {
            abort(403);
        }

        $message->markAsRead();

        return response()->json(['success' => true]);
    }

    /**
     * Delete a message
     */
    public function destroy(Request $request, ContactMessage $message)
    {
        if ($message->user_id !== $request->user()->id) {
            abort(403);
        }

        $message->delete();

        return redirect()->route('messages.index')->with('success', 'Message deleted.');
    }
}
