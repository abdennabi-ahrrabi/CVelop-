<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTemplateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Auth middleware handles this
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $hexColorRegex = 'regex:/^#[0-9A-Fa-f]{6}$/';

        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'layout_structure' => 'required|array',
            'layout_structure.*.type' => 'required|string|in:header,summary,experience,education,skills,contact',
            'layout_structure.*.order' => 'required|integer|min:0',
            'component_config' => 'nullable|array',
            'colors' => 'nullable|array',
            'colors.primary' => "nullable|string|{$hexColorRegex}",
            'colors.secondary' => "nullable|string|{$hexColorRegex}",
            'colors.accent' => "nullable|string|{$hexColorRegex}",
            'is_public' => 'boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please provide a name for your template.',
            'name.max' => 'The template name cannot exceed 255 characters.',
            'layout_structure.required' => 'The template must have a layout structure.',
            'layout_structure.*.type.in' => 'Invalid section type in layout structure.',
            'colors.primary.regex' => 'The primary color must be a valid hex color (e.g., #3B82F6).',
            'colors.secondary.regex' => 'The secondary color must be a valid hex color.',
            'colors.accent.regex' => 'The accent color must be a valid hex color.',
        ];
    }
}
