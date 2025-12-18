<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AIWizardService;
use App\Models\Resume;
use App\Models\WorkExperience;
use App\Models\Education;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AIWizardController extends Controller
{
    private AIWizardService $wizardService;

    public function __construct(AIWizardService $wizardService)
    {
        $this->wizardService = $wizardService;
    }

    /**
     * Get the current step information
     */
    public function getStep(Request $request)
    {
        $step = $request->get('step', 'welcome');
        $collectedData = $request->get('data', []);

        $stepInfo = $this->wizardService->processStep([], $collectedData, $step);

        return response()->json([
            'success' => true,
            'data' => $stepInfo
        ]);
    }

    /**
     * Process user input and get next step
     */
    public function processInput(Request $request)
    {
        $currentStep = $request->input('step');
        $value = $request->input('value');
        $collectedData = $request->input('data', []);

        // Store the value in collected data
        $stepInfo = $this->wizardService->processStep([], $collectedData, $currentStep);

        if (isset($stepInfo['field'])) {
            $collectedData[$stepInfo['field']] = $value;
        }

        // Get next step
        $nextStep = $this->wizardService->getNextStep($currentStep);

        // If we're moving from summary_prompt, enhance the summary
        if ($currentStep === 'summary_prompt' && !empty($value)) {
            $cvType = $collectedData['cv_type'] ?? 'professional';
            $collectedData['summary'] = $this->wizardService->enhanceSummary($value, $cvType);
        }

        if ($nextStep) {
            $nextStepInfo = $this->wizardService->processStep([], $collectedData, $nextStep);
            return response()->json([
                'success' => true,
                'data' => $collectedData,
                'nextStep' => $nextStepInfo
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $collectedData,
            'done' => true
        ]);
    }

    /**
     * Enhance text (summary or description)
     */
    public function enhance(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:1000',
            'type' => 'required|in:summary,work,education',
            'cv_type' => 'nullable|string',
        ]);

        try {
            $enhanced = match($validated['type']) {
                'summary' => $this->wizardService->enhanceSummary(
                    $validated['text'],
                    $validated['cv_type'] ?? 'professional'
                ),
                'work', 'education' => $this->wizardService->enhanceWorkDescription($validated['text']),
            };

            return response()->json([
                'success' => true,
                'enhanced' => $enhanced
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to enhance text. Please try again.'
            ], 500);
        }
    }

    /**
     * Create the resume from collected wizard data
     */
    public function createResume(Request $request)
    {
        $validated = $request->validate([
            'data' => 'required|array',
            'data.title' => 'nullable|string|max:255',
            'data.template_id' => 'nullable|integer|exists:templates,id',
            'data.full_name' => 'nullable|string|max:255',
            'data.email' => 'nullable|email|max:255',
            'data.phone' => 'nullable|string|max:50',
            'data.address' => 'nullable|string|max:500',
            'data.summary' => 'nullable|string|max:2000',
            'data.work_experiences' => 'nullable|array|max:20',
            'data.work_experiences.*.company' => 'nullable|string|max:255',
            'data.work_experiences.*.position' => 'nullable|string|max:255',
            'data.work_experiences.*.description' => 'nullable|string|max:2000',
            'data.work_experiences.*.start_date' => 'nullable',
            'data.work_experiences.*.end_date' => 'nullable',
            'data.work_experiences.*.is_current' => 'nullable|boolean',
            'data.educations' => 'nullable|array|max:20',
            'data.educations.*.institution' => 'nullable|string|max:255',
            'data.educations.*.degree' => 'nullable|string|max:255',
            'data.educations.*.field' => 'nullable|string|max:255',
            'data.educations.*.description' => 'nullable|string|max:2000',
            'data.educations.*.start_date' => 'nullable',
            'data.educations.*.end_date' => 'nullable',
            'data.educations.*.is_current' => 'nullable|boolean',
            'data.skills' => 'nullable', // Can be array or string
        ]);

        $data = $validated['data'];

        // Normalize skills to array
        if (isset($data['skills']) && !is_array($data['skills'])) {
            $data['skills'] = array_map('trim', explode(',', $data['skills']));
        }

        try {
            // Enhance all data with AI before saving
            $data = $this->enhanceAllData($data);

            DB::beginTransaction();

            // Create the resume
            $resume = Resume::create([
                'user_id' => Auth::id(),
                'title' => $data['title'] ?? 'My CV',
                'template_id' => $data['template_id'] ?? 1,
                'personal_info' => [
                    'full_name' => $data['full_name'] ?? '',
                    'email' => $data['email'] ?? '',
                    'phone' => $data['phone'] ?? '',
                    'address' => $data['address'] ?? '',
                    'summary' => $data['summary'] ?? '',
                ],
            ]);

            // Add work experiences
            if (!empty($data['work_experiences']) && is_array($data['work_experiences'])) {
                foreach ($data['work_experiences'] as $index => $work) {
                    WorkExperience::create([
                        'resume_id' => $resume->id,
                        'company' => $work['company'] ?? '',
                        'position' => $work['position'] ?? '',
                        'description' => $work['description'] ?? '',
                        'start_date' => $work['start_date'] ?? now()->format('Y-m-d'),
                        'end_date' => $work['is_current'] ? null : ($work['end_date'] ?? null),
                        'is_current' => $work['is_current'] ?? false,
                        'order' => $index,
                    ]);
                }
            }

            // Add education
            if (!empty($data['educations']) && is_array($data['educations'])) {
                foreach ($data['educations'] as $index => $edu) {
                    Education::create([
                        'resume_id' => $resume->id,
                        'institution' => $edu['institution'] ?? '',
                        'degree' => $edu['degree'] ?? '',
                        'field' => $edu['field'] ?? '',
                        'description' => $edu['description'] ?? '',
                        'start_date' => $edu['start_date'] ?? now()->format('Y-m-d'),
                        'end_date' => $edu['is_current'] ? null : ($edu['end_date'] ?? null),
                        'is_current' => $edu['is_current'] ?? false,
                        'order' => $index,
                    ]);
                }
            }

            // Add skills
            if (!empty($data['skills'])) {
                $skillsList = is_array($data['skills'])
                    ? $data['skills']
                    : array_map('trim', explode(',', $data['skills']));

                foreach ($skillsList as $index => $skill) {
                    if (!empty(trim($skill))) {
                        $skillName = is_array($skill) ? ($skill['name'] ?? $skill) : $skill;
                        Skill::create([
                            'resume_id' => $resume->id,
                            'name' => trim($skillName),
                            'proficiency_level' => 'intermediate',
                            'order' => $index,
                        ]);
                    }
                }
            }

            DB::commit();

            // Load relationships for response
            $resume->load(['workExperiences', 'educations', 'skills']);

            return response()->json([
                'success' => true,
                'message' => 'CV created successfully!',
                'resume' => $resume
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create resume from wizard', [
                'error' => $e->getMessage(),
                'data' => $data
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create CV. Please try again.'
            ], 500);
        }
    }

    /**
     * Enhance all collected data with AI
     */
    private function enhanceAllData(array $data): array
    {
        // Format name properly
        if (!empty($data['full_name'])) {
            $data['full_name'] = $this->wizardService->formatName($data['full_name']);
        }

        // Format phone
        if (!empty($data['phone'])) {
            $data['phone'] = $this->wizardService->formatPhone($data['phone']);
        }

        // Enhance summary if not already enhanced
        if (!empty($data['summary_draft']) && empty($data['summary'])) {
            $data['summary'] = $this->wizardService->enhanceSummary(
                $data['summary_draft'],
                $data['cv_type'] ?? 'professional'
            );
        }

        // Enhance work experience descriptions
        if (!empty($data['work_experiences']) && is_array($data['work_experiences'])) {
            foreach ($data['work_experiences'] as $index => $work) {
                if (!empty($work['description'])) {
                    $data['work_experiences'][$index]['description'] =
                        $this->wizardService->enhanceWorkDescription($work['description']);
                }
            }
        }

        // Enhance education descriptions
        if (!empty($data['educations']) && is_array($data['educations'])) {
            foreach ($data['educations'] as $index => $edu) {
                if (!empty($edu['description'])) {
                    $data['educations'][$index]['description'] =
                        $this->wizardService->enhanceWorkDescription($edu['description']);
                }
            }
        }

        // Enhance skills
        if (!empty($data['skills']) && is_array($data['skills'])) {
            $data['skills'] = $this->wizardService->enhanceSkills($data['skills']);
        }

        return $data;
    }
}
