<?php

use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ResumeController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\TemplateCustomizationController;
use App\Http\Controllers\Api\WorkExperienceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Resume routes
    Route::apiResource('resumes', ResumeController::class);

    // Templates route
    Route::get('/templates', [TemplateController::class, 'index']);

    // Template customization presets
    Route::get('/template-presets', [TemplateCustomizationController::class, 'listPresets']);

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
