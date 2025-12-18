<?php

use App\Http\Controllers\Api\AIEnhancementController;
use App\Http\Controllers\Api\AIWizardController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ResumeController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\TemplateCustomizationController;
use App\Http\Controllers\Api\WorkExperienceController;
use App\Http\Controllers\TemplateBuilderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'throttle:60,1'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Resume routes (API - no named routes to avoid conflicts)
    Route::apiResource('resumes', ResumeController::class)->names([
        'index' => 'api.resumes.index',
        'store' => 'api.resumes.store',
        'show' => 'api.resumes.show',
        'update' => 'api.resumes.update',
        'destroy' => 'api.resumes.destroy',
    ]);

    // Templates route
    Route::get('/templates', [TemplateController::class, 'index']);

    // Template Builder routes
    Route::get('/template-builder', [TemplateBuilderController::class, 'index']);
    Route::get('/template-builder/{id}', [TemplateBuilderController::class, 'getStructure']);
    Route::post('/template-builder', [TemplateBuilderController::class, 'store']);
    Route::put('/template-builder/{id}', [TemplateBuilderController::class, 'update']);
    Route::delete('/template-builder/{id}', [TemplateBuilderController::class, 'destroy']);
    Route::post('/template-builder/{id}/duplicate', [TemplateBuilderController::class, 'duplicate']);

    // Template customization presets
    Route::get('/template-presets', [TemplateCustomizationController::class, 'listPresets']);

    // AI Enhancement routes - stricter rate limit (20 requests per minute)
    Route::middleware('throttle:20,1')->group(function () {
        Route::post('/ai/enhance', [AIEnhancementController::class, 'enhance']);
        Route::post('/ai/enhance-batch', [AIEnhancementController::class, 'enhanceBatch']);
        Route::get('/ai/rate-limit', [AIEnhancementController::class, 'getRateLimit']);
    });

    // AI Wizard routes - 60 requests per minute
    Route::middleware('throttle:60,1')->group(function () {
        Route::get('/wizard/step', [AIWizardController::class, 'getStep']);
        Route::post('/wizard/process', [AIWizardController::class, 'processInput']);
        Route::post('/wizard/enhance', [AIWizardController::class, 'enhance']);
        Route::post('/wizard/create-resume', [AIWizardController::class, 'createResume']);
    });

    // Nested resource routes for resume components
    Route::prefix('resumes/{resume}')->group(function () {
        Route::apiResource('work-experiences', WorkExperienceController::class);
        Route::apiResource('educations', EducationController::class);
        Route::apiResource('skills', SkillController::class);

        // Template customization routes
        Route::get('customization', [TemplateCustomizationController::class, 'show']);
        Route::post('customization', [TemplateCustomizationController::class, 'store']);
        Route::put('customization', [TemplateCustomizationController::class, 'update']);
        Route::delete('customization', [TemplateCustomizationController::class, 'destroy']);
        Route::post('customization/preset', [TemplateCustomizationController::class, 'applyPreset']);
    });
});
