<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use App\Models\BusinessCard;
use App\Models\ProfileView;
use App\Models\LinkClick;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Get counts
        $resumeCount = Resume::where('user_id', $user->id)->count();
        $cardCount = BusinessCard::where('user_id', $user->id)->count();

        // Get total views (profile views + resume views)
        $totalViews = ProfileView::where('user_id', $user->id)->count();

        // Get total clicks on links
        $totalClicks = LinkClick::whereHas('businessCard', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->count();

        // Calculate click rate (clicks / views * 100)
        $clickRate = $totalViews > 0 ? round(($totalClicks / $totalViews) * 100, 1) : 0;

        // Get views from last month for comparison
        $lastMonthStart = Carbon::now()->subMonth()->startOfMonth();
        $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth();
        $thisMonthStart = Carbon::now()->startOfMonth();

        $lastMonthViews = ProfileView::where('user_id', $user->id)
            ->whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
            ->count();

        $thisMonthViews = ProfileView::where('user_id', $user->id)
            ->where('created_at', '>=', $thisMonthStart)
            ->count();

        $viewsChange = $lastMonthViews > 0
            ? round((($thisMonthViews - $lastMonthViews) / $lastMonthViews) * 100, 1)
            : ($thisMonthViews > 0 ? 100 : 0);

        // Get recent activity
        $recentActivity = collect();

        // Add recent profile views
        $recentViews = ProfileView::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($view) {
                return [
                    'type' => 'view',
                    'message' => 'Someone viewed your profile',
                    'time' => $view->created_at,
                    'time_ago' => $view->created_at->diffForHumans(),
                ];
            });

        // Add recent link clicks
        $recentClicks = LinkClick::whereHas('businessCard', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
            ->with('businessCard')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($click) {
                return [
                    'type' => 'click',
                    'message' => "Someone clicked '{$click->link_type}' on your card",
                    'time' => $click->created_at,
                    'time_ago' => $click->created_at->diffForHumans(),
                ];
            });

        $recentActivity = $recentViews->merge($recentClicks)
            ->sortByDesc('time')
            ->take(5)
            ->values();

        // Get recent resumes
        $recentResumes = Resume::where('user_id', $user->id)
            ->latest()
            ->take(3)
            ->get(['id', 'title', 'updated_at'])
            ->map(function ($resume) {
                return [
                    'id' => $resume->id,
                    'title' => $resume->title,
                    'updated_ago' => $resume->updated_at->diffForHumans(),
                ];
            });

        // Get recent business cards
        $recentCards = BusinessCard::where('user_id', $user->id)
            ->latest()
            ->take(3)
            ->get(['id', 'name', 'slug', 'updated_at'])
            ->map(function ($card) {
                return [
                    'id' => $card->id,
                    'name' => $card->name,
                    'slug' => $card->slug,
                    'updated_ago' => $card->updated_at->diffForHumans(),
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalViews' => $totalViews,
                'resumeCount' => $resumeCount,
                'cardCount' => $cardCount,
                'clickRate' => $clickRate,
                'viewsChange' => $viewsChange,
            ],
            'recentActivity' => $recentActivity,
            'recentResumes' => $recentResumes,
            'recentCards' => $recentCards,
        ]);
    }
}
