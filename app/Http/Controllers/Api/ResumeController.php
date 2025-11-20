<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ResumeController extends Controller
{
    /**
     * Display a listing of the user's resumes.
     */
    public function index(Request $request): JsonResponse
    {
        $resumes = $request->user()
            ->resumes()
            ->withCount(['workExperiences', 'educations', 'skills'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $resumes,
        ]);
    }

    /**
     * Store a newly created resume.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'template_id' => 'nullable|integer',
            'personal_info' => 'nullable|array',
            'personal_info.full_name' => 'nullable|string|max:255',
            'personal_info.email' => 'nullable|email|max:255',
            'personal_info.phone' => 'nullable|string|max:50',
            'personal_info.address' => 'nullable|string|max:500',
            'personal_info.summary' => 'nullable|string|max:1000',
        ]);

        $resume = $request->user()->resumes()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Resume created successfully',
            'data' => $resume,
        ], 201);
    }

    /**
     * Display the specified resume with all relationships.
     */
    public function show(Resume $resume): JsonResponse
    {
        Gate::authorize('view', $resume);

        $resume->load([
            'workExperiences' => fn($query) => $query->orderBy('start_date', 'desc'),
            'educations' => fn($query) => $query->orderBy('start_date', 'desc'),
            'skills',
            'template',
        ]);

        return response()->json([
            'success' => true,
            'data' => $resume,
        ]);
    }

    /**
     * Update the specified resume.
     */
    public function update(Request $request, Resume $resume): JsonResponse
    {
        Gate::authorize('update', $resume);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'template_id' => 'nullable|integer',
            'personal_info' => 'nullable|array',
            'personal_info.full_name' => 'nullable|string|max:255',
            'personal_info.email' => 'nullable|email|max:255',
            'personal_info.phone' => 'nullable|string|max:50',
            'personal_info.address' => 'nullable|string|max:500',
            'personal_info.summary' => 'nullable|string|max:1000',
        ]);

        $resume->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Resume updated successfully',
            'data' => $resume,
        ]);
    }

    /**
     * Remove the specified resume.
     */
    public function destroy(Resume $resume): JsonResponse
    {
        Gate::authorize('delete', $resume);

        $resume->delete();

        return response()->json([
            'success' => true,
            'message' => 'Resume deleted successfully',
        ]);
    }
}
