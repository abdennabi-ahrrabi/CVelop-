<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use App\Models\WorkExperience;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class WorkExperienceController extends Controller
{
    /**
     * Display work experiences for a resume.
     */
    public function index(Resume $resume): JsonResponse
    {
        Gate::authorize('view', $resume);

        $experiences = $resume->workExperiences()
            ->orderBy('start_date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $experiences,
        ]);
    }

    /**
     * Store a new work experience.
     */
    public function store(Request $request, Resume $resume): JsonResponse
    {
        Gate::authorize('update', $resume);

        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current' => 'boolean',
        ]);

        $experience = $resume->workExperiences()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Work experience added successfully',
            'data' => $experience,
        ], 201);
    }

    /**
     * Display a specific work experience.
     */
    public function show(Resume $resume, WorkExperience $workExperience): JsonResponse
    {
        Gate::authorize('view', $resume);

        if ($workExperience->resume_id !== $resume->id) {
            abort(404);
        }

        return response()->json([
            'success' => true,
            'data' => $workExperience,
        ]);
    }

    /**
     * Update a work experience.
     */
    public function update(Request $request, Resume $resume, WorkExperience $workExperience): JsonResponse
    {
        Gate::authorize('update', $resume);

        if ($workExperience->resume_id !== $resume->id) {
            abort(404);
        }

        $validated = $request->validate([
            'company' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current' => 'boolean',
        ]);

        $workExperience->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Work experience updated successfully',
            'data' => $workExperience,
        ]);
    }

    /**
     * Remove a work experience.
     */
    public function destroy(Resume $resume, WorkExperience $workExperience): JsonResponse
    {
        Gate::authorize('update', $resume);

        if ($workExperience->resume_id !== $resume->id) {
            abort(404);
        }

        $workExperience->delete();

        return response()->json([
            'success' => true,
            'message' => 'Work experience deleted successfully',
        ]);
    }
}
