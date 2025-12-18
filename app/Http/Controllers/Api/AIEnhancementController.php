<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AIEnhancementService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AIEnhancementController extends Controller
{
    private AIEnhancementService $aiService;

    public function __construct(AIEnhancementService $aiService)
    {
        $this->aiService = $aiService;
    }

    /**
     * Enhance a single bullet point
     */
    public function enhance(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:500',
        ]);

        try {
            $result = $this->aiService->enhanceBulletPoint(
                $validated['text'],
                Auth::id()
            );

            return response()->json([
                'success' => true,
                'data' => $result
            ]);

        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Enhance multiple bullet points
     */
    public function enhanceBatch(Request $request)
    {
        $validated = $request->validate([
            'texts' => 'required|array|max:5',
            'texts.*' => 'required|string|max:500',
        ]);

        try {
            $results = $this->aiService->enhanceBulletPoints(
                $validated['texts'],
                Auth::id()
            );

            return response()->json([
                'success' => true,
                'data' => $results
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get rate limit status
     */
    public function getRateLimit()
    {
        try {
            $rateLimit = $this->aiService->getRemainingRequests(Auth::id());

            return response()->json([
                'success' => true,
                'data' => $rateLimit
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
