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
        // Custom template fields
        'is_custom',
        'created_by',
        'layout_structure',
        'component_config',
        'is_public',
    ];

    protected $casts = [
        'colors' => 'array',
        'is_premium' => 'boolean',
        'is_active' => 'boolean',
        'is_custom' => 'boolean',
        'is_public' => 'boolean',
        'layout_structure' => 'array',
        'component_config' => 'array',
    ];

    public function resumes(): HasMany
    {
        return $this->hasMany(Resume::class);
    }
}
