<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use App\Models\TemplateCustomization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TemplateCustomizationController extends Controller
{
    public function show(Resume $resume)
    {
        $customization = $resume->customization()->first();

        if (!$customization) {
            // Return default values
            $customization = new TemplateCustomization([
                'primary_color' => '#3498DB',
                'secondary_color' => '#2C3E50',
                'accent_color' => '#1A2332',
                'text_color' => '#2C3E50',
                'background_color' => '#FFFFFF',
                'font_family' => 'DejaVu Serif',
                'font_size' => 10,
                'line_height' => 1.5,
                'page_padding' => 30,
                'section_spacing' => 25,
                'item_spacing' => 15,
                'layout_type' => 'two_column',
                'sidebar_width' => 35,
                'show_photo' => true,
                'show_summary' => true,
                'show_skills' => true,
                'show_experience' => true,
                'show_education' => true,
                'show_contact' => true,
                'border_radius' => 4,
                'border_width' => 2,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $customization,
        ]);
    }

    public function store(Request $request, Resume $resume)
    {
        $validator = Validator::make($request->all(), [
            'primary_color' => 'nullable|string',
            'secondary_color' => 'nullable|string',
            'accent_color' => 'nullable|string',
            'text_color' => 'nullable|string',
            'background_color' => 'nullable|string',
            'sidebar_bg_color' => 'nullable|string',
            'font_family' => 'nullable|string',
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
            'preset_theme' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $customization = $resume->customization()->updateOrCreate(
            ['resume_id' => $resume->id],
            $validator->validated()
        );

        return response()->json([
            'success' => true,
            'data' => $customization,
        ]);
    }

    public function update(Request $request, Resume $resume)
    {
        return $this->store($request, $resume);
    }

    public function destroy(Resume $resume)
    {
        $customization = $resume->customization;

        if ($customization) {
            $customization->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Customization reset to defaults',
        ]);
    }

    public function applyPreset(Request $request, Resume $resume)
    {
        $presets = $this->getPresets();

        $validator = Validator::make($request->all(), [
            'preset' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $presetName = $request->input('preset');

        if (!isset($presets[$presetName])) {
            return response()->json([
                'success' => false,
                'message' => 'Preset not found',
            ], 404);
        }

        $presetData = $presets[$presetName];
        $presetData['preset_theme'] = $presetName;

        $customization = $resume->customization()->updateOrCreate(
            ['resume_id' => $resume->id],
            $presetData
        );

        return response()->json([
            'success' => true,
            'data' => $customization,
        ]);
    }

    public function getPresets()
    {
        return [
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
        ];
    }

    public function listPresets()
    {
        $presets = $this->getPresets();
        $formattedPresets = [];

        foreach ($presets as $key => $preset) {
            $formattedPresets[] = [
                'id' => $key,
                'name' => ucwords(str_replace('_', ' ', $key)),
                'colors' => $preset,
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $formattedPresets,
        ]);
    }
}
