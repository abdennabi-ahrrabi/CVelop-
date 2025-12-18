<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Customization Values
    |--------------------------------------------------------------------------
    |
    | These are the default values used for resume template customization
    | when no custom values have been set by the user.
    |
    */
    'defaults' => [
        'colors' => [
            'primary' => '#3498DB',
            'secondary' => '#2C3E50',
            'accent' => '#1A2332',
            'text' => '#2C3E50',
            'background' => '#FFFFFF',
            'sidebar_bg' => null,
        ],

        'typography' => [
            'font_family' => 'DejaVu Serif',
            'font_size' => 10,
            'line_height' => 1.5,
        ],

        'spacing' => [
            'page_padding' => 30,
            'section_spacing' => 25,
            'item_spacing' => 15,
        ],

        'layout' => [
            'layout_type' => 'two_column',
            'sidebar_width' => 35,
        ],

        'visibility' => [
            'show_photo' => true,
            'show_summary' => true,
            'show_skills' => true,
            'show_experience' => true,
            'show_education' => true,
            'show_contact' => true,
        ],

        'borders' => [
            'border_radius' => 4,
            'border_width' => 2,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | AI Service Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for AI enhancement services.
    |
    */
    'ai' => [
        'provider' => env('AI_PROVIDER', 'groq'),
        'rate_limit' => [
            'max_requests' => env('AI_RATE_LIMIT_MAX', 10),
            'per_minutes' => env('AI_RATE_LIMIT_MINUTES', 1),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | PDF Export Settings
    |--------------------------------------------------------------------------
    |
    | Settings for PDF generation.
    |
    */
    'pdf' => [
        'paper_size' => 'a4',
        'default_template' => 'modern',
    ],

    /*
    |--------------------------------------------------------------------------
    | Template Presets
    |--------------------------------------------------------------------------
    |
    | Color presets available for template customization.
    |
    */
    'presets' => [
        'modern_blue' => [
            'primary_color' => '#3498DB',
            'secondary_color' => '#2C3E50',
            'accent_color' => '#1A2332',
            'text_color' => '#2C3E50',
            'background_color' => '#FFFFFF',
            'sidebar_bg_color' => '#1A2332',
        ],
        'professional_gray' => [
            'primary_color' => '#5D6D7E',
            'secondary_color' => '#34495E',
            'accent_color' => '#2C3E50',
            'text_color' => '#2C3E50',
            'background_color' => '#FFFFFF',
            'sidebar_bg_color' => '#2C3E50',
        ],
        'creative_purple' => [
            'primary_color' => '#9B59B6',
            'secondary_color' => '#8E44AD',
            'accent_color' => '#6C3483',
            'text_color' => '#2C3E50',
            'background_color' => '#FFFFFF',
            'sidebar_bg_color' => '#6C3483',
        ],
        'warm_orange' => [
            'primary_color' => '#E67E22',
            'secondary_color' => '#D35400',
            'accent_color' => '#A04000',
            'text_color' => '#2C3E50',
            'background_color' => '#FFFFFF',
            'sidebar_bg_color' => '#A04000',
        ],
        'fresh_green' => [
            'primary_color' => '#27AE60',
            'secondary_color' => '#229954',
            'accent_color' => '#1E8449',
            'text_color' => '#2C3E50',
            'background_color' => '#FFFFFF',
            'sidebar_bg_color' => '#1E8449',
        ],
        'elegant_burgundy' => [
            'primary_color' => '#922B21',
            'secondary_color' => '#7B241C',
            'accent_color' => '#641E16',
            'text_color' => '#2C3E50',
            'background_color' => '#FFFFFF',
            'sidebar_bg_color' => '#641E16',
        ],
        'tech_cyan' => [
            'primary_color' => '#17A2B8',
            'secondary_color' => '#138496',
            'accent_color' => '#0E6674',
            'text_color' => '#2C3E50',
            'background_color' => '#FFFFFF',
            'sidebar_bg_color' => '#0E6674',
        ],
        'minimalist_black' => [
            'primary_color' => '#000000',
            'secondary_color' => '#333333',
            'accent_color' => '#1A1A1A',
            'text_color' => '#2C3E50',
            'background_color' => '#FFFFFF',
            'sidebar_bg_color' => '#1A1A1A',
        ],
    ],
];
