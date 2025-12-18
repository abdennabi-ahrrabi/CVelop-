<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'subscription_status',
        'plan_type',
        'username',
        'headline',
        'bio',
        'avatar',
        'cover_image',
        'location',
        'phone',
        'website',
        'linkedin_url',
        'twitter_url',
        'github_url',
        'instagram_url',
        'facebook_url',
        'youtube_url',
        'tiktok_url',
        'dribbble_url',
        'behance_url',
        'is_public',
        'show_email',
        'show_phone',
        'show_projects',
        'show_resumes',
        'show_business_card',
        'show_contact_form',
        'show_social_links',
        'theme',
        'profile_layout',
        'profile_colors',
        'meta_title',
        'meta_description',
        'custom_links',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_public' => 'boolean',
            'show_email' => 'boolean',
            'show_phone' => 'boolean',
            'show_projects' => 'boolean',
            'show_resumes' => 'boolean',
            'show_business_card' => 'boolean',
            'show_contact_form' => 'boolean',
            'show_social_links' => 'boolean',
            'custom_links' => 'array',
            'profile_colors' => 'array',
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            // Generate username from email if not set
            if (empty($user->username)) {
                $user->username = static::generateUniqueUsername($user->email);
            }
        });
    }

    public static function generateUniqueUsername(string $email): string
    {
        $baseUsername = Str::slug(explode('@', $email)[0]);
        $username = $baseUsername;
        $count = 1;

        while (static::where('username', $username)->exists()) {
            $username = $baseUsername . $count++;
        }

        return $username;
    }

    public function resumes(): HasMany
    {
        return $this->hasMany(Resume::class);
    }

    public function businessCards(): HasMany
    {
        return $this->hasMany(BusinessCard::class);
    }

    public function primaryBusinessCard(): HasOne
    {
        return $this->hasOne(BusinessCard::class)->where('is_primary', true);
    }

    public function profileViews(): HasMany
    {
        return $this->hasMany(ProfileView::class);
    }

    public function linkClicks(): HasMany
    {
        return $this->hasMany(LinkClick::class);
    }

    public function contactMessages(): HasMany
    {
        return $this->hasMany(ContactMessage::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function unreadMessagesCount(): int
    {
        return $this->contactMessages()->where('is_read', false)->count();
    }

    public function subscription(): HasOne
    {
        return $this->hasOne(Subscription::class);
    }

    public function hasActiveSubscription(): bool
    {
        return $this->subscription_status === 'active' ||
               ($this->subscription && $this->subscription->isActive());
    }

    public function isOnFreePlan(): bool
    {
        return $this->plan_type === 'free';
    }

    public function getProfileUrl(): string
    {
        return url("/@{$this->username}");
    }

    public function getAvatarUrl(): ?string
    {
        if ($this->avatar) {
            return asset('storage/' . $this->avatar);
        }
        return null;
    }

    public function getCoverImageUrl(): ?string
    {
        if ($this->cover_image) {
            return asset('storage/' . $this->cover_image);
        }
        return null;
    }

    public function getInitials(): string
    {
        $words = explode(' ', $this->name);
        $initials = '';
        foreach (array_slice($words, 0, 2) as $word) {
            $initials .= strtoupper(substr($word, 0, 1));
        }
        return $initials;
    }

    public function getSocialLinks(): array
    {
        $links = [];

        if ($this->linkedin_url) $links['linkedin'] = $this->linkedin_url;
        if ($this->twitter_url) $links['twitter'] = $this->twitter_url;
        if ($this->github_url) $links['github'] = $this->github_url;
        if ($this->instagram_url) $links['instagram'] = $this->instagram_url;
        if ($this->facebook_url) $links['facebook'] = $this->facebook_url;
        if ($this->youtube_url) $links['youtube'] = $this->youtube_url;
        if ($this->tiktok_url) $links['tiktok'] = $this->tiktok_url;
        if ($this->dribbble_url) $links['dribbble'] = $this->dribbble_url;
        if ($this->behance_url) $links['behance'] = $this->behance_url;

        return $links;
    }

    public function getTotalViews(): int
    {
        return $this->profileViews()->count();
    }

    public function getViewsThisMonth(): int
    {
        return $this->profileViews()
            ->where('created_at', '>=', now()->startOfMonth())
            ->count();
    }
}
