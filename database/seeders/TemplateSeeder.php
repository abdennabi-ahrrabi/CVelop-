<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            [
                'name' => 'Modern Professional',
                'slug' => 'modern',
                'description' => 'A clean, modern design with bold headers and contemporary styling. Perfect for tech and creative professionals.',
                'category' => 'professional',
                'colors' => [
                    'primary' => '#4F46E5',
                    'secondary' => '#9333EA',
                    'accent' => '#EC4899',
                ],
                'is_premium' => false,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Classic Professional',
                'slug' => 'classic',
                'description' => 'A traditional, elegant design with timeless appeal. Ideal for corporate and traditional industries.',
                'category' => 'professional',
                'colors' => [
                    'primary' => '#1F2937',
                    'secondary' => '#4B5563',
                    'accent' => '#3B82F6',
                ],
                'is_premium' => false,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Creative Bold',
                'slug' => 'creative',
                'description' => 'A vibrant, eye-catching design for creative professionals. Stand out with unique styling and colors.',
                'category' => 'creative',
                'colors' => [
                    'primary' => '#EC4899',
                    'secondary' => '#8B5CF6',
                    'accent' => '#F59E0B',
                ],
                'is_premium' => false,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Minimal Clean',
                'slug' => 'minimal',
                'description' => 'A minimalist design focusing on content and readability. Perfect for any industry.',
                'category' => 'minimal',
                'colors' => [
                    'primary' => '#000000',
                    'secondary' => '#6B7280',
                    'accent' => '#059669',
                ],
                'is_premium' => false,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Executive Premium',
                'slug' => 'executive',
                'description' => 'A sophisticated, premium design for senior professionals and executives. Commands attention and respect.',
                'category' => 'professional',
                'colors' => [
                    'primary' => '#0F172A',
                    'secondary' => '#334155',
                    'accent' => '#0891B2',
                ],
                'is_premium' => true,
                'is_active' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($templates as $template) {
            Template::create($template);
        }
    }
}
