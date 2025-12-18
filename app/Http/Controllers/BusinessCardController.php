<?php

namespace App\Http\Controllers;

use App\Models\BusinessCard;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class BusinessCardController extends Controller
{
    public function index()
    {
        $cards = auth()->user()->businessCards()
            ->orderBy('is_primary', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('BusinessCards/Index', [
            'cards' => $cards->map(fn ($card) => [
                'id' => $card->id,
                'name' => $card->name,
                'slug' => $card->slug,
                'display_name' => $card->display_name,
                'title' => $card->title,
                'company' => $card->company,
                'template' => $card->template,
                'is_primary' => $card->is_primary,
                'is_active' => $card->is_active,
                'view_count' => $card->view_count,
                'qr_scan_count' => $card->qr_scan_count,
                'link_click_count' => $card->link_click_count,
                'public_url' => $card->getPublicUrl(),
                'colors' => [
                    'primary' => $card->color_primary,
                    'secondary' => $card->color_secondary,
                ],
                'created_at' => $card->created_at->format('M d, Y'),
            ]),
        ]);
    }

    public function create()
    {
        $user = auth()->user();

        return Inertia::render('BusinessCards/Editor', [
            'card' => null,
            'defaults' => [
                'display_name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'website' => $user->website,
                'location' => $user->location,
                'linkedin_url' => $user->linkedin_url,
                'twitter_url' => $user->twitter_url,
                'github_url' => $user->github_url,
                'instagram_url' => $user->instagram_url,
            ],
            'templates' => $this->getTemplates(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'display_name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'website' => 'nullable|url|max:255',
            'location' => 'nullable|string|max:255',
            'tagline' => 'nullable|string|max:500',
            'linkedin_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'custom_links' => 'nullable|array',
            'template' => 'nullable|string|max:50',
            'color_primary' => 'nullable|string|max:20',
            'color_secondary' => 'nullable|string|max:20',
            'color_background' => 'nullable|string|max:20',
            'color_text' => 'nullable|string|max:20',
            'color_accent' => 'nullable|string|max:20',
            'is_primary' => 'boolean',
            // Glassmorphism settings
            'glass_blur' => 'nullable|string|max:10',
            'glass_opacity' => 'nullable|string|max:10',
            'glass_border' => 'boolean',
            // Typography
            'font_family' => 'nullable|string|in:inter,poppins,playfair,montserrat,roboto,outfit',
            'font_weight_heading' => 'nullable|string|in:400,500,600,700,800',
            'font_weight_body' => 'nullable|string|in:300,400,500,600',
            // Border & Shadow
            'border_radius' => 'nullable|string|max:10',
            'border_width' => 'nullable|string|max:10',
            'border_opacity' => 'nullable|string|max:10',
            'shadow_intensity' => 'nullable|string|in:none,subtle,medium,strong',
            // Animation settings
            'animation_style' => 'nullable|string|in:none,fade,slide,scale,float',
            'hover_effect' => 'nullable|string|in:none,lift,glow,scale,tilt',
            // Smart features
            'auto_contrast' => 'boolean',
        ]);

        $user = auth()->user();

        // If this is set as primary, unset other primary cards
        if ($request->is_primary) {
            $user->businessCards()->update(['is_primary' => false]);
        }

        // If user has no cards yet, make this one primary
        if ($user->businessCards()->count() === 0) {
            $validated['is_primary'] = true;
        }

        $card = $user->businessCards()->create($validated);

        return redirect()->route('business-cards.edit', $card)
            ->with('success', 'Business card created successfully!');
    }

    public function edit(BusinessCard $businessCard)
    {
        $this->authorize('update', $businessCard);

        return Inertia::render('BusinessCards/Editor', [
            'card' => [
                'id' => $businessCard->id,
                'name' => $businessCard->name,
                'slug' => $businessCard->slug,
                'display_name' => $businessCard->display_name,
                'title' => $businessCard->title,
                'company' => $businessCard->company,
                'email' => $businessCard->email,
                'phone' => $businessCard->phone,
                'website' => $businessCard->website,
                'location' => $businessCard->location,
                'tagline' => $businessCard->tagline,
                'linkedin_url' => $businessCard->linkedin_url,
                'twitter_url' => $businessCard->twitter_url,
                'github_url' => $businessCard->github_url,
                'instagram_url' => $businessCard->instagram_url,
                'custom_links' => $businessCard->custom_links ?? [],
                'template' => $businessCard->template,
                'color_primary' => $businessCard->color_primary,
                'color_secondary' => $businessCard->color_secondary,
                'color_background' => $businessCard->color_background,
                'color_text' => $businessCard->color_text,
                'color_accent' => $businessCard->color_accent,
                'avatar' => $businessCard->avatar ? asset('storage/' . $businessCard->avatar) : null,
                'logo' => $businessCard->logo ? asset('storage/' . $businessCard->logo) : null,
                'is_primary' => $businessCard->is_primary,
                'is_active' => $businessCard->is_active,
                'public_url' => $businessCard->getPublicUrl(),
                'qr_url' => route('business-cards.qr', $businessCard->id),
                // Glassmorphism settings
                'glass_blur' => $businessCard->glass_blur ?? '12',
                'glass_opacity' => $businessCard->glass_opacity ?? '0.15',
                'glass_border' => $businessCard->glass_border ?? true,
                // Typography
                'font_family' => $businessCard->font_family ?? 'inter',
                'font_weight_heading' => $businessCard->font_weight_heading ?? '700',
                'font_weight_body' => $businessCard->font_weight_body ?? '400',
                // Border & Shadow
                'border_radius' => $businessCard->border_radius ?? '24',
                'border_width' => $businessCard->border_width ?? '1',
                'border_opacity' => $businessCard->border_opacity ?? '0.2',
                'shadow_intensity' => $businessCard->shadow_intensity ?? 'medium',
                // Animation settings
                'animation_style' => $businessCard->animation_style ?? 'none',
                'hover_effect' => $businessCard->hover_effect ?? 'lift',
                // Smart features
                'auto_contrast' => $businessCard->auto_contrast ?? true,
                // Design settings object for convenience
                'design_settings' => $businessCard->getDesignSettings(),
            ],
            'templates' => $this->getTemplates(),
        ]);
    }

    public function update(Request $request, BusinessCard $businessCard)
    {
        $this->authorize('update', $businessCard);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'display_name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'website' => 'nullable|url|max:255',
            'location' => 'nullable|string|max:255',
            'tagline' => 'nullable|string|max:500',
            'linkedin_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'custom_links' => 'nullable|array',
            'template' => 'nullable|string|max:50',
            'color_primary' => 'nullable|string|max:20',
            'color_secondary' => 'nullable|string|max:20',
            'color_background' => 'nullable|string|max:20',
            'color_text' => 'nullable|string|max:20',
            'color_accent' => 'nullable|string|max:20',
            'is_primary' => 'boolean',
            'is_active' => 'boolean',
            // Glassmorphism settings
            'glass_blur' => 'nullable|string|max:10',
            'glass_opacity' => 'nullable|string|max:10',
            'glass_border' => 'boolean',
            // Typography
            'font_family' => 'nullable|string|in:inter,poppins,playfair,montserrat,roboto,outfit',
            'font_weight_heading' => 'nullable|string|in:400,500,600,700,800',
            'font_weight_body' => 'nullable|string|in:300,400,500,600',
            // Border & Shadow
            'border_radius' => 'nullable|string|max:10',
            'border_width' => 'nullable|string|max:10',
            'border_opacity' => 'nullable|string|max:10',
            'shadow_intensity' => 'nullable|string|in:none,subtle,medium,strong',
            // Animation settings
            'animation_style' => 'nullable|string|in:none,fade,slide,scale,float',
            'hover_effect' => 'nullable|string|in:none,lift,glow,scale,tilt',
            // Smart features
            'auto_contrast' => 'boolean',
        ]);

        // If this is set as primary, unset other primary cards
        if ($request->is_primary && !$businessCard->is_primary) {
            auth()->user()->businessCards()->update(['is_primary' => false]);
        }

        $businessCard->update($validated);

        return back()->with('success', 'Business card updated successfully!');
    }

    public function destroy(BusinessCard $businessCard)
    {
        $this->authorize('delete', $businessCard);

        // Delete associated images
        if ($businessCard->avatar) {
            Storage::disk('public')->delete($businessCard->avatar);
        }
        if ($businessCard->logo) {
            Storage::disk('public')->delete($businessCard->logo);
        }

        $businessCard->delete();

        return redirect()->route('business-cards.index')
            ->with('success', 'Business card deleted successfully!');
    }

    public function uploadAvatar(Request $request, BusinessCard $businessCard)
    {
        $this->authorize('update', $businessCard);

        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        // Delete old avatar
        if ($businessCard->avatar) {
            Storage::disk('public')->delete($businessCard->avatar);
        }

        $path = $request->file('avatar')->store('business-cards/avatars', 'public');
        $businessCard->update(['avatar' => $path]);

        return back()->with('success', 'Avatar uploaded successfully!');
    }

    public function uploadLogo(Request $request, BusinessCard $businessCard)
    {
        $this->authorize('update', $businessCard);

        $request->validate([
            'logo' => 'required|image|max:2048',
        ]);

        // Delete old logo
        if ($businessCard->logo) {
            Storage::disk('public')->delete($businessCard->logo);
        }

        $path = $request->file('logo')->store('business-cards/logos', 'public');
        $businessCard->update(['logo' => $path]);

        return back()->with('success', 'Logo uploaded successfully!');
    }

    public function getQrCode(BusinessCard $businessCard)
    {
        $this->authorize('view', $businessCard);

        $qrCode = QrCode::format('svg')
            ->size(300)
            ->style('round')
            ->eye('circle')
            ->color(...$this->hexToRgb($businessCard->color_primary))
            ->backgroundColor(255, 255, 255)
            ->margin(2)
            ->errorCorrection('M')
            ->generate($businessCard->getQrCodeUrl());

        return response($qrCode)->header('Content-Type', 'image/svg+xml');
    }

    public function downloadQrCode(BusinessCard $businessCard)
    {
        $this->authorize('view', $businessCard);

        // Generate styled QR code with rounded corners
        $qrCode = QrCode::format('svg')
            ->size(600)
            ->style('round')
            ->eye('circle')
            ->color(...$this->hexToRgb($businessCard->color_primary))
            ->backgroundColor(255, 255, 255)
            ->margin(3)
            ->errorCorrection('H')
            ->generate($businessCard->getQrCodeUrl());

        return response($qrCode)
            ->header('Content-Type', 'image/svg+xml')
            ->header('Content-Disposition', 'attachment; filename="' . $businessCard->slug . '-qr.svg"');
    }

    public function downloadPdf(BusinessCard $businessCard)
    {
        $this->authorize('view', $businessCard);

        // Determine QR code color based on template and background
        $qrColor = $this->getQrColorForTemplate($businessCard);

        // Generate styled QR code with rounded corners for PDF
        $qrCode = QrCode::format('svg')
            ->size(200)
            ->style('round')
            ->eye('circle')
            ->color(...$qrColor)
            ->backgroundColor(255, 255, 255)
            ->margin(1)
            ->errorCorrection('M')
            ->generate($businessCard->getQrCodeUrl());

        $qrBase64 = 'data:image/svg+xml;base64,' . base64_encode($qrCode);

        $pdf = Pdf::loadView('pdf.business-card', [
            'card' => $businessCard,
            'qrCode' => $qrBase64,
        ]);

        // Use letter size paper with card centered and crop marks
        $pdf->setPaper('letter', 'portrait');

        return $pdf->download($businessCard->slug . '-card.pdf');
    }

    public function downloadPrintSheet(BusinessCard $businessCard)
    {
        $this->authorize('view', $businessCard);

        // Determine QR code color based on template and background
        $qrColor = $this->getQrColorForTemplate($businessCard);

        // Generate styled QR code with rounded corners for print sheet
        $qrCode = QrCode::format('svg')
            ->size(200)
            ->style('round')
            ->eye('circle')
            ->color(...$qrColor)
            ->backgroundColor(255, 255, 255)
            ->margin(1)
            ->errorCorrection('M')
            ->generate($businessCard->getQrCodeUrl());

        $qrBase64 = 'data:image/svg+xml;base64,' . base64_encode($qrCode);

        $pdf = Pdf::loadView('pdf.business-card-sheet', [
            'card' => $businessCard,
            'qrCode' => $qrBase64,
            'cardsPerRow' => 2,
            'rows' => 5,
        ]);

        // Letter size paper
        $pdf->setPaper('letter', 'portrait');

        return $pdf->download($businessCard->slug . '-print-sheet.pdf');
    }

    private function getQrColorForTemplate(BusinessCard $businessCard): array
    {
        // For dark backgrounds, use primary color; for light backgrounds, use dark color
        $template = $businessCard->template ?? 'classic';
        $bgColor = $businessCard->color_background ?? '#ffffff';

        // Check if background is dark
        $isDark = $this->isColorDark($bgColor);

        // For glassmorphism templates with dark backgrounds, use primary color
        if (in_array($template, ['glass', 'aurora', 'frost', 'prism', 'executive']) || $isDark) {
            return $this->hexToRgb($businessCard->color_primary ?? '#8b5cf6');
        }

        // For light backgrounds, use a dark color for QR code readability
        return $this->hexToRgb($businessCard->color_primary ?? '#1a1a1a');
    }

    private function isColorDark(string $hex): bool
    {
        $rgb = $this->hexToRgb($hex);
        // Calculate luminance
        $luminance = (0.299 * $rgb[0] + 0.587 * $rgb[1] + 0.114 * $rgb[2]) / 255;
        return $luminance < 0.5;
    }

    public function emailSignature(BusinessCard $businessCard)
    {
        $this->authorize('view', $businessCard);

        return Inertia::render('BusinessCards/EmailSignature', [
            'card' => [
                'id' => $businessCard->id,
                'display_name' => $businessCard->display_name,
                'title' => $businessCard->title,
                'company' => $businessCard->company,
                'email' => $businessCard->email,
                'phone' => $businessCard->phone,
                'website' => $businessCard->website,
                'location' => $businessCard->location,
                'linkedin_url' => $businessCard->linkedin_url,
                'twitter_url' => $businessCard->twitter_url,
                'github_url' => $businessCard->github_url,
                'avatar' => $businessCard->avatar ? asset('storage/' . $businessCard->avatar) : null,
                'logo' => $businessCard->logo ? asset('storage/' . $businessCard->logo) : null,
                'color_primary' => $businessCard->color_primary,
                'color_secondary' => $businessCard->color_secondary,
                'public_url' => $businessCard->getPublicUrl(),
            ],
        ]);
    }

    public function shareCard(Request $request, BusinessCard $businessCard)
    {
        $this->authorize('view', $businessCard);

        $request->validate([
            'email' => 'required|email',
            'message' => 'nullable|string|max:500',
        ]);

        // Send email with business card link
        \Mail::to($request->email)->send(new \App\Mail\ShareBusinessCard(
            $businessCard,
            auth()->user(),
            $request->message
        ));

        return back()->with('success', 'Business card shared successfully!');
    }

    public function nfcSetup(BusinessCard $businessCard)
    {
        $this->authorize('view', $businessCard);

        return Inertia::render('BusinessCards/NfcSetup', [
            'card' => [
                'id' => $businessCard->id,
                'name' => $businessCard->name,
                'slug' => $businessCard->slug,
                'display_name' => $businessCard->display_name,
                'public_url' => $businessCard->getPublicUrl(),
            ],
        ]);
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

    private function getTemplates(): array
    {
        return [
            // Classic templates
            ['id' => 'modern', 'name' => 'Modern', 'description' => 'Clean and professional', 'category' => 'classic'],
            ['id' => 'minimal', 'name' => 'Minimal', 'description' => 'Simple and elegant', 'category' => 'classic'],
            ['id' => 'bold', 'name' => 'Bold', 'description' => 'Stand out with impact', 'category' => 'classic'],
            ['id' => 'creative', 'name' => 'Creative', 'description' => 'For designers and artists', 'category' => 'classic'],
            ['id' => 'corporate', 'name' => 'Corporate', 'description' => 'Business professional', 'category' => 'classic'],
            ['id' => 'gradient', 'name' => 'Gradient', 'description' => 'Colorful and vibrant', 'category' => 'classic'],
            // Glassmorphism templates
            ['id' => 'glass', 'name' => 'Glass', 'description' => 'Elegant frosted glass', 'category' => 'glass'],
            ['id' => 'aurora', 'name' => 'Aurora', 'description' => 'Animated gradient backdrop', 'category' => 'glass'],
            ['id' => 'frost', 'name' => 'Frost', 'description' => 'Ice-cold transparency', 'category' => 'glass'],
            ['id' => 'prism', 'name' => 'Prism', 'description' => 'Light-refracting effects', 'category' => 'glass'],
        ];
    }
}
