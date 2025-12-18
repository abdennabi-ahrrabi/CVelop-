<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileSettingsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Profile/Settings', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'username' => $user->username,
                'headline' => $user->headline,
                'bio' => $user->bio,
                'avatar' => $user->getAvatarUrl(),
                'cover_image' => $user->getCoverImageUrl(),
                'location' => $user->location,
                'phone' => $user->phone,
                'website' => $user->website,
                'linkedin_url' => $user->linkedin_url,
                'twitter_url' => $user->twitter_url,
                'github_url' => $user->github_url,
                'instagram_url' => $user->instagram_url,
                'facebook_url' => $user->facebook_url,
                'youtube_url' => $user->youtube_url,
                'tiktok_url' => $user->tiktok_url,
                'dribbble_url' => $user->dribbble_url,
                'behance_url' => $user->behance_url,
                'is_public' => $user->is_public,
                'show_email' => $user->show_email,
                'show_phone' => $user->show_phone,
                'show_projects' => $user->show_projects ?? true,
                'show_resumes' => $user->show_resumes ?? true,
                'show_business_card' => $user->show_business_card ?? true,
                'show_contact_form' => $user->show_contact_form ?? true,
                'show_social_links' => $user->show_social_links ?? true,
                'theme' => $user->theme ?? 'default',
                'profile_layout' => $user->profile_layout ?? 'default',
                'profile_colors' => $user->profile_colors,
                'custom_links' => $user->custom_links ?? [],
                'profile_url' => $user->getProfileUrl(),
            ],
            'themes' => $this->getThemes(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:50|unique:users,username,' . $request->user()->id . '|alpha_dash',
            'headline' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'location' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'website' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'youtube_url' => 'nullable|url|max:255',
            'tiktok_url' => 'nullable|url|max:255',
            'dribbble_url' => 'nullable|url|max:255',
            'behance_url' => 'nullable|url|max:255',
            'is_public' => 'boolean',
            'show_email' => 'boolean',
            'show_phone' => 'boolean',
            'show_projects' => 'boolean',
            'show_resumes' => 'boolean',
            'show_business_card' => 'boolean',
            'show_contact_form' => 'boolean',
            'show_social_links' => 'boolean',
            'theme' => 'nullable|string|max:50',
            'profile_layout' => 'nullable|string|max:50',
            'profile_colors' => 'nullable|array',
            'custom_links' => 'nullable|array',
            'custom_links.*.title' => 'required_with:custom_links|string|max:100',
            'custom_links.*.url' => 'required_with:custom_links|url|max:255',
        ]);

        $request->user()->update($validated);

        return back()->with('success', 'Profile settings updated successfully!');
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        $user = $request->user();

        // Delete old avatar
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');
        $user->update(['avatar' => $path]);

        return back()->with('success', 'Avatar updated successfully!');
    }

    public function uploadCoverImage(Request $request)
    {
        $request->validate([
            'cover_image' => 'required|image|max:5120',
        ]);

        $user = $request->user();

        // Delete old cover image
        if ($user->cover_image) {
            Storage::disk('public')->delete($user->cover_image);
        }

        $path = $request->file('cover_image')->store('covers', 'public');
        $user->update(['cover_image' => $path]);

        return back()->with('success', 'Cover image updated successfully!');
    }

    private function getThemes(): array
    {
        return [
            [
                'id' => 'default',
                'name' => 'Default',
                'description' => 'Clean dark theme with violet accents',
                'preview' => [
                    'background' => '#0a0a0f',
                    'accent' => '#8b5cf6',
                    'text' => '#ffffff',
                ],
            ],
            [
                'id' => 'minimal',
                'name' => 'Minimal',
                'description' => 'Simple and elegant white theme',
                'preview' => [
                    'background' => '#ffffff',
                    'accent' => '#1a1a1a',
                    'text' => '#1a1a1a',
                ],
            ],
            [
                'id' => 'ocean',
                'name' => 'Ocean',
                'description' => 'Deep blue professional theme',
                'preview' => [
                    'background' => '#0c1929',
                    'accent' => '#38bdf8',
                    'text' => '#ffffff',
                ],
            ],
            [
                'id' => 'forest',
                'name' => 'Forest',
                'description' => 'Nature-inspired green theme',
                'preview' => [
                    'background' => '#0a1a0f',
                    'accent' => '#22c55e',
                    'text' => '#ffffff',
                ],
            ],
            [
                'id' => 'sunset',
                'name' => 'Sunset',
                'description' => 'Warm orange and pink gradients',
                'preview' => [
                    'background' => '#1a0a0f',
                    'accent' => '#f97316',
                    'text' => '#ffffff',
                ],
            ],
            [
                'id' => 'neon',
                'name' => 'Neon',
                'description' => 'Bold cyber-punk inspired',
                'preview' => [
                    'background' => '#0a0a1a',
                    'accent' => '#e11d48',
                    'text' => '#ffffff',
                ],
            ],
        ];
    }
}
