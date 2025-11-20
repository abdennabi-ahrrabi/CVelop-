<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Education;
use App\Models\Resume;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EducationController extends Controller
{
    /**
     * Display education entries for a resume.
     */
    public function index(Resume $resume): JsonResponse
    {
        Gate::authorize('view', $resume);

        $educations = $resume->educations()
            ->orderBy('start_date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $educations,
        ]);
    }

    /**
     * Store a new education entry.
     */
    public function store(Request $request, Resume $resume): JsonResponse
    {
        Gate::authorize('update', $resume);

        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'field' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current' => 'boolean',
            'description' => 'nullable|string',
        ]);

        $education = $resume->educations()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Education added successfully',
            'data' => $education,
        ], 201);
    }

    /**
     * Display a specific education entry.
     */
    public function show(Resume $resume, Education $education): JsonResponse
    {
        Gate::authorize('view', $resume);

        if ($education->resume_id !== $resume->id) {
            abort(404);
        }

        return response()->json([
            'success' => true,
            'data' => $education,
        ]);
    }

    /**
     * Update an education entry.
     */
    public function update(Request $request, Resume $resume, Education $education): JsonResponse
    {
        Gate::authorize('update', $resume);

        if ($education->resume_id !== $resume->id) {
            abort(404);
        }

        $validated = $request->validate([
            'institution' => 'sometimes|required|string|max:255',
            'degree' => 'sometimes|required|string|max:255',
            'field' => 'sometimes|required|string|max:255',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current' => 'boolean',
            'description' => 'nullable|string',
        ]);

        $education->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Education updated successfully',
            'data' => $education,
        ]);
    }

    /**
     * Remove an education entry.
     */
    public function destroy(Resume $resume, Education $education): JsonResponse
    {
        Gate::authorize('update', $resume);

        if ($education->resume_id !== $resume->id) {
            abort(404);
        }

        $education->delete();

        return response()->json([
            'success' => true,
            'message' => 'Education deleted successfully',
        ]);
    }
}
