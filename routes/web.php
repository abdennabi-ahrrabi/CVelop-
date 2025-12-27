<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileSettingsController;
use App\Http\Controllers\PdfExportController;
use App\Http\Controllers\BusinessCardController;
use App\Http\Controllers\PublicProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
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

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Public Profile Settings
    Route::get('/profile/settings', [ProfileSettingsController::class, 'index'])->name('profile.settings');
    Route::put('/profile/settings', [ProfileSettingsController::class, 'update'])->name('profile.settings.update');
    Route::post('/profile/avatar', [ProfileSettingsController::class, 'uploadAvatar'])->name('profile.avatar');
    Route::post('/profile/cover', [ProfileSettingsController::class, 'uploadCoverImage'])->name('profile.cover');

    // Resume routes
    Route::get('/resumes', function () {
        return Inertia::render('Resumes/Dashboard');
    })->name('resumes.index');

    Route::get('/resumes/create', function () {
        return Inertia::render('Resumes/Editor');
    })->name('resumes.create');

    Route::get('/resumes/wizard', function () {
        return Inertia::render('Resumes/Wizard');
    })->name('resumes.wizard');

    Route::get('/resumes/{id}/edit', function ($id) {
        return Inertia::render('Resumes/Editor', ['resumeId' => $id]);
    })->name('resumes.edit');

    // Template Builder routes
    Route::get('/templates/builder', function () {
        return Inertia::render('Templates/Builder');
    })->name('templates.builder');

    Route::get('/templates/builder/{id}', function ($id) {
        return Inertia::render('Templates/Builder', ['templateId' => $id]);
    })->name('templates.builder.edit');

    // PDF Export routes
    Route::get('/resumes/{resume}/pdf/download', [PdfExportController::class, 'download'])->name('resumes.pdf.download');
    Route::get('/resumes/{resume}/pdf/preview', [PdfExportController::class, 'preview'])->name('resumes.pdf.preview');

    // Business Cards routes
    Route::get('/business-cards', [BusinessCardController::class, 'index'])->name('business-cards.index');
    Route::get('/business-cards/create', [BusinessCardController::class, 'create'])->name('business-cards.create');
    Route::post('/business-cards', [BusinessCardController::class, 'store'])->name('business-cards.store');
    Route::get('/business-cards/{businessCard}/edit', [BusinessCardController::class, 'edit'])->name('business-cards.edit');
    Route::put('/business-cards/{businessCard}', [BusinessCardController::class, 'update'])->name('business-cards.update');
    Route::delete('/business-cards/{businessCard}', [BusinessCardController::class, 'destroy'])->name('business-cards.destroy');
    Route::post('/business-cards/{businessCard}/avatar', [BusinessCardController::class, 'uploadAvatar'])->name('business-cards.avatar');
    Route::post('/business-cards/{businessCard}/logo', [BusinessCardController::class, 'uploadLogo'])->name('business-cards.logo');
    Route::get('/business-cards/{businessCard}/qr', [BusinessCardController::class, 'getQrCode'])->name('business-cards.qr');
    Route::get('/business-cards/{businessCard}/qr/download', [BusinessCardController::class, 'downloadQrCode'])->name('business-cards.qr.download');

    // Analytics dashboard
    Route::get('/analytics', function () {
        return Inertia::render('Analytics/Dashboard');
    })->name('analytics.dashboard');

    // Messages/Inbox routes
    Route::get('/messages', [ContactController::class, 'index'])->name('messages.index');
    Route::get('/messages/{message}', [ContactController::class, 'show'])->name('messages.show');
    Route::post('/messages/{message}/read', [ContactController::class, 'markAsRead'])->name('messages.read');
    Route::delete('/messages/{message}', [ContactController::class, 'destroy'])->name('messages.destroy');

    // Portfolio routes
    Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio.index');
    Route::put('/portfolio/settings', [PortfolioController::class, 'updateSettings'])->name('portfolio.settings.update');
    Route::post('/portfolio/reorder', [PortfolioController::class, 'reorder'])->name('portfolio.reorder');
    Route::post('/portfolio/branding', [PortfolioController::class, 'updateBranding'])->name('portfolio.branding.update');
    Route::delete('/portfolio/branding', [PortfolioController::class, 'removeBranding'])->name('portfolio.branding.remove');

    // Projects
    Route::get('/portfolio/projects/create', [PortfolioController::class, 'createProject'])->name('portfolio.projects.create');
    Route::post('/portfolio/projects', [PortfolioController::class, 'storeProject'])->name('portfolio.projects.store');
    Route::get('/portfolio/projects/{project}/edit', [PortfolioController::class, 'editProject'])->name('portfolio.projects.edit');
    Route::put('/portfolio/projects/{project}', [PortfolioController::class, 'updateProject'])->name('portfolio.projects.update');
    Route::delete('/portfolio/projects/{project}', [PortfolioController::class, 'destroyProject'])->name('portfolio.projects.destroy');
    Route::post('/portfolio/projects/{project}/image', [PortfolioController::class, 'uploadProjectImage'])->name('portfolio.projects.image');
    Route::post('/portfolio/projects/order', [PortfolioController::class, 'updateProjectOrder'])->name('portfolio.projects.order');

    // Testimonials
    Route::post('/portfolio/testimonials', [PortfolioController::class, 'storeTestimonial'])->name('portfolio.testimonials.store');
    Route::put('/portfolio/testimonials/{testimonial}', [PortfolioController::class, 'updateTestimonial'])->name('portfolio.testimonials.update');
    Route::delete('/portfolio/testimonials/{testimonial}', [PortfolioController::class, 'destroyTestimonial'])->name('portfolio.testimonials.destroy');
    Route::post('/portfolio/testimonials/{testimonial}/avatar', [PortfolioController::class, 'uploadTestimonialAvatar'])->name('portfolio.testimonials.avatar');

    // Services
    Route::post('/portfolio/services', [PortfolioController::class, 'storeService'])->name('portfolio.services.store');
    Route::put('/portfolio/services/{service}', [PortfolioController::class, 'updateService'])->name('portfolio.services.update');
    Route::delete('/portfolio/services/{service}', [PortfolioController::class, 'destroyService'])->name('portfolio.services.destroy');

    // Certifications
    Route::post('/portfolio/certifications', [PortfolioController::class, 'storeCertification'])->name('portfolio.certifications.store');
    Route::put('/portfolio/certifications/{certification}', [PortfolioController::class, 'updateCertification'])->name('portfolio.certifications.update');
    Route::delete('/portfolio/certifications/{certification}', [PortfolioController::class, 'destroyCertification'])->name('portfolio.certifications.destroy');
    Route::post('/portfolio/certifications/{certification}/badge', [PortfolioController::class, 'uploadCertificationBadge'])->name('portfolio.certifications.badge');

    // Awards
    Route::post('/portfolio/awards', [PortfolioController::class, 'storeAward'])->name('portfolio.awards.store');
    Route::put('/portfolio/awards/{award}', [PortfolioController::class, 'updateAward'])->name('portfolio.awards.update');
    Route::delete('/portfolio/awards/{award}', [PortfolioController::class, 'destroyAward'])->name('portfolio.awards.destroy');
    Route::post('/portfolio/awards/{award}/image', [PortfolioController::class, 'uploadAwardImage'])->name('portfolio.awards.image');

    // Client Logos
    Route::post('/portfolio/client-logos', [PortfolioController::class, 'storeClientLogo'])->name('portfolio.client-logos.store');
    Route::put('/portfolio/client-logos/{clientLogo}', [PortfolioController::class, 'updateClientLogo'])->name('portfolio.client-logos.update');
    Route::delete('/portfolio/client-logos/{clientLogo}', [PortfolioController::class, 'destroyClientLogo'])->name('portfolio.client-logos.destroy');
    Route::post('/portfolio/client-logos/{clientLogo}/logo', [PortfolioController::class, 'uploadClientLogoImage'])->name('portfolio.client-logos.logo');

    // Languages
    Route::post('/portfolio/languages', [PortfolioController::class, 'storeLanguage'])->name('portfolio.languages.store');
    Route::put('/portfolio/languages/{language}', [PortfolioController::class, 'updateLanguage'])->name('portfolio.languages.update');
    Route::delete('/portfolio/languages/{language}', [PortfolioController::class, 'destroyLanguage'])->name('portfolio.languages.destroy');

    // Business Card PDF export
    Route::get('/business-cards/{businessCard}/pdf', [BusinessCardController::class, 'downloadPdf'])->name('business-cards.pdf');
    Route::get('/business-cards/{businessCard}/print-sheet', [BusinessCardController::class, 'downloadPrintSheet'])->name('business-cards.print-sheet');

    // Email Signature Generator
    Route::get('/business-cards/{businessCard}/signature', [BusinessCardController::class, 'emailSignature'])->name('business-cards.signature');

    // NFC Setup Guide
    Route::get('/business-cards/{businessCard}/nfc', [BusinessCardController::class, 'nfcSetup'])->name('business-cards.nfc');

    // Share Business Card via Email
    Route::post('/business-cards/{businessCard}/share', [BusinessCardController::class, 'shareCard'])->name('business-cards.share');

    // Card Leads Management
    Route::get('/leads', [App\Http\Controllers\CardLeadController::class, 'index'])->name('leads.index');
    Route::get('/leads/{lead}', [App\Http\Controllers\CardLeadController::class, 'show'])->name('leads.show');
    Route::post('/leads/{lead}/read', [App\Http\Controllers\CardLeadController::class, 'markAsRead'])->name('leads.read');
    Route::post('/leads/{lead}/reply', [App\Http\Controllers\CardLeadController::class, 'reply'])->name('leads.reply');
    Route::delete('/leads/{lead}', [App\Http\Controllers\CardLeadController::class, 'destroy'])->name('leads.destroy');
});

// Template preview route (public - shows demo data)
Route::get('/templates/{templateSlug}/preview', [PdfExportController::class, 'templatePreview'])->name('templates.preview');

// Legal pages (public)
Route::get('/terms', function () {
    return Inertia::render('Legal/Terms');
})->name('terms');

Route::get('/privacy', function () {
    return Inertia::render('Legal/Privacy');
})->name('privacy');

// Public profile and business card routes
Route::get('/card/{slug}', [PublicProfileController::class, 'showBusinessCard'])->name('public.card');
Route::get('/card/{slug}/qr', [PublicProfileController::class, 'getCardQrCode'])->name('public.card.qr');
Route::get('/@{username}', [PublicProfileController::class, 'showProfile'])->name('public.profile');
Route::get('/@{username}/resume/{resumeId}', [PublicProfileController::class, 'showResume'])->name('public.resume');
Route::post('/qr/generate', [PublicProfileController::class, 'generateQrCode'])->name('qr.generate');
Route::post('/track/click', [PublicProfileController::class, 'trackClick'])->name('track.click');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Lead capture from business card
Route::post('/card/{slug}/lead', [App\Http\Controllers\CardLeadController::class, 'store'])->name('card.lead');

require __DIR__.'/auth.php';
