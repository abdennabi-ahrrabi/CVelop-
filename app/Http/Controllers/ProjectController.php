<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display user's projects
     */
    public function index(Request $request)
    {
        $projects = $request->user()
            ->projects()
            ->ordered()
            ->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show project creation form
     */
    public function create()
    {
        return Inertia::render('Projects/Editor');
    }

    /**
     * Store a new project
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'url' => 'nullable|url|max:500',
            'github_url' => 'nullable|url|max:500',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:50',
            'category' => 'nullable|string|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_featured' => 'boolean',
            'is_visible' => 'boolean',
        ]);

        $project = $request->user()->projects()->create($validated);

        return redirect()->route('projects.index')->with('success', 'Project created successfully!');
    }

    /**
     * Show project edit form
     */
    public function edit(Request $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        return Inertia::render('Projects/Editor', [
            'project' => $project,
        ]);
    }

    /**
     * Update a project
     */
    public function update(Request $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'url' => 'nullable|url|max:500',
            'github_url' => 'nullable|url|max:500',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:50',
            'category' => 'nullable|string|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_featured' => 'boolean',
            'is_visible' => 'boolean',
        ]);

        $project->update($validated);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully!');
    }

    /**
     * Upload project image
     */
    public function uploadImage(Request $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'image' => 'required|image|max:5120', // 5MB max
        ]);

        // Delete old image if exists
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $path = $request->file('image')->store('projects', 'public');
        $project->update(['image' => $path]);

        return response()->json([
            'success' => true,
            'image_url' => asset('storage/' . $path),
        ]);
    }

    /**
     * Update project order
     */
    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'projects' => 'required|array',
            'projects.*.id' => 'required|exists:projects,id',
            'projects.*.sort_order' => 'required|integer|min:0',
        ]);

        foreach ($validated['projects'] as $item) {
            Project::where('id', $item['id'])
                ->where('user_id', $request->user()->id)
                ->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json(['success' => true]);
    }

    /**
     * Delete a project
     */
    public function destroy(Request $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        // Delete image if exists
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted.');
    }
}
