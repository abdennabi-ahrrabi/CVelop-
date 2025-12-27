<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'image',
        'image_url',
        'url',
        'github_url',
        'technologies',
        'category',
        'start_date',
        'end_date',
        'is_featured',
        'is_visible',
        'sort_order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_featured' => 'boolean',
        'is_visible' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
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

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderByDesc('created_at');
    }
}
