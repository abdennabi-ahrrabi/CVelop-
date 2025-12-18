<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class BusinessCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'is_primary',
        'display_name',
        'title',
        'company',
        'email',
        'phone',
        'website',
        'location',
        'tagline',
        'linkedin_url',
        'twitter_url',
        'github_url',
        'instagram_url',
        'custom_links',
        'template',
        'color_primary',
        'color_secondary',
        'color_background',
        'color_text',
        'color_accent',
        'avatar',
        'logo',
        'background_image',
        'qr_style',
        'qr_color',
        'is_active',
        // Glassmorphism settings
        'glass_blur',
        'glass_opacity',
        'glass_border',
        // Typography
        'font_family',
        'font_weight_heading',
        'font_weight_body',
        // Border & Shadow
        'border_radius',
        'border_width',
        'border_opacity',
        'shadow_intensity',
        // Animation settings
        'animation_style',
        'hover_effect',
        // Smart features
        'auto_contrast',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'is_active' => 'boolean',
        'custom_links' => 'array',
        'view_count' => 'integer',
        'qr_scan_count' => 'integer',
        'link_click_count' => 'integer',
        'glass_border' => 'boolean',
        'auto_contrast' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($card) {
            if (empty($card->slug)) {
                $card->slug = static::generateUniqueSlug($card->name);
            }
        });
    }

    public static function generateUniqueSlug(string $name): string
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        return $slug;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function views(): HasMany
    {
        return $this->hasMany(ProfileView::class);
    }

    public function clicks(): HasMany
    {
        return $this->hasMany(LinkClick::class);
    }

    public function getPublicUrl(): string
    {
        return url("/card/{$this->slug}");
    }

    public function getQrCodeUrl(): string
    {
        return $this->getPublicUrl() . '?src=qr';
    }

    public function incrementViewCount(): void
    {
        $this->increment('view_count');
    }

    public function incrementQrScanCount(): void
    {
        $this->increment('qr_scan_count');
    }

    public function incrementLinkClickCount(): void
    {
        $this->increment('link_click_count');
    }

    public function getSocialLinks(): array
    {
        $links = [];

        if ($this->linkedin_url) $links['linkedin'] = $this->linkedin_url;
        if ($this->twitter_url) $links['twitter'] = $this->twitter_url;
        if ($this->github_url) $links['github'] = $this->github_url;
        if ($this->instagram_url) $links['instagram'] = $this->instagram_url;

        return $links;
    }

    /**
     * Get contrasting text color based on background luminance
     */
    public function getContrastTextColor(string $backgroundColor): string
    {
        $hex = ltrim($backgroundColor, '#');
        if (strlen($hex) !== 6) {
            return '#ffffff';
        }

        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));

        // Calculate relative luminance (WCAG formula)
        $luminance = (0.299 * $r + 0.587 * $g + 0.114 * $b) / 255;

        return $luminance > 0.5 ? '#1f2937' : '#ffffff';
    }

    /**
     * Get all design settings as a structured array
     */
    public function getDesignSettings(): array
    {
        return [
            'glass' => [
                'blur' => $this->glass_blur ?? '12',
                'opacity' => $this->glass_opacity ?? '0.15',
                'border' => $this->glass_border ?? true,
            ],
            'typography' => [
                'font_family' => $this->font_family ?? 'inter',
                'heading_weight' => $this->font_weight_heading ?? '700',
                'body_weight' => $this->font_weight_body ?? '400',
            ],
            'border' => [
                'radius' => $this->border_radius ?? '24',
                'width' => $this->border_width ?? '1',
                'opacity' => $this->border_opacity ?? '0.2',
            ],
            'shadow' => $this->shadow_intensity ?? 'medium',
            'animations' => [
                'entrance' => $this->animation_style ?? 'none',
                'hover' => $this->hover_effect ?? 'lift',
            ],
            'auto_contrast' => $this->auto_contrast ?? true,
        ];
    }
}
