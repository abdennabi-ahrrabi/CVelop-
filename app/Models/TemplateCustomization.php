<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TemplateCustomization extends Model
{
    protected $fillable = [
        'resume_id',
        'primary_color',
        'secondary_color',
        'accent_color',
        'text_color',
        'background_color',
        'sidebar_bg_color',
        'font_family',
        'font_size',
        'line_height',
        'page_padding',
        'section_spacing',
        'item_spacing',
        'layout_type',
        'sidebar_width',
        'show_photo',
        'show_summary',
        'show_skills',
        'show_experience',
        'show_education',
        'show_contact',
        'border_radius',
        'border_width',
        'custom_css',
        'preset_theme',
    ];

    protected $casts = [
        'show_photo' => 'boolean',
        'show_summary' => 'boolean',
        'show_skills' => 'boolean',
        'show_experience' => 'boolean',
        'show_education' => 'boolean',
        'show_contact' => 'boolean',
        'custom_css' => 'array',
        'font_size' => 'integer',
        'line_height' => 'float',
        'page_padding' => 'integer',
        'section_spacing' => 'integer',
        'item_spacing' => 'integer',
        'sidebar_width' => 'integer',
        'border_radius' => 'integer',
        'border_width' => 'integer',
    ];

    public function resume(): BelongsTo
    {
        return $this->belongsTo(Resume::class);
    }
}
