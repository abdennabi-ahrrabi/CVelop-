<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class AIEnhancementService
{
    private string $provider;
    private string $apiKey;
    private string $apiUrl;
    private string $model;
    private int $maxTokens = 150;
    private float $temperature = 0.7;

    public function __construct()
    {
        $this->provider = config('services.ai.provider', 'groq');

        if ($this->provider === 'groq') {
            $this->apiKey = config('services.groq.api_key');
            $this->model = config('services.groq.model', 'llama-3.1-8b-instant');
            $this->apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

            if (empty($this->apiKey)) {
                throw new \Exception('Groq API key is not configured. Get your free key at https://console.groq.com');
            }
        } else {
            $this->apiKey = config('services.gemini.api_key');
            $this->model = config('services.gemini.model', 'gemini-2.0-flash');
            $this->apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}";

            if (empty($this->apiKey)) {
                throw new \Exception('Gemini API key is not configured. Get your free key at https://aistudio.google.com/apikey');
            }
        }
    }

    /**
     * Enhance a work experience bullet point using AI
     */
    public function enhanceBulletPoint(string $bulletPoint, string $userId): array
    {
        if (empty(trim($bulletPoint))) {
            throw new \InvalidArgumentException('Bullet point cannot be empty');
        }

        if (strlen($bulletPoint) > 500) {
            throw new \InvalidArgumentException('Bullet point is too long (max 500 characters)');
        }

        $this->checkRateLimit($userId);

        try {
            $prompt = "You are a professional resume writer. Your task is to improve work experience bullet points to make them more impactful, action-oriented, and achievement-focused. Use strong action verbs, quantify results when possible, and maintain a professional tone. Keep the enhanced version concise.\n\nImprove this resume bullet point:\n\n{$bulletPoint}\n\nProvide only the improved version without any additional explanation or formatting.";

            if ($this->provider === 'groq') {
                $response = $this->callGroqApi($prompt);
            } else {
                $response = $this->callGeminiApi($prompt);
            }

            $this->incrementRateLimit($userId);

            return [
                'success' => true,
                'original' => $bulletPoint,
                'enhanced' => trim($response['text']),
                'usage' => $response['usage'] ?? [],
            ];

        } catch (\Exception $e) {
            Log::error('AI Enhancement failed', [
                'error' => $e->getMessage(),
                'user_id' => $userId,
                'bullet_point' => $bulletPoint,
                'provider' => $this->provider
            ]);

            throw $e;
        }
    }

    /**
     * Call Groq API (OpenAI-compatible)
     */
    private function callGroqApi(string $prompt): array
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
                'max_tokens' => $this->maxTokens,
                'temperature' => $this->temperature,
            ]);

        if (!$response->successful()) {
            $error = $response->json();
            Log::error('Groq API error', [
                'status' => $response->status(),
                'error' => $error
            ]);

            if ($response->status() === 429) {
                throw new \Exception('AI service rate limit exceeded. Please try again later.');
            } elseif ($response->status() === 401) {
                throw new \Exception('AI service authentication failed. Please check your API key.');
            } else {
                throw new \Exception('AI service is temporarily unavailable.');
            }
        }

        $data = $response->json();
        $text = $data['choices'][0]['message']['content'] ?? null;

        if (empty($text)) {
            throw new \Exception('AI service returned an empty response');
        }

        return [
            'text' => $text,
            'usage' => [
                'prompt_tokens' => $data['usage']['prompt_tokens'] ?? 0,
                'completion_tokens' => $data['usage']['completion_tokens'] ?? 0,
                'total_tokens' => $data['usage']['total_tokens'] ?? 0,
            ]
        ];
    }

    /**
     * Call Gemini API
     */
    private function callGeminiApi(string $prompt): array
    {
        $response = Http::timeout(30)->post($this->apiUrl, [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => $this->temperature,
                'maxOutputTokens' => $this->maxTokens,
            ]
        ]);

        if (!$response->successful()) {
            $error = $response->json();
            Log::error('Gemini API error', [
                'status' => $response->status(),
                'error' => $error
            ]);

            if ($response->status() === 429) {
                throw new \Exception('AI service rate limit exceeded. Please try again later.');
            } elseif ($response->status() === 401 || $response->status() === 403) {
                throw new \Exception('AI service authentication failed. Please check your API key.');
            } else {
                throw new \Exception('AI service is temporarily unavailable.');
            }
        }

        $data = $response->json();
        $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (empty($text)) {
            throw new \Exception('AI service returned an empty response');
        }

        return [
            'text' => $text,
            'usage' => [
                'prompt_tokens' => $data['usageMetadata']['promptTokenCount'] ?? 0,
                'completion_tokens' => $data['usageMetadata']['candidatesTokenCount'] ?? 0,
                'total_tokens' => $data['usageMetadata']['totalTokenCount'] ?? 0,
            ]
        ];
    }

    /**
     * Enhance multiple bullet points in batch
     */
    public function enhanceBulletPoints(array $bulletPoints, string $userId): array
    {
        $results = [];

        foreach ($bulletPoints as $index => $bulletPoint) {
            try {
                $results[] = $this->enhanceBulletPoint($bulletPoint, $userId);
            } catch (\Exception $e) {
                $results[] = [
                    'success' => false,
                    'original' => $bulletPoint,
                    'error' => $e->getMessage()
                ];
            }
        }

        return $results;
    }

    /**
     * Check if user has exceeded rate limit
     */
    private function checkRateLimit(string $userId): void
    {
        $cacheKey = "ai_enhancement_rate_limit_{$userId}";
        $configKey = $this->provider === 'groq' ? 'services.groq.rate_limit' : 'services.gemini.rate_limit';
        $maxRequests = config($configKey, 50);

        $requestCount = Cache::get($cacheKey, 0);

        if ($requestCount >= $maxRequests) {
            throw new \Exception("Rate limit exceeded. You can make {$maxRequests} AI enhancement requests per hour. Please try again later.");
        }
    }

    /**
     * Increment rate limit counter
     */
    private function incrementRateLimit(string $userId): void
    {
        $cacheKey = "ai_enhancement_rate_limit_{$userId}";
        $windowInMinutes = 60;

        $requestCount = Cache::get($cacheKey, 0);
        Cache::put($cacheKey, $requestCount + 1, now()->addMinutes($windowInMinutes));
    }

    /**
     * Get remaining requests for user
     */
    public function getRemainingRequests(string $userId): array
    {
        $cacheKey = "ai_enhancement_rate_limit_{$userId}";
        $configKey = $this->provider === 'groq' ? 'services.groq.rate_limit' : 'services.gemini.rate_limit';
        $maxRequests = config($configKey, 50);
        $requestCount = Cache::get($cacheKey, 0);

        return [
            'provider' => $this->provider,
            'max_requests' => $maxRequests,
            'used_requests' => $requestCount,
            'remaining_requests' => max(0, $maxRequests - $requestCount),
        ];
    }
}
