<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTemplateRequest;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TemplateBuilderController extends Controller
{
    /**
     * Display a listing of templates available for customization
     */
    public function index()
    {
        $templates = Template::where(function ($query) {
            $query->where('is_active', true)
                  ->orWhere('created_by', Auth::id());
        })
        ->orderBy('sort_order')
        ->get();

        return response()->json([
            'success' => true,
            'data' => $templates
        ]);
    }

    /**
     * Get template structure for editing
     */
    public function getStructure($id)
    {
        $template = Template::findOrFail($id);

        // Check if user owns this template if it's custom
        if ($template->is_custom && $template->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to edit this template'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'template' => $template,
                'layout_structure' => $template->layout_structure ?? $this->getDefaultStructure($template->name),
                'component_config' => $template->component_config ?? []
            ]
        ]);
    }

    /**
     * Store a newly created custom template
     */
    public function store(StoreTemplateRequest $request)
    {
        $validated = $request->validated();

        // Generate unique slug
        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        $counter = 1;
        while (Template::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        $template = Template::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? '',
            'is_custom' => true,
            'created_by' => Auth::id(),
            'layout_structure' => $validated['layout_structure'],
            'component_config' => $validated['component_config'] ?? [],
            'colors' => $validated['colors'] ?? [
                'primary' => '#3B82F6',
                'secondary' => '#64748B',
                'accent' => '#10B981'
            ],
            'is_public' => $validated['is_public'] ?? false,
            'is_active' => true,
            'is_premium' => false,
            'sort_order' => Template::max('sort_order') + 1 ?? 100,
            'category' => 'custom'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Custom template created successfully',
            'data' => $template
        ], 201);
    }

    /**
     * Update an existing custom template
     */
    public function update(Request $request, $id)
    {
        $template = Template::findOrFail($id);

        // Check if user owns this template
        if ($template->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this template'
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'layout_structure' => 'sometimes|array',
            'component_config' => 'nullable|array',
            'colors' => 'nullable|array',
            'is_public' => 'boolean'
        ]);

        // Regenerate slug if name changed
        if (isset($validated['name']) && $validated['name'] !== $template->name) {
            $baseSlug = Str::slug($validated['name']);
            $slug = $baseSlug;
            $counter = 1;
            while (Template::where('slug', $slug)->where('id', '!=', $template->id)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }
            $validated['slug'] = $slug;
        }

        $template->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Template updated successfully',
            'data' => $template
        ]);
    }

    /**
     * Remove a custom template
     */
    public function destroy($id)
    {
        $template = Template::findOrFail($id);

        // Check if user owns this template
        if ($template->created_by !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this template'
            ], 403);
        }

        // Don't allow deletion if it's being used
        if ($template->resumes()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete template that is being used by resumes'
            ], 400);
        }

        $template->delete();

        return response()->json([
            'success' => true,
            'message' => 'Template deleted successfully'
        ]);
    }

    /**
     * Duplicate an existing template
     */
    public function duplicate($id)
    {
        $original = Template::findOrFail($id);

        // Authorization: Allow duplication only if:
        // 1. Template is public, OR
        // 2. Template is a built-in active template (not custom), OR
        // 3. User owns the custom template
        $canDuplicate = $original->is_public
            || (!$original->is_custom && $original->is_active)
            || $original->created_by === Auth::id();

        if (!$canDuplicate) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to duplicate this template'
            ], 403);
        }

        // Generate unique slug for the duplicate
        $baseSlug = Str::slug($original->name . '-copy');
        $slug = $baseSlug;
        $counter = 1;
        while (Template::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        $duplicate = Template::create([
            'name' => $original->name . ' (Copy)',
            'slug' => $slug,
            'description' => $original->description,
            'is_custom' => true,
            'created_by' => Auth::id(),
            'layout_structure' => $original->layout_structure,
            'component_config' => $original->component_config,
            'colors' => $original->colors,
            'is_public' => false,
            'is_active' => true,
            'is_premium' => false,
            'sort_order' => Template::max('sort_order') + 1 ?? 100,
            'category' => 'custom'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Template duplicated successfully',
            'data' => $duplicate
        ], 201);
    }

    /**
     * Get default structure for built-in templates
     */
    private function getDefaultStructure($templateName)
    {
        $structures = [
            'Modern' => [
                ['type' => 'header', 'order' => 1],
                ['type' => 'summary', 'order' => 2],
                ['type' => 'experience', 'order' => 3],
                ['type' => 'education', 'order' => 4],
                ['type' => 'skills', 'order' => 5]
            ],
            'Classic' => [
                ['type' => 'header', 'order' => 1],
                ['type' => 'summary', 'order' => 2],
                ['type' => 'experience', 'order' => 3],
                ['type' => 'education', 'order' => 4],
                ['type' => 'skills', 'order' => 5]
            ],
            'Creative' => [
                ['type' => 'header', 'order' => 1],
                ['type' => 'summary', 'order' => 2],
                ['type' => 'skills', 'order' => 3],
                ['type' => 'experience', 'order' => 4],
                ['type' => 'education', 'order' => 5]
            ],
            'Minimal' => [
                ['type' => 'header', 'order' => 1],
                ['type' => 'summary', 'order' => 2],
                ['type' => 'experience', 'order' => 3],
                ['type' => 'education', 'order' => 4],
                ['type' => 'skills', 'order' => 5]
            ]
        ];

        return $structures[$templateName] ?? $structures['Modern'];
    }
}
