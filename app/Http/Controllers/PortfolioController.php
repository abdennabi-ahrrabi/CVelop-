<?php

namespace App\Http\Controllers;

use App\Models\Award;
use App\Models\Certification;
use App\Models\ClientLogo;
use App\Models\Project;
use App\Models\Resume;
use App\Models\BusinessCard;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\UserLanguage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    /**
     * Available portfolio templates
     */
    public static function getPortfolioTemplates(): array
    {
        return [
            [
                'id' => 'executive',
                'name' => 'Executive',
                'description' => 'Professional corporate design with navy tones',
            ],
            [
                'id' => 'minimal',
                'name' => 'Minimal',
                'description' => 'Clean white space with elegant typography',
            ],
            [
                'id' => 'studio',
                'name' => 'Studio',
                'description' => 'Bold creative design for designers & artists',
            ],
            [
                'id' => 'developer',
                'name' => 'Developer',
                'description' => 'Dark theme with terminal-inspired aesthetics',
            ],
            [
                'id' => 'luxe',
                'name' => 'Luxe',
                'description' => 'Premium elegant design with gold accents',
            ],
        ];
    }

    /**
     * Display the portfolio dashboard
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Get all resumes for selection
        $resumes = $user->resumes()->with(['template'])->get()->map(function ($resume) {
            return [
                'id' => $resume->id,
                'title' => $resume->title,
                'template' => $resume->template,
                'updated_at' => $resume->updated_at,
                'work_experiences_count' => $resume->workExperiences()->count(),
                'educations_count' => $resume->educations()->count(),
                'skills_count' => $resume->skills()->count(),
            ];
        });

        // Get all business cards for selection
        $businessCards = $user->businessCards()->get()->map(function ($card) {
            return [
                'id' => $card->id,
                'slug' => $card->slug,
                'display_name' => $card->display_name,
                'title' => $card->title,
                'company' => $card->company,
                'template' => $card->template,
                'avatar' => $card->avatar,
                'view_count' => $card->view_count,
                'public_url' => $card->getPublicUrl(),
            ];
        });

        // Get projects
        $projects = $user->projects()->ordered()->get();

        // Get testimonials
        $testimonials = $user->testimonials()->ordered()->get();

        // Get services
        $services = $user->services()->ordered()->get();

        // Get certifications
        $certifications = $user->certifications()->ordered()->get();

        // Get awards
        $awards = $user->awards()->ordered()->get();

        // Get client logos
        $clientLogos = $user->clientLogos()->ordered()->get();

        // Get languages
        $languages = $user->languages()->ordered()->get();

        return Inertia::render('Portfolio/Index', [
            'resumes' => $resumes,
            'businessCards' => $businessCards,
            'projects' => $projects,
            'testimonials' => $testimonials,
            'services' => $services,
            'certifications' => $certifications,
            'awards' => $awards,
            'clientLogos' => $clientLogos,
            'languages' => $languages,
            'portfolioTemplates' => self::getPortfolioTemplates(),
            'settings' => [
                'featured_resume_id' => $user->featured_resume_id,
                'featured_business_card_id' => $user->featured_business_card_id,
                'portfolio_template' => $user->portfolio_template ?? 'executive',
                'availability_status' => $user->availability_status,
                'availability_text' => $user->availability_text,
                'years_of_experience' => $user->years_of_experience,
                'projects_completed' => $user->projects_completed,
                'clients_served' => $user->clients_served,
                'video_intro_url' => $user->video_intro_url,
                'skills_with_levels' => $user->skills_with_levels ?? [],
                'show_testimonials' => $user->show_testimonials ?? true,
                'show_services' => $user->show_services ?? true,
                'show_certifications' => $user->show_certifications ?? true,
                'show_awards' => $user->show_awards ?? true,
                'show_clients' => $user->show_clients ?? true,
                'show_languages' => $user->show_languages ?? true,
                'show_stats' => $user->show_stats ?? true,
                'show_availability' => $user->show_availability ?? true,
            ],
            'branding' => [
                'logo' => $user->logo,
                'logo_url' => $user->logo_url,
                'avatar' => $user->avatar,
                'avatar_url' => $user->avatar_url,
                'cover_image' => $user->cover_image,
                'cover_image_url' => $user->cover_image_url,
                // Computed display URLs
                'logo_display_url' => $user->getLogoUrl(),
                'avatar_display_url' => $user->getAvatarUrl(),
                'cover_display_url' => $user->getCoverImageUrl(),
            ],
            'publicUrl' => $user->getProfileUrl(),
        ]);
    }

    /**
     * Update portfolio settings (featured resume, card, template)
     */
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'featured_resume_id' => 'nullable|exists:resumes,id',
            'featured_business_card_id' => 'nullable|exists:business_cards,id',
            'portfolio_template' => 'required|string|in:executive,minimal,studio,developer,luxe',
            'availability_status' => 'nullable|string|in:available,open_to_work,freelance,employed,not_available',
            'availability_text' => 'nullable|string|max:100',
            'years_of_experience' => 'nullable|integer|min:0|max:100',
            'projects_completed' => 'nullable|integer|min:0',
            'clients_served' => 'nullable|integer|min:0',
            'video_intro_url' => 'nullable|url|max:500',
            'skills_with_levels' => 'nullable|array',
            'skills_with_levels.*.name' => 'required|string|max:100',
            'skills_with_levels.*.level' => 'required|integer|min:1|max:5',
            'show_testimonials' => 'boolean',
            'show_services' => 'boolean',
            'show_certifications' => 'boolean',
            'show_awards' => 'boolean',
            'show_clients' => 'boolean',
            'show_languages' => 'boolean',
            'show_stats' => 'boolean',
            'show_availability' => 'boolean',
        ]);

        $user = $request->user();

        // Verify ownership of resume
        if (!empty($validated['featured_resume_id'])) {
            $resume = Resume::find($validated['featured_resume_id']);
            if (!$resume || $resume->user_id !== $user->id) {
                return back()->withErrors(['featured_resume_id' => 'Invalid resume selected']);
            }
        }

        // Verify ownership of business card
        if (!empty($validated['featured_business_card_id'])) {
            $card = BusinessCard::find($validated['featured_business_card_id']);
            if (!$card || $card->user_id !== $user->id) {
                return back()->withErrors(['featured_business_card_id' => 'Invalid business card selected']);
            }
        }

        $user->update($validated);

        return back()->with('success', 'Portfolio settings updated!');
    }

    /**
     * Show project creation form
     */
    public function createProject()
    {
        return Inertia::render('Portfolio/ProjectEditor');
    }

    /**
     * Store a new project
     */
    public function storeProject(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'url' => 'nullable|url|max:500',
            'github_url' => 'nullable|url|max:500',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:50',
            'category' => 'nullable|string|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_featured' => 'boolean',
            'is_visible' => 'boolean',
        ]);

        $request->user()->projects()->create($validated);

        return redirect()->route('portfolio.index')->with('success', 'Project created successfully!');
    }

    /**
     * Show project edit form
     */
    public function editProject(Request $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        return Inertia::render('Portfolio/ProjectEditor', [
            'project' => $project,
        ]);
    }

    /**
     * Update a project
     */
    public function updateProject(Request $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'url' => 'nullable|url|max:500',
            'github_url' => 'nullable|url|max:500',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:50',
            'category' => 'nullable|string|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_featured' => 'boolean',
            'is_visible' => 'boolean',
        ]);

        $project->update($validated);

        return redirect()->route('portfolio.index')->with('success', 'Project updated successfully!');
    }

    /**
     * Upload project image
     */
    public function uploadProjectImage(Request $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'image' => 'required|image|max:5120',
        ]);

        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $path = $request->file('image')->store('projects', 'public');
        $project->update(['image' => $path]);

        return response()->json([
            'success' => true,
            'image_url' => asset('storage/' . $path),
        ]);
    }

    /**
     * Update project order
     */
    public function updateProjectOrder(Request $request)
    {
        $validated = $request->validate([
            'projects' => 'required|array',
            'projects.*.id' => 'required|exists:projects,id',
            'projects.*.sort_order' => 'required|integer|min:0',
        ]);

        foreach ($validated['projects'] as $item) {
            Project::where('id', $item['id'])
                ->where('user_id', $request->user()->id)
                ->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json(['success' => true]);
    }

    /**
     * Delete a project
     */
    public function destroyProject(Request $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return redirect()->route('portfolio.index')->with('success', 'Project deleted.');
    }

    // ==================== TESTIMONIALS ====================

    public function storeTestimonial(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_title' => 'nullable|string|max:255',
            'client_company' => 'nullable|string|max:255',
            'content' => 'required|string|max:2000',
            'rating' => 'nullable|integer|min:1|max:5',
            'project_name' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'is_visible' => 'boolean',
        ]);

        $request->user()->testimonials()->create($validated);

        return back()->with('success', 'Testimonial added successfully!');
    }

    public function updateTestimonial(Request $request, Testimonial $testimonial)
    {
        if ($testimonial->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_title' => 'nullable|string|max:255',
            'client_company' => 'nullable|string|max:255',
            'content' => 'required|string|max:2000',
            'rating' => 'nullable|integer|min:1|max:5',
            'project_name' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'is_visible' => 'boolean',
        ]);

        $testimonial->update($validated);

        return back()->with('success', 'Testimonial updated successfully!');
    }

    public function uploadTestimonialAvatar(Request $request, Testimonial $testimonial)
    {
        if ($testimonial->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate(['avatar' => 'required|image|max:2048']);

        if ($testimonial->client_avatar) {
            Storage::disk('public')->delete($testimonial->client_avatar);
        }

        $path = $request->file('avatar')->store('testimonials', 'public');
        $testimonial->update(['client_avatar' => $path]);

        return response()->json(['success' => true, 'avatar_url' => asset('storage/' . $path)]);
    }

    public function destroyTestimonial(Request $request, Testimonial $testimonial)
    {
        if ($testimonial->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($testimonial->client_avatar) {
            Storage::disk('public')->delete($testimonial->client_avatar);
        }

        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted.');
    }

    // ==================== SERVICES ====================

    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'icon' => 'nullable|string|max:100',
            'price_from' => 'nullable|numeric|min:0',
            'price_to' => 'nullable|numeric|min:0',
            'price_unit' => 'nullable|string|max:50',
            'features' => 'nullable|array',
            'features.*' => 'string|max:255',
            'is_visible' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $request->user()->services()->create($validated);

        return back()->with('success', 'Service added successfully!');
    }

    public function updateService(Request $request, Service $service)
    {
        if ($service->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'icon' => 'nullable|string|max:100',
            'price_from' => 'nullable|numeric|min:0',
            'price_to' => 'nullable|numeric|min:0',
            'price_unit' => 'nullable|string|max:50',
            'features' => 'nullable|array',
            'features.*' => 'string|max:255',
            'is_visible' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $service->update($validated);

        return back()->with('success', 'Service updated successfully!');
    }

    public function destroyService(Request $request, Service $service)
    {
        if ($service->user_id !== $request->user()->id) {
            abort(403);
        }

        $service->delete();

        return back()->with('success', 'Service deleted.');
    }

    // ==================== CERTIFICATIONS ====================

    public function storeCertification(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'credential_id' => 'nullable|string|max:255',
            'credential_url' => 'nullable|url|max:500',
            'issue_date' => 'nullable|date',
            'expiry_date' => 'nullable|date',
            'does_not_expire' => 'boolean',
            'is_visible' => 'boolean',
        ]);

        $request->user()->certifications()->create($validated);

        return back()->with('success', 'Certification added successfully!');
    }

    public function updateCertification(Request $request, Certification $certification)
    {
        if ($certification->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'credential_id' => 'nullable|string|max:255',
            'credential_url' => 'nullable|url|max:500',
            'issue_date' => 'nullable|date',
            'expiry_date' => 'nullable|date',
            'does_not_expire' => 'boolean',
            'is_visible' => 'boolean',
        ]);

        $certification->update($validated);

        return back()->with('success', 'Certification updated successfully!');
    }

    public function uploadCertificationBadge(Request $request, Certification $certification)
    {
        if ($certification->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate(['badge' => 'required|image|max:2048']);

        if ($certification->badge_image) {
            Storage::disk('public')->delete($certification->badge_image);
        }

        $path = $request->file('badge')->store('certifications', 'public');
        $certification->update(['badge_image' => $path]);

        return response()->json(['success' => true, 'badge_url' => asset('storage/' . $path)]);
    }

    public function destroyCertification(Request $request, Certification $certification)
    {
        if ($certification->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($certification->badge_image) {
            Storage::disk('public')->delete($certification->badge_image);
        }

        $certification->delete();

        return back()->with('success', 'Certification deleted.');
    }

    // ==================== AWARDS ====================

    public function storeAward(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'date' => 'nullable|date',
            'url' => 'nullable|url|max:500',
            'is_visible' => 'boolean',
        ]);

        $request->user()->awards()->create($validated);

        return back()->with('success', 'Award added successfully!');
    }

    public function updateAward(Request $request, Award $award)
    {
        if ($award->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'date' => 'nullable|date',
            'url' => 'nullable|url|max:500',
            'is_visible' => 'boolean',
        ]);

        $award->update($validated);

        return back()->with('success', 'Award updated successfully!');
    }

    public function uploadAwardImage(Request $request, Award $award)
    {
        if ($award->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate(['image' => 'required|image|max:2048']);

        if ($award->image) {
            Storage::disk('public')->delete($award->image);
        }

        $path = $request->file('image')->store('awards', 'public');
        $award->update(['image' => $path]);

        return response()->json(['success' => true, 'image_url' => asset('storage/' . $path)]);
    }

    public function destroyAward(Request $request, Award $award)
    {
        if ($award->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($award->image) {
            Storage::disk('public')->delete($award->image);
        }

        $award->delete();

        return back()->with('success', 'Award deleted.');
    }

    // ==================== CLIENT LOGOS ====================

    public function storeClientLogo(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'logo_url' => 'nullable|url|max:500',
            'url' => 'nullable|url|max:500',
            'is_visible' => 'boolean',
        ]);

        // Require either logo file or logo_url
        if (!$request->hasFile('logo') && !$request->logo_url) {
            return back()->withErrors(['logo' => 'Please upload an image or provide an image URL.']);
        }

        $data = [
            'name' => $request->name,
            'url' => $request->url,
            'is_visible' => $request->boolean('is_visible', true),
        ];

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('client-logos', 'public');
            $data['logo_url'] = null; // Clear URL if uploading file
        } else {
            $data['logo_url'] = $request->logo_url;
            $data['logo'] = null; // Clear file if using URL
        }

        $request->user()->clientLogos()->create($data);

        return back()->with('success', 'Client logo added successfully!');
    }

    public function updateClientLogo(Request $request, ClientLogo $clientLogo)
    {
        if ($clientLogo->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo_url' => 'nullable|url|max:500',
            'url' => 'nullable|url|max:500',
            'is_visible' => 'boolean',
        ]);

        // If logo_url is provided, clear the uploaded file
        if (!empty($validated['logo_url'])) {
            if ($clientLogo->logo) {
                Storage::disk('public')->delete($clientLogo->logo);
            }
            $validated['logo'] = null;
        }

        $clientLogo->update($validated);

        return back()->with('success', 'Client logo updated successfully!');
    }

    public function uploadClientLogoImage(Request $request, ClientLogo $clientLogo)
    {
        if ($clientLogo->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate(['logo' => 'required|image|max:2048']);

        if ($clientLogo->logo) {
            Storage::disk('public')->delete($clientLogo->logo);
        }

        $path = $request->file('logo')->store('client-logos', 'public');
        $clientLogo->update([
            'logo' => $path,
            'logo_url' => null, // Clear URL when uploading file
        ]);

        return response()->json(['success' => true, 'logo_url' => asset('storage/' . $path)]);
    }

    public function destroyClientLogo(Request $request, ClientLogo $clientLogo)
    {
        if ($clientLogo->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($clientLogo->logo) {
            Storage::disk('public')->delete($clientLogo->logo);
        }

        $clientLogo->delete();

        return back()->with('success', 'Client logo deleted.');
    }

    // ==================== LANGUAGES ====================

    public function storeLanguage(Request $request)
    {
        $validated = $request->validate([
            'language' => 'required|string|max:100',
            'proficiency' => 'required|string|in:native,fluent,advanced,intermediate,basic',
            'is_visible' => 'boolean',
        ]);

        $request->user()->languages()->create($validated);

        return back()->with('success', 'Language added successfully!');
    }

    public function updateLanguage(Request $request, UserLanguage $language)
    {
        if ($language->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'language' => 'required|string|max:100',
            'proficiency' => 'required|string|in:native,fluent,advanced,intermediate,basic',
            'is_visible' => 'boolean',
        ]);

        $language->update($validated);

        return back()->with('success', 'Language updated successfully!');
    }

    public function destroyLanguage(Request $request, UserLanguage $language)
    {
        if ($language->user_id !== $request->user()->id) {
            abort(403);
        }

        $language->delete();

        return back()->with('success', 'Language deleted.');
    }

    // ==================== BRANDING (Logo, Avatar, Cover) ====================

    /**
     * Update branding images (logo, avatar, cover) - supports both file upload and URL
     */
    public function updateBranding(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:logo,avatar,cover_image',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|url|max:500',
        ]);

        $user = $request->user();
        $type = $validated['type'];

        // Map type to field names
        $fieldMap = [
            'logo' => ['file' => 'logo', 'url' => 'logo_url'],
            'avatar' => ['file' => 'avatar', 'url' => 'avatar_url'],
            'cover_image' => ['file' => 'cover_image', 'url' => 'cover_image_url'],
        ];

        $fileField = $fieldMap[$type]['file'];
        $urlField = $fieldMap[$type]['url'];

        // Handle file upload
        if ($request->hasFile('image')) {
            // Delete old file if exists
            if ($user->$fileField) {
                Storage::disk('public')->delete($user->$fileField);
            }

            $folder = $type === 'cover_image' ? 'covers' : ($type === 'logo' ? 'logos' : 'avatars');
            $path = $request->file('image')->store($folder, 'public');

            $user->update([
                $fileField => $path,
                $urlField => null, // Clear URL when uploading file
            ]);

            return back()->with('success', ucfirst(str_replace('_', ' ', $type)) . ' updated!');
        }

        // Handle URL
        if (!empty($validated['image_url'])) {
            // Delete old file if exists
            if ($user->$fileField) {
                Storage::disk('public')->delete($user->$fileField);
            }

            $user->update([
                $fileField => null, // Clear file when using URL
                $urlField => $validated['image_url'],
            ]);

            return back()->with('success', ucfirst(str_replace('_', ' ', $type)) . ' updated!');
        }

        return back()->withErrors(['image' => 'No image provided']);
    }

    /**
     * Remove a branding image
     */
    public function removeBranding(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:logo,avatar,cover_image',
        ]);

        $user = $request->user();
        $type = $validated['type'];

        $fieldMap = [
            'logo' => ['file' => 'logo', 'url' => 'logo_url'],
            'avatar' => ['file' => 'avatar', 'url' => 'avatar_url'],
            'cover_image' => ['file' => 'cover_image', 'url' => 'cover_image_url'],
        ];

        $fileField = $fieldMap[$type]['file'];
        $urlField = $fieldMap[$type]['url'];

        // Delete file if exists
        if ($user->$fileField) {
            Storage::disk('public')->delete($user->$fileField);
        }

        $user->update([
            $fileField => null,
            $urlField => null,
        ]);

        return back()->with('success', ucfirst(str_replace('_', ' ', $type)) . ' removed!');
    }

    // ==================== REORDER ====================

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:testimonials,services,certifications,awards,client_logos,languages',
            'items' => 'required|array',
            'items.*.id' => 'required|integer',
            'items.*.sort_order' => 'required|integer|min:0',
        ]);

        $user = $request->user();
        $type = $validated['type'];

        $modelMap = [
            'testimonials' => Testimonial::class,
            'services' => Service::class,
            'certifications' => Certification::class,
            'awards' => Award::class,
            'client_logos' => ClientLogo::class,
            'languages' => UserLanguage::class,
        ];

        $model = $modelMap[$type];

        foreach ($validated['items'] as $item) {
            $model::where('id', $item['id'])
                ->where('user_id', $user->id)
                ->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json(['success' => true]);
    }
}
