<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreCustomizationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $resume = $this->route('resume');
        return $resume && $resume->user_id === Auth::id();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $hexColorRegex = 'regex:/^#[0-9A-Fa-f]{6}$/';

        return [
            'primary_color' => "nullable|string|max:7|{$hexColorRegex}",
            'secondary_color' => "nullable|string|max:7|{$hexColorRegex}",
            'accent_color' => "nullable|string|max:7|{$hexColorRegex}",
            'text_color' => "nullable|string|max:7|{$hexColorRegex}",
            'background_color' => "nullable|string|max:7|{$hexColorRegex}",
            'sidebar_bg_color' => "nullable|string|max:7|{$hexColorRegex}",
            'font_family' => 'nullable|string|max:100',
            'font_size' => 'nullable|integer|min:6|max:16',
            'line_height' => 'nullable|numeric|min:1|max:3',
            'page_padding' => 'nullable|integer|min:0|max:100',
            'section_spacing' => 'nullable|integer|min:0|max:100',
            'item_spacing' => 'nullable|integer|min:0|max:100',
            'layout_type' => 'nullable|in:single_column,two_column',
            'sidebar_width' => 'nullable|integer|min:20|max:50',
            'show_photo' => 'nullable|boolean',
            'show_summary' => 'nullable|boolean',
            'show_skills' => 'nullable|boolean',
            'show_experience' => 'nullable|boolean',
            'show_education' => 'nullable|boolean',
            'show_contact' => 'nullable|boolean',
            'border_radius' => 'nullable|integer|min:0|max:20',
            'border_width' => 'nullable|integer|min:0|max:10',
            'preset_theme' => 'nullable|string|max:50',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'primary_color.regex' => 'The primary color must be a valid hex color (e.g., #3498DB).',
            'secondary_color.regex' => 'The secondary color must be a valid hex color (e.g., #2C3E50).',
            'accent_color.regex' => 'The accent color must be a valid hex color.',
            'text_color.regex' => 'The text color must be a valid hex color.',
            'background_color.regex' => 'The background color must be a valid hex color.',
            'sidebar_bg_color.regex' => 'The sidebar background color must be a valid hex color.',
            'font_size.min' => 'The font size must be at least 6pt.',
            'font_size.max' => 'The font size cannot exceed 16pt.',
            'layout_type.in' => 'The layout type must be either single_column or two_column.',
        ];
    }
}
