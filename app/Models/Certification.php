<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'issuer',
        'credential_id',
        'credential_url',
        'badge_image',
        'badge_image_url',
        'issue_date',
        'expiry_date',
        'does_not_expire',
        'is_visible',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'issue_date' => 'date',
            'expiry_date' => 'date',
            'does_not_expire' => 'boolean',
            'is_visible' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('issue_date', 'desc');
    }

    /**
     * Get the display badge URL - prefers external URL, falls back to uploaded file
     */
    public function getDisplayBadgeUrl(): ?string
    {
        if ($this->badge_image_url) {
            return $this->badge_image_url;
        }
        if ($this->badge_image) {
            return asset('storage/' . $this->badge_image);
        }
        return null;
    }

    /**
     * @deprecated Use getDisplayBadgeUrl() instead
     */
    public function getBadgeImageUrl(): ?string
    {
        return $this->getDisplayBadgeUrl();
    }

    public function isExpired(): bool
    {
        if ($this->does_not_expire || !$this->expiry_date) {
            return false;
        }
        return $this->expiry_date->isPast();
    }

    public function isValid(): bool
    {
        return !$this->isExpired();
    }
}
