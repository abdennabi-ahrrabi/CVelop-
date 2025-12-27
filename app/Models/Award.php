<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Award extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'issuer',
        'description',
        'image',
        'image_url',
        'date',
        'url',
        'is_visible',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
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
        return $query->orderBy('sort_order')->orderBy('date', 'desc');
    }

    /**
     * Get the display image URL - prefers external URL, falls back to uploaded file
     */
    public function getDisplayImageUrl(): ?string
    {
        if ($this->image_url) {
            return $this->image_url;
        }
        if ($this->image) {
            return asset('storage/' . $this->image);
        }
        return null;
    }

    /**
     * @deprecated Use getDisplayImageUrl() instead
     */
    public function getImageUrl(): ?string
    {
        return $this->getDisplayImageUrl();
    }
}
