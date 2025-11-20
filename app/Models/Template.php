<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Template extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'thumbnail',
        'category',
        'colors',
        'is_premium',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'colors' => 'array',
        'is_premium' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function resumes(): HasMany
    {
        return $this->hasMany(Resume::class);
    }
}
