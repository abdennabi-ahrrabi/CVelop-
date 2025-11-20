<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PdfExportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Resume routes
    Route::get('/resumes', function () {
        return Inertia::render('Resumes/Dashboard');
    })->name('resumes.index');

    Route::get('/resumes/create', function () {
        return Inertia::render('Resumes/Editor');
    })->name('resumes.create');

    Route::get('/resumes/{id}/edit', function ($id) {
        return Inertia::render('Resumes/Editor', ['resumeId' => $id]);
    })->name('resumes.edit');

    // PDF Export routes
    Route::get('/resumes/{resume}/pdf/download', [PdfExportController::class, 'download'])->name('resumes.pdf.download');
    Route::get('/resumes/{resume}/pdf/preview', [PdfExportController::class, 'preview'])->name('resumes.pdf.preview');
});

// Template preview route (public - shows demo data)
Route::get('/templates/{templateSlug}/preview', [PdfExportController::class, 'templatePreview'])->name('templates.preview');

require __DIR__.'/auth.php';
