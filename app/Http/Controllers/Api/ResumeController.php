<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreResumeRequest;
use App\Http\Requests\UpdateResumeRequest;
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
            ->with('template:id,name,slug,thumbnail')
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
    public function store(StoreResumeRequest $request): JsonResponse
    {
        $resume = $request->user()->resumes()->create($request->validated());

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
    public function update(UpdateResumeRequest $request, Resume $resume): JsonResponse
    {
        $resume->update($request->validated());

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
