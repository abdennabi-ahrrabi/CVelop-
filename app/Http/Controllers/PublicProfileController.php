<?php

namespace App\Http\Controllers;

use App\Models\BusinessCard;
use App\Models\ProfileView;
use App\Models\Resume;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PublicProfileController extends Controller
{
    public function showProfile(string $username)
    {
        $user = User::where('username', $username)
            ->where('is_public', true)
            ->firstOrFail();

        // Record the view
        ProfileView::recordView(
            userId: $user->id,
            viewType: 'profile',
            viewerId: auth()->id(),
            source: request()->get('src') === 'qr' ? 'qr_code' : 'direct'
        );

        $publicResumes = $user->resumes()
            ->where('is_public', true)
            ->latest()
            ->get();

        $primaryCard = $user->primaryBusinessCard;

        // Get visible projects
        $projects = $user->projects()
            ->visible()
            ->ordered()
            ->get();

        return Inertia::render('Public/Profile', [
            'profile' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'headline' => $user->headline,
                'bio' => $user->bio,
                'avatar' => $user->getAvatarUrl(),
                'cover_image' => $user->getCoverImageUrl(),
                'location' => $user->location,
                'website' => $user->website,
                'email' => $user->show_email ? $user->email : null,
                'phone' => $user->show_phone ? $user->phone : null,
                'social_links' => $user->getSocialLinks(),
                'custom_links' => $user->custom_links ?? [],
                'theme' => $user->theme ?? 'default',
                'show_projects' => $user->show_projects ?? true,
                'show_resumes' => $user->show_resumes ?? true,
                'show_business_card' => $user->show_business_card ?? true,
                'show_contact_form' => $user->show_contact_form ?? true,
                'show_social_links' => $user->show_social_links ?? true,
            ],
            'resumes' => $publicResumes->map(fn ($resume) => [
                'id' => $resume->id,
                'title' => $resume->title,
                'slug' => $resume->slug ?? $resume->id,
            ]),
            'projects' => $projects->map(fn ($project) => [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'image' => $project->getImageUrl(),
                'url' => $project->url,
                'github_url' => $project->github_url,
                'technologies' => $project->technologies ?? [],
                'category' => $project->category,
                'is_featured' => $project->is_featured,
            ]),
            'businessCard' => $primaryCard ? [
                'slug' => $primaryCard->slug,
                'display_name' => $primaryCard->display_name,
                'title' => $primaryCard->title,
                'company' => $primaryCard->company,
                'email' => $primaryCard->email,
                'phone' => $primaryCard->phone,
                'location' => $primaryCard->location,
                'website' => $primaryCard->website,
            ] : null,
        ]);
    }

    public function showBusinessCard(string $slug)
    {
        $card = BusinessCard::where('slug', $slug)
            ->where('is_active', true)
            ->with('user')
            ->firstOrFail();

        $source = request()->get('src') === 'qr' ? 'qr_code' : 'direct';

        // Record the view
        ProfileView::recordView(
            userId: $card->user_id,
            viewType: 'card',
            businessCardId: $card->id,
            viewerId: auth()->id(),
            source: $source
        );

        // Increment counters
        $card->incrementViewCount();
        if ($source === 'qr_code') {
            $card->incrementQrScanCount();
        }

        return Inertia::render('Public/BusinessCard', [
            'card' => [
                'id' => $card->id,
                'slug' => $card->slug,
                'display_name' => $card->display_name,
                'title' => $card->title,
                'company' => $card->company,
                'email' => $card->email,
                'phone' => $card->phone,
                'website' => $card->website,
                'location' => $card->location,
                'tagline' => $card->tagline,
                'social_links' => $card->getSocialLinks(),
                'custom_links' => $card->custom_links ?? [],
                'avatar' => $card->avatar ? asset('storage/' . $card->avatar) : $card->user->getAvatarUrl(),
                'logo' => $card->logo ? asset('storage/' . $card->logo) : null,
                'background_image' => $card->background_image ? asset('storage/' . $card->background_image) : null,
                'template' => $card->template,
                'qr_url' => route('public.card.qr', $card->slug),
                'public_url' => $card->getPublicUrl(),
                'colors' => [
                    'primary' => $card->color_primary,
                    'secondary' => $card->color_secondary,
                    'background' => $card->color_background,
                    'text' => $card->color_text,
                    'accent' => $card->color_accent,
                ],
                // Design settings for glassmorphism templates
                'design' => [
                    'glass_blur' => $card->glass_blur ?? '12',
                    'glass_opacity' => $card->glass_opacity ?? '0.15',
                    'glass_border' => $card->glass_border ?? true,
                    'font_family' => $card->font_family ?? 'inter',
                    'font_weight_heading' => $card->font_weight_heading ?? '700',
                    'font_weight_body' => $card->font_weight_body ?? '400',
                    'border_radius' => $card->border_radius ?? '24',
                    'border_width' => $card->border_width ?? '1',
                    'border_opacity' => $card->border_opacity ?? '0.2',
                    'shadow_intensity' => $card->shadow_intensity ?? 'medium',
                    'animation_style' => $card->animation_style ?? 'none',
                    'hover_effect' => $card->hover_effect ?? 'lift',
                    'auto_contrast' => $card->auto_contrast ?? true,
                ],
            ],
            'owner' => [
                'id' => $card->user->id,
                'name' => $card->user->name,
                'username' => $card->user->username,
                'profile_url' => $card->user->getProfileUrl(),
                'is_public' => $card->user->is_public,
            ],
        ]);
    }

    public function getCardQrCode(string $slug)
    {
        $card = BusinessCard::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // Get primary color RGB values
        $primaryColor = $card->color_primary ?? '#8b5cf6';
        $rgb = $this->hexToRgb($primaryColor);

        $qrCode = QrCode::format('svg')
            ->size(300)
            ->style('round')
            ->eye('circle')
            ->color(...$rgb)
            ->backgroundColor(255, 255, 255)
            ->margin(2)
            ->errorCorrection('M')
            ->generate($card->getPublicUrl() . '?src=qr');

        return response($qrCode)->header('Content-Type', 'image/svg+xml');
    }

    private function hexToRgb(string $hex): array
    {
        $hex = ltrim($hex, '#');

        return [
            hexdec(substr($hex, 0, 2)),
            hexdec(substr($hex, 2, 2)),
            hexdec(substr($hex, 4, 2)),
        ];
    }

    public function showResume(string $username, int $resumeId)
    {
        $user = User::where('username', $username)->firstOrFail();

        $resume = Resume::where('id', $resumeId)
            ->where('user_id', $user->id)
            ->where('is_public', true)
            ->with(['personalInfo', 'workExperiences', 'educations', 'skills', 'template'])
            ->firstOrFail();

        // Record the view
        ProfileView::recordView(
            userId: $user->id,
            viewType: 'resume',
            resumeId: $resume->id,
            viewerId: auth()->id(),
            source: request()->get('src') === 'qr' ? 'qr_code' : 'direct'
        );

        return Inertia::render('Public/Resume', [
            'resume' => $resume,
            'owner' => [
                'name' => $user->name,
                'username' => $user->username,
                'profile_url' => $user->getProfileUrl(),
            ],
        ]);
    }

    public function generateQrCode(Request $request)
    {
        $url = $request->input('url');
        $size = $request->input('size', 200);
        $color = $request->input('color', '139,92,246'); // violet-500

        $qrCode = QrCode::format('svg')
            ->size($size)
            ->color(...explode(',', $color))
            ->backgroundColor(255, 255, 255)
            ->margin(1)
            ->generate($url);

        return response($qrCode)->header('Content-Type', 'image/svg+xml');
    }

    public function trackClick(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'link_type' => 'required|string',
            'link_url' => 'required|string',
            'business_card_id' => 'nullable|exists:business_cards,id',
        ]);

        \App\Models\LinkClick::recordClick(
            userId: $request->user_id,
            linkType: $request->link_type,
            linkUrl: $request->link_url,
            businessCardId: $request->business_card_id
        );

        if ($request->business_card_id) {
            BusinessCard::find($request->business_card_id)?->incrementLinkClickCount();
        }

        return response()->json(['success' => true]);
    }
}
