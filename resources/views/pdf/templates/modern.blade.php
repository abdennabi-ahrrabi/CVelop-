<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $resume->title }}</title>
    <style>
        @page {
            margin: 0;
            padding: 0;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        body {
            font-family: '{{ $customization->font_family ?? "DejaVu Sans" }}', Arial, sans-serif;
            font-size: {{ $customization->font_size ?? 10 }}pt;
            color: {{ $customization->text_color ?? '#374151' }};
            line-height: {{ $customization->line_height ?? 1.5 }};
        }
        .container {
            padding: 0;
        }
        /* Modern Header with Solid Background */
        .header {
            background-color: {{ $customization->primary_color ?? '#4F46E5' }};
            padding: {{ $customization->page_padding ?? 25 }}px {{ ($customization->page_padding ?? 25) + 10 }}px;
            border-bottom: {{ $customization->border_width ?? 5 }}px solid {{ $customization->secondary_color ?? '#7C3AED' }};
            display: table;
            width: 100%;
        }
        .header-photo {
            display: table-cell;
            width: 90px;
            vertical-align: middle;
            padding-right: 20px;
        }
        .profile-photo {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: {{ $customization->border_width ?? 3 }}px solid white;
            object-fit: cover;
        }
        .header-content {
            display: table-cell;
            vertical-align: middle;
        }
        .name {
            font-size: 26pt;
            font-weight: bold;
            margin-bottom: 6px;
            letter-spacing: -0.5px;
            color: white;
        }
        .contact-info {
            font-size: 9pt;
            font-weight: 300;
            color: white;
        }
        .contact-item {
            display: inline-block;
            margin-right: 18px;
            color: white;
        }
        .contact-item::before {
            content: '• ';
            color: white;
        }
        .contact-item:first-child::before {
            content: '';
        }
        /* Content Area */
        .content {
            padding: {{ $customization->page_padding ?? 30 }}px {{ ($customization->page_padding ?? 30) + 5 }}px;
        }
        /* Sections */
        .section {
            margin-bottom: {{ $customization->section_spacing ?? 22 }}px;
        }
        .section-title {
            font-size: 14pt;
            font-weight: 700;
            color: {{ $customization->primary_color ?? '#4F46E5' }};
            border-bottom: {{ $customization->border_width ?? 2 }}px solid {{ $customization->primary_color ?? '#4F46E5' }}20;
            padding-bottom: 6px;
            margin-bottom: {{ $customization->item_spacing ?? 12 }}px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .summary {
            font-size: 10pt;
            line-height: 1.7;
            text-align: justify;
            color: {{ $customization->text_color ?? '#4B5563' }};
            background-color: {{ $customization->primary_color ?? '#4F46E5' }}08;
            padding: {{ $customization->item_spacing ?? 14 }}px;
            border-left: {{ $customization->border_width ?? 4 }}px solid {{ $customization->primary_color ?? '#4F46E5' }};
            border-radius: 0 {{ $customization->border_radius ?? 4 }}px {{ $customization->border_radius ?? 4 }}px 0;
        }
        /* Experience & Education Items */
        .experience-item, .education-item {
            margin-bottom: {{ $customization->item_spacing ?? 16 }}px;
            page-break-inside: avoid;
            padding-left: 18px;
            border-left: {{ $customization->border_width ?? 2 }}px solid {{ $customization->primary_color ?? '#4F46E5' }}20;
            position: relative;
        }
        .experience-item::before, .education-item::before {
            content: '';
            position: absolute;
            left: -5px;
            top: 5px;
            width: 8px;
            height: 8px;
            background: {{ $customization->primary_color ?? '#4F46E5' }};
            border-radius: 50%;
            border: {{ $customization->border_width ?? 2 }}px solid white;
        }
        .job-title, .degree {
            font-size: 12pt;
            font-weight: 700;
            color: {{ $customization->secondary_color ?? '#1F2937' }};
            margin-bottom: 2px;
        }
        .company, .institution {
            font-size: 10pt;
            color: {{ $customization->primary_color ?? '#6B7280' }};
            font-weight: 600;
            margin-bottom: 3px;
        }
        .date-range {
            font-size: 8pt;
            color: #9CA3AF;
            font-style: italic;
            margin-bottom: 6px;
            background-color: {{ $customization->primary_color ?? '#4F46E5' }}10;
            display: inline-block;
            padding: 2px 8px;
            border-radius: {{ $customization->border_radius ?? 8 }}px;
        }
        .description {
            font-size: 9pt;
            line-height: 1.6;
            color: #4B5563;
            text-align: justify;
        }
        /* Skills Grid with Progress Bars */
        .skills-grid {
            display: table;
            width: 100%;
            border-spacing: 0 4px;
        }
        .skill-item {
            display: table-row;
        }
        .skill-name {
            display: table-cell;
            font-weight: 600;
            color: #374151;
            padding: 6px 15px 6px 0;
            width: 40%;
            font-size: 9pt;
        }
        .skill-level {
            display: table-cell;
            padding: 6px 0;
            vertical-align: middle;
        }
        .skill-bar {
            background-color: {{ $customization->primary_color ?? '#4F46E5' }}15;
            height: 8px;
            border-radius: {{ $customization->border_radius ?? 4 }}px;
            overflow: hidden;
        }
        .skill-fill {
            background-color: {{ $customization->primary_color ?? '#4F46E5' }};
            height: 100%;
            border-radius: {{ $customization->border_radius ?? 4 }}px;
        }
        .skill-fill.beginner { width: 25%; }
        .skill-fill.intermediate { width: 50%; }
        .skill-fill.advanced { width: 75%; }
        .skill-fill.expert { width: 100%; }
        /* Footer */
        .footer {
            margin-top: 25px;
            padding: 12px 35px;
            background-color: #F9FAFB;
            border-top: 1px solid #E5E7EB;
            text-align: center;
            font-size: 8pt;
            color: #9CA3AF;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            @if(($customization->show_photo ?? true) && !empty($resume->personal_info['photo']))
                <div class="header-photo">
                    <img src="{{ $resume->personal_info['photo'] }}" alt="Profile Photo" class="profile-photo">
                </div>
            @endif
            <div class="header-content">
                <div class="name">{{ $resume->personal_info['full_name'] ?? 'Your Name' }}</div>
                @if($customization->show_contact ?? true)
                    <div class="contact-info">
                        @if(!empty($resume->personal_info['email']))
                            <span class="contact-item">{{ $resume->personal_info['email'] }}</span>
                        @endif
                        @if(!empty($resume->personal_info['phone']))
                            <span class="contact-item">{{ $resume->personal_info['phone'] }}</span>
                        @endif
                        @if(!empty($resume->personal_info['address']))
                            <span class="contact-item">{{ $resume->personal_info['address'] }}</span>
                        @endif
                    </div>
                @endif
            </div>
        </div>

        <div class="content">
            <!-- Professional Summary -->
            @if(($customization->show_summary ?? true) && !empty($resume->personal_info['summary']))
                <div class="section">
                    <div class="section-title">Professional Summary</div>
                    <div class="summary">{{ $resume->personal_info['summary'] }}</div>
                </div>
            @endif

            <!-- Work Experience -->
            @if(($customization->show_experience ?? true) && $resume->workExperiences->count() > 0)
                <div class="section">
                    <div class="section-title">Work Experience</div>
                    @foreach($resume->workExperiences as $experience)
                        <div class="experience-item">
                            <div class="job-title">{{ $experience->position }}</div>
                            <div class="company">{{ $experience->company }}</div>
                            <div class="date-range">
                                {{ \Carbon\Carbon::parse($experience->start_date)->format('M Y') }} -
                                {{ $experience->is_current ? 'Present' : \Carbon\Carbon::parse($experience->end_date)->format('M Y') }}
                            </div>
                            @if($experience->description)
                                <div class="description">{{ $experience->description }}</div>
                            @endif
                        </div>
                    @endforeach
                </div>
            @endif

            <!-- Education -->
            @if(($customization->show_education ?? true) && $resume->educations->count() > 0)
                <div class="section">
                    <div class="section-title">Education</div>
                    @foreach($resume->educations as $education)
                        <div class="education-item">
                            <div class="degree">{{ $education->degree }}@if($education->field), {{ $education->field }}@endif</div>
                            <div class="institution">{{ $education->institution }}</div>
                            <div class="date-range">
                                {{ \Carbon\Carbon::parse($education->start_date)->format('M Y') }} -
                                {{ $education->is_current ? 'Present' : \Carbon\Carbon::parse($education->end_date)->format('M Y') }}
                            </div>
                            @if($education->description)
                                <div class="description">{{ $education->description }}</div>
                            @endif
                        </div>
                    @endforeach
                </div>
            @endif

            <!-- Skills -->
            @if(($customization->show_skills ?? true) && $resume->skills->count() > 0)
                <div class="section">
                    <div class="section-title">Skills & Expertise</div>
                    <div class="skills-grid">
                        @foreach($resume->skills as $skill)
                            <div class="skill-item">
                                <div class="skill-name">{{ $skill->name }}</div>
                                <div class="skill-level">
                                    <div class="skill-bar">
                                        <div class="skill-fill {{ $skill->proficiency_level }}"></div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>

    </div>
</body>
</html>
