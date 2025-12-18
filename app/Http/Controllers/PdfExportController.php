<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use App\Models\Template;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PdfExportController extends Controller
{
    /**
     * Get default customization values from config
     */
    private function getDefaultCustomization(): object
    {
        $defaults = config('cv-builder.defaults');

        return (object) [
            'primary_color' => $defaults['colors']['primary'],
            'secondary_color' => $defaults['colors']['secondary'],
            'accent_color' => $defaults['colors']['accent'],
            'text_color' => $defaults['colors']['text'],
            'background_color' => $defaults['colors']['background'],
            'sidebar_bg_color' => $defaults['colors']['sidebar_bg'],
            'font_family' => $defaults['typography']['font_family'],
            'font_size' => $defaults['typography']['font_size'],
            'line_height' => $defaults['typography']['line_height'],
            'page_padding' => $defaults['spacing']['page_padding'],
            'section_spacing' => $defaults['spacing']['section_spacing'],
            'item_spacing' => $defaults['spacing']['item_spacing'],
            'layout_type' => $defaults['layout']['layout_type'],
            'sidebar_width' => $defaults['layout']['sidebar_width'],
            'show_photo' => $defaults['visibility']['show_photo'],
            'show_summary' => $defaults['visibility']['show_summary'],
            'show_skills' => $defaults['visibility']['show_skills'],
            'show_experience' => $defaults['visibility']['show_experience'],
            'show_education' => $defaults['visibility']['show_education'],
            'show_contact' => $defaults['visibility']['show_contact'],
            'border_radius' => $defaults['borders']['border_radius'],
            'border_width' => $defaults['borders']['border_width'],
        ];
    }

    public function download(Resume $resume)
    {
        // Ensure user owns the resume
        if ($resume->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // Load all relationships including customization
        $resume->load(['workExperiences', 'educations', 'skills', 'template', 'customization']);

        // Use default template if none selected
        $templateSlug = $resume->template?->slug ?? 'modern';

        // Get customization or use defaults
        $customization = $resume->customization ?? $this->getDefaultCustomization();

        // Generate PDF with the selected template
        $pdf = Pdf::loadView("pdf.templates.{$templateSlug}", [
            'resume' => $resume,
            'customization' => $customization,
        ])->setPaper('a4');

        // Download with resume title as filename
        $filename = str_replace(' ', '_', $resume->title) . '_CV.pdf';

        return $pdf->download($filename);
    }

    public function preview(Resume $resume)
    {
        // Ensure user owns the resume
        if ($resume->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // Load all relationships including customization
        $resume->load(['workExperiences', 'educations', 'skills', 'template', 'customization']);

        // Use default template if none selected
        $templateSlug = $resume->template?->slug ?? 'modern';

        // Get customization or use defaults
        $customization = $resume->customization ?? $this->getDefaultCustomization();

        // Generate PDF and stream it
        $pdf = Pdf::loadView("pdf.templates.{$templateSlug}", [
            'resume' => $resume,
            'customization' => $customization,
        ])->setPaper('a4');

        return $pdf->stream();
    }

    public function templatePreview($templateSlug)
    {
        // Find the template
        $template = Template::where('slug', $templateSlug)->firstOrFail();

        // Default customization for preview
        $customization = $this->getDefaultCustomization();

        // Create a sample resume object with demo data
        $sampleResume = (object) [
            'title' => 'Sample Professional Resume',
            'personal_info' => [
                'full_name' => 'John Anderson',
                'email' => 'john.anderson@email.com',
                'phone' => '+1 (555) 123-4567',
                'address' => 'New York, NY',
                'summary' => 'Results-driven professional with 8+ years of experience in software development and project management. Proven track record of delivering high-quality solutions that drive business growth and improve operational efficiency. Strong technical expertise combined with excellent leadership and communication skills.',
            ],
            'template' => $template,
            'workExperiences' => collect([
                (object) [
                    'position' => 'Senior Software Engineer',
                    'company' => 'Tech Innovations Inc.',
                    'location' => 'San Francisco, CA',
                    'start_date' => '2020-03-01',
                    'end_date' => null,
                    'is_current' => true,
                    'description' => 'Lead development of cloud-based enterprise solutions serving 50,000+ users. Mentor junior developers and drive technical excellence across the team. Implemented CI/CD pipelines reducing deployment time by 60%.',
                ],
                (object) [
                    'position' => 'Software Engineer',
                    'company' => 'Digital Solutions LLC',
                    'location' => 'Austin, TX',
                    'start_date' => '2017-06-01',
                    'end_date' => '2020-02-28',
                    'is_current' => false,
                    'description' => 'Developed and maintained web applications using modern frameworks. Collaborated with cross-functional teams to deliver features on time. Improved application performance by 40% through optimization.',
                ],
                (object) [
                    'position' => 'Junior Developer',
                    'company' => 'StartUp Ventures',
                    'location' => 'Boston, MA',
                    'start_date' => '2016-01-01',
                    'end_date' => '2017-05-31',
                    'is_current' => false,
                    'description' => 'Built responsive user interfaces and implemented RESTful APIs. Participated in agile development processes and code reviews. Gained hands-on experience with full-stack development.',
                ],
            ]),
            'educations' => collect([
                (object) [
                    'degree' => 'Master of Science',
                    'field' => 'Computer Science',
                    'institution' => 'Massachusetts Institute of Technology',
                    'location' => 'Cambridge, MA',
                    'start_date' => '2013-09-01',
                    'end_date' => '2015-12-01',
                    'is_current' => false,
                    'description' => 'Specialized in Artificial Intelligence and Machine Learning. GPA: 3.9/4.0. Published research on neural networks.',
                ],
                (object) [
                    'degree' => 'Bachelor of Science',
                    'field' => 'Software Engineering',
                    'institution' => 'University of California, Berkeley',
                    'location' => 'Berkeley, CA',
                    'start_date' => '2009-09-01',
                    'end_date' => '2013-05-01',
                    'is_current' => false,
                    'description' => 'Dean\'s List all semesters. President of Computer Science Club. Graduated with Honors.',
                ],
            ]),
            'skills' => collect([
                (object) [
                    'name' => 'JavaScript/TypeScript',
                    'proficiency_level' => 'expert',
                ],
                (object) [
                    'name' => 'React & Vue.js',
                    'proficiency_level' => 'advanced',
                ],
                (object) [
                    'name' => 'Node.js & Express',
                    'proficiency_level' => 'advanced',
                ],
                (object) [
                    'name' => 'Python & Django',
                    'proficiency_level' => 'intermediate',
                ],
                (object) [
                    'name' => 'Cloud Services (AWS/Azure)',
                    'proficiency_level' => 'advanced',
                ],
                (object) [
                    'name' => 'Database Design (SQL/NoSQL)',
                    'proficiency_level' => 'advanced',
                ],
                (object) [
                    'name' => 'Docker & Kubernetes',
                    'proficiency_level' => 'intermediate',
                ],
                (object) [
                    'name' => 'Agile/Scrum Methodologies',
                    'proficiency_level' => 'expert',
                ],
            ]),
        ];

        // Generate PDF with the selected template and sample data
        $pdf = Pdf::loadView("pdf.templates.{$templateSlug}", [
            'resume' => $sampleResume,
            'customization' => $customization,
        ])->setPaper('a4');

        return $pdf->stream('Sample_Resume_' . $template->name . '.pdf');
    }
}
