<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class SkillController extends Controller
{
    /**
     * Display skills for a resume.
     */
    public function index(Resume $resume): JsonResponse
    {
        Gate::authorize('view', $resume);

        $skills = $resume->skills()->get();

        return response()->json([
            'success' => true,
            'data' => $skills,
        ]);
    }

    /**
     * Store a new skill.
     */
    public function store(Request $request, Resume $resume): JsonResponse
    {
        Gate::authorize('update', $resume);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'proficiency_level' => ['required', Rule::in(['beginner', 'intermediate', 'advanced', 'expert'])],
        ]);

        $skill = $resume->skills()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Skill added successfully',
            'data' => $skill,
        ], 201);
    }

    /**
     * Display a specific skill.
     */
    public function show(Resume $resume, Skill $skill): JsonResponse
    {
        Gate::authorize('view', $resume);

        if ($skill->resume_id !== $resume->id) {
            abort(404);
        }

        return response()->json([
            'success' => true,
            'data' => $skill,
        ]);
    }

    /**
     * Update a skill.
     */
    public function update(Request $request, Resume $resume, Skill $skill): JsonResponse
    {
        Gate::authorize('update', $resume);

        if ($skill->resume_id !== $resume->id) {
            abort(404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'proficiency_level' => ['sometimes', 'required', Rule::in(['beginner', 'intermediate', 'advanced', 'expert'])],
        ]);

        $skill->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Skill updated successfully',
            'data' => $skill,
        ]);
    }

    /**
     * Remove a skill.
     */
    public function destroy(Resume $resume, Skill $skill): JsonResponse
    {
        Gate::authorize('update', $resume);

        if ($skill->resume_id !== $resume->id) {
            abort(404);
        }

        $skill->delete();

        return response()->json([
            'success' => true,
            'message' => 'Skill deleted successfully',
        ]);
    }
}
