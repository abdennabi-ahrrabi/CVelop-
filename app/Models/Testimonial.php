<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'client_name',
        'client_title',
        'client_company',
        'client_avatar',
        'client_avatar_url',
        'content',
        'rating',
        'project_name',
        'date',
        'is_visible',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'is_visible' => 'boolean',
            'rating' => 'integer',
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
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }

    /**
     * Get the display avatar URL - prefers external URL, falls back to uploaded file
     */
    public function getDisplayAvatarUrl(): ?string
    {
        if ($this->client_avatar_url) {
            return $this->client_avatar_url;
        }
        if ($this->client_avatar) {
            return asset('storage/' . $this->client_avatar);
        }
        return null;
    }

    /**
     * @deprecated Use getDisplayAvatarUrl() instead
     */
    public function getClientAvatarUrl(): ?string
    {
        return $this->getDisplayAvatarUrl();
    }
}
