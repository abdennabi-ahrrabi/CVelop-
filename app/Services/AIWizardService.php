<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIWizardService
{
    private string $provider;
    private string $apiKey;
    private string $apiUrl;
    private string $model;

    private bool $isConfigured = false;

    public function __construct()
    {
        $this->provider = config('services.ai.provider', 'groq');

        if ($this->provider === 'groq') {
            $this->apiKey = config('services.groq.api_key', '');
            $this->model = config('services.groq.model', 'llama-3.1-8b-instant');
            $this->apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
        } else {
            $this->apiKey = config('services.gemini.api_key', '');
            $this->model = config('services.gemini.model', 'gemini-2.0-flash');
            $this->apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}";
        }

        $this->isConfigured = !empty($this->apiKey);
    }

    /**
     * Process a wizard step and get the next question or action
     */
    public function processStep(array $conversationHistory, array $collectedData, string $currentStep): array
    {
        $steps = $this->getSteps();
        $stepConfig = $steps[$currentStep] ?? null;

        if (!$stepConfig) {
            return [
                'done' => true,
                'message' => 'CV creation complete!',
                'data' => $collectedData
            ];
        }

        return [
            'done' => false,
            'step' => $currentStep,
            'question' => $stepConfig['question'],
            'field' => $stepConfig['field'],
            'type' => $stepConfig['type'],
            'options' => $stepConfig['options'] ?? null,
            'placeholder' => $stepConfig['placeholder'] ?? '',
            'required' => $stepConfig['required'] ?? true,
            'canAddMore' => $stepConfig['canAddMore'] ?? false,
        ];
    }

    /**
     * Get the wizard steps configuration
     */
    private function getSteps(): array
    {
        return [
            'welcome' => [
                'question' => "Hi! I'm your AI CV assistant. I'll help you create a professional CV step by step. What type of CV would you like to create?",
                'field' => 'cv_type',
                'type' => 'select',
                'options' => [
                    ['value' => 'professional', 'label' => 'Professional CV'],
                    ['value' => 'academic', 'label' => 'Academic CV'],
                    ['value' => 'creative', 'label' => 'Creative CV'],
                    ['value' => 'entry_level', 'label' => 'Entry Level / Fresh Graduate'],
                ],
                'required' => true,
            ],
            'cv_title' => [
                'question' => "Great choice! Let's start by giving your CV a title. This helps you identify it later if you create multiple CVs.",
                'field' => 'title',
                'type' => 'text',
                'placeholder' => 'e.g., Software Developer CV, Marketing Manager Resume',
                'required' => true,
            ],
            'full_name' => [
                'question' => "What's your full name?",
                'field' => 'full_name',
                'type' => 'text',
                'placeholder' => 'John Doe',
                'required' => true,
            ],
            'email' => [
                'question' => "What's your email address?",
                'field' => 'email',
                'type' => 'email',
                'placeholder' => 'john@example.com',
                'required' => true,
            ],
            'phone' => [
                'question' => "What's your phone number? (Optional - you can skip this)",
                'field' => 'phone',
                'type' => 'tel',
                'placeholder' => '+1 (555) 123-4567',
                'required' => false,
            ],
            'location' => [
                'question' => "Where are you located? (City, Country)",
                'field' => 'address',
                'type' => 'text',
                'placeholder' => 'San Francisco, USA',
                'required' => false,
            ],
            'summary_prompt' => [
                'question' => "Tell me briefly about yourself - your professional background, what you do, and what you're looking for. I'll help polish it into a professional summary.",
                'field' => 'summary_draft',
                'type' => 'textarea',
                'placeholder' => "e.g., I'm a software developer with 5 years of experience in web development. I specialize in React and Node.js. Looking for senior developer roles...",
                'required' => true,
            ],
            'work_experience' => [
                'question' => "Let's add your work experience. Tell me about your most recent or current job:",
                'field' => 'work_experience',
                'type' => 'work_form',
                'required' => false,
                'canAddMore' => true,
            ],
            'education' => [
                'question' => "Now let's add your education. Tell me about your highest degree or most relevant education:",
                'field' => 'education',
                'type' => 'education_form',
                'required' => false,
                'canAddMore' => true,
            ],
            'skills' => [
                'question' => "What are your key skills? List them separated by commas (e.g., JavaScript, Project Management, Communication)",
                'field' => 'skills',
                'type' => 'skills_input',
                'placeholder' => 'JavaScript, React, Node.js, Project Management',
                'required' => false,
            ],
            'template' => [
                'question' => "Almost done! Choose a template for your CV:",
                'field' => 'template_id',
                'type' => 'template_select',
                'required' => true,
            ],
            'complete' => [
                'question' => "Your CV is ready! Here's a preview. Would you like to make any changes or save it?",
                'field' => 'action',
                'type' => 'complete',
                'required' => false,
            ],
        ];
    }

    /**
     * Get the next step based on current step
     */
    public function getNextStep(string $currentStep): ?string
    {
        $stepOrder = [
            'welcome',
            'cv_title',
            'full_name',
            'email',
            'phone',
            'location',
            'summary_prompt',
            'work_experience',
            'education',
            'skills',
            'template',
            'complete',
        ];

        $currentIndex = array_search($currentStep, $stepOrder);
        if ($currentIndex === false || $currentIndex >= count($stepOrder) - 1) {
            return null;
        }

        return $stepOrder[$currentIndex + 1];
    }

    /**
     * Enhance a professional summary using AI
     */
    public function enhanceSummary(string $draft, string $cvType): string
    {
        if (!$this->isConfigured) {
            Log::warning('AI Wizard: API key not configured, returning original draft');
            return $draft;
        }

        if (empty(trim($draft))) {
            return $draft;
        }

        $prompt = $this->buildSummaryPrompt($draft, $cvType);

        try {
            if ($this->provider === 'groq') {
                return $this->callGroqApi($prompt);
            } else {
                return $this->callGeminiApi($prompt);
            }
        } catch (\Exception $e) {
            Log::error('AI Summary enhancement failed', [
                'error' => $e->getMessage(),
                'provider' => $this->provider,
                'cv_type' => $cvType,
            ]);
            return $draft; // Return original if AI fails
        }
    }

    /**
     * Enhance work experience description
     */
    public function enhanceWorkDescription(string $description): string
    {
        if (!$this->isConfigured) {
            Log::warning('AI Wizard: API key not configured, returning original description');
            return $description;
        }

        if (empty(trim($description))) {
            return $description;
        }

        $prompt = "You are a professional resume writer. Improve this work experience description to be more impactful, action-oriented, and achievement-focused. Use strong action verbs and quantify results when possible. Keep it concise (2-3 sentences max). Only provide the improved version, no explanations:\n\n{$description}";

        try {
            if ($this->provider === 'groq') {
                return $this->callGroqApi($prompt);
            } else {
                return $this->callGeminiApi($prompt);
            }
        } catch (\Exception $e) {
            Log::error('AI Work description enhancement failed', [
                'error' => $e->getMessage(),
                'provider' => $this->provider,
            ]);
            return $description;
        }
    }

    /**
     * Enhance and organize skills list
     */
    public function enhanceSkills(array $skills): array
    {
        if (!$this->isConfigured || empty($skills)) {
            return $skills;
        }

        $skillsText = implode(', ', array_filter($skills));
        if (empty($skillsText)) {
            return $skills;
        }

        $prompt = "You are a professional resume writer. Given these skills: \"{$skillsText}\"\n\nPlease:\n1. Fix any spelling mistakes\n2. Standardize skill names (e.g., 'js' -> 'JavaScript', 'react.js' -> 'React')\n3. Remove duplicates\n4. Keep only relevant professional skills\n\nReturn ONLY a comma-separated list of the improved skills, nothing else.";

        try {
            $enhanced = $this->provider === 'groq'
                ? $this->callGroqApi($prompt)
                : $this->callGeminiApi($prompt);

            return array_map('trim', explode(',', $enhanced));
        } catch (\Exception $e) {
            Log::error('AI Skills enhancement failed', ['error' => $e->getMessage()]);
            return $skills;
        }
    }

    /**
     * Format and validate name
     */
    public function formatName(string $name): string
    {
        if (empty(trim($name))) {
            return $name;
        }

        // Simple name formatting - capitalize each word properly
        return mb_convert_case(trim($name), MB_CASE_TITLE, 'UTF-8');
    }

    /**
     * Format phone number
     */
    public function formatPhone(string $phone): string
    {
        if (empty(trim($phone))) {
            return $phone;
        }

        // Remove extra spaces and keep digits and common phone characters
        return preg_replace('/\s+/', ' ', trim($phone));
    }

    private function buildSummaryPrompt(string $draft, string $cvType): string
    {
        $toneGuide = match($cvType) {
            'academic' => 'Use formal, academic language appropriate for academic positions.',
            'creative' => 'Use creative, engaging language that showcases personality while remaining professional.',
            'entry_level' => 'Focus on potential, education, and transferable skills. Be enthusiastic but professional.',
            default => 'Use professional, confident language suitable for corporate environments.',
        };

        return "You are a professional CV writer. Transform this rough description into a polished professional summary for a CV. {$toneGuide} Keep it to 2-3 sentences. Only provide the enhanced summary, no explanations:\n\n{$draft}";
    }

    private function callGroqApi(string $prompt): string
    {
        $response = Http::timeout(30)
            ->withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
                'Content-Type' => 'application/json',
            ])
            ->post($this->apiUrl, [
                'model' => $this->model,
                'messages' => [
                    ['role' => 'user', 'content' => $prompt]
                ],
                'max_tokens' => 300,
                'temperature' => 0.7,
            ]);

        if (!$response->successful()) {
            Log::error('Groq API error in Wizard', [
                'status' => $response->status(),
                'response' => $response->json(),
            ]);

            if ($response->status() === 429) {
                throw new \Exception('AI service rate limit exceeded. Please try again later.');
            } elseif ($response->status() === 401) {
                throw new \Exception('AI service authentication failed.');
            }

            throw new \Exception('AI service temporarily unavailable.');
        }

        $text = $response->json()['choices'][0]['message']['content'] ?? '';

        if (empty($text)) {
            throw new \Exception('AI returned empty response');
        }

        return trim($text);
    }

    private function callGeminiApi(string $prompt): string
    {
        $response = Http::timeout(30)->post($this->apiUrl, [
            'contents' => [
                ['parts' => [['text' => $prompt]]]
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'maxOutputTokens' => 300,
            ]
        ]);

        if (!$response->successful()) {
            Log::error('Gemini API error in Wizard', [
                'status' => $response->status(),
                'response' => $response->json(),
            ]);

            if ($response->status() === 429) {
                throw new \Exception('AI service rate limit exceeded. Please try again later.');
            } elseif ($response->status() === 401 || $response->status() === 403) {
                throw new \Exception('AI service authentication failed.');
            }

            throw new \Exception('AI service temporarily unavailable.');
        }

        $text = $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? '';

        if (empty($text)) {
            throw new \Exception('AI returned empty response');
        }

        return trim($text);
    }
}
