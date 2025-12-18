<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCustomizationRequest;
use App\Models\Resume;
use App\Models\TemplateCustomization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TemplateCustomizationController extends Controller
{
    /**
     * Check if the authenticated user owns the resume
     */
    private function authorizeResume(Resume $resume): bool
    {
        return $resume->user_id === Auth::id();
    }

    public function show(Resume $resume)
    {
        // Authorization check
        if (!$this->authorizeResume($resume)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access to this resume.',
            ], 403);
        }

        $customization = $resume->customization()->first();

        if (!$customization) {
            // Return default values from config
            $defaults = config('cv-builder.defaults');
            $customization = new TemplateCustomization([
                'primary_color' => $defaults['colors']['primary'],
                'secondary_color' => $defaults['colors']['secondary'],
                'accent_color' => $defaults['colors']['accent'],
                'text_color' => $defaults['colors']['text'],
                'background_color' => $defaults['colors']['background'],
                'font_family' => $defaults['typography']['font_family'],
                'font_size' => $defaults['typography']['font_size'],
                'line_height' => $defaults['typography']['line_height'],
                'page_padding' => $defaults['spacing']['page_padding'],
                'section_spacing' => $defaults['spacing']['section_spacing'],
                'item_spacing' => $defaults['spacing']['item_spacing'],
                'layout_type' => $defaults['layout']['layout_type'],
                'sidebar_width' => $defaults['layout']['sidebar_width'],
                'show_photo' => $defaults['visibility']['show_photo'],
                'show_summary' => $defaults['visibility']['show_summary'],
                'show_skills' => $defaults['visibility']['show_skills'],
                'show_experience' => $defaults['visibility']['show_experience'],
                'show_education' => $defaults['visibility']['show_education'],
                'show_contact' => $defaults['visibility']['show_contact'],
                'border_radius' => $defaults['borders']['border_radius'],
                'border_width' => $defaults['borders']['border_width'],
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $customization,
        ]);
    }

    public function store(StoreCustomizationRequest $request, Resume $resume)
    {
        // Authorization is handled by StoreCustomizationRequest

        $customization = $resume->customization()->updateOrCreate(
            ['resume_id' => $resume->id],
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'data' => $customization,
        ]);
    }

    public function update(StoreCustomizationRequest $request, Resume $resume)
    {
        return $this->store($request, $resume);
    }

    public function destroy(Resume $resume)
    {
        // Authorization check
        if (!$this->authorizeResume($resume)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access to this resume.',
            ], 403);
        }

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
        // Authorization check
        if (!$this->authorizeResume($resume)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access to this resume.',
            ], 403);
        }

        $presets = $this->getPresets();

        $validator = Validator::make($request->all(), [
            'preset' => 'required|string|max:50',
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
        return config('cv-builder.presets');
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
