<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $resume->title }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: '{{ $customization->font_family ?? "DejaVu Sans" }}', Arial, sans-serif;
            font-size: {{ $customization->font_size ?? 10 }}pt;
            color: {{ $customization->text_color ?? '#2D3748' }};
            line-height: {{ $customization->line_height ?? 1.5 }};
        }
        .container {
            padding: 0;
        }
        /* Creative Header with Solid Background */
        .header {
            background-color: {{ $customization->primary_color ?? '#FF1B6B' }};
            color: white;
            padding: {{ $customization->page_padding ?? 25 }}px {{ ($customization->page_padding ?? 25) + 10 }}px;
            border-bottom: {{ $customization->border_width ?? 5 }}px solid {{ $customization->secondary_color ?? '#FF6B1B' }};
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
            border-radius: {{ $customization->border_radius ?? 50 }}%;
            border: {{ $customization->border_width ?? 3 }}px solid white;
            object-fit: cover;
        }
        .header-content {
            display: table-cell;
            vertical-align: middle;
        }
        .name {
            font-size: 24pt;
            font-weight: bold;
            margin-bottom: 5px;
            letter-spacing: 0.5px;
            color: white;
        }
        .tagline {
            font-size: 10pt;
            margin-bottom: 10px;
            font-weight: 300;
            color: white;
        }
        .contact-info {
            font-size: 9pt;
            color: white;
        }
        .contact-item {
            display: inline-block;
            margin-right: 12px;
            background-color: rgba(255,255,255,0.25);
            padding: 3px 10px;
            border-radius: {{ $customization->border_radius ?? 12 }}px;
        }
        /* Content with Creative Accents */
        .content {
            padding: {{ $customization->section_spacing ?? 28 }}px {{ ($customization->page_padding ?? 25) + 10 }}px;
            background-color: {{ $customization->background_color ?? '#FFFFFF' }};
        }
        /* Sections with Colorful Accents */
        .section {
            margin-bottom: {{ $customization->section_spacing ?? 20 }}px;
        }
        .section-title {
            font-size: 14pt;
            font-weight: 700;
            color: {{ $customization->primary_color ?? '#FF1B6B' }};
            margin-bottom: {{ $customization->item_spacing ?? 12 }}px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            padding-bottom: 6px;
            border-bottom: {{ $customization->border_width ?? 3 }}px solid {{ $customization->secondary_color ?? '#FF6B1B' }};
        }
        .summary {
            font-size: 10pt;
            line-height: 1.6;
            text-align: justify;
            color: {{ $customization->text_color ?? '#4A5568' }};
            background-color: {{ $customization->accent_color ?? '#FFF9E6' }}20;
            padding: {{ $customization->item_spacing ?? 12 }}px;
            border-radius: {{ $customization->border_radius ?? 8 }}px;
            border-left: {{ $customization->border_width ?? 4 }}px solid {{ $customization->secondary_color ?? '#FF6B1B' }};
        }
        /* Creative Experience Items */
        .experience-item, .education-item {
            margin-bottom: {{ $customization->item_spacing ?? 16 }}px;
            padding: {{ $customization->item_spacing ?? 12 }}px;
            background-color: {{ $customization->primary_color ?? '#FF1B6B' }}08;
            border-radius: {{ $customization->border_radius ?? 8 }}px;
            border-left: {{ $customization->border_width ?? 4 }}px solid {{ $customization->primary_color ?? '#FF1B6B' }};
            page-break-inside: avoid;
        }
        .education-item {
            border-left-color: {{ $customization->secondary_color ?? '#FFAF1B' }};
        }
        .job-title, .degree {
            font-size: 11pt;
            font-weight: 700;
            color: {{ $customization->text_color ?? '#1A202C' }};
            margin-bottom: 3px;
        }
        .company, .institution {
            font-size: 10pt;
            color: {{ $customization->secondary_color ?? '#FF6B1B' }};
            font-weight: 600;
            margin-bottom: 4px;
        }
        .date-range {
            font-size: 8pt;
            color: {{ $customization->text_color ?? '#718096' }};
            background-color: {{ $customization->accent_color ?? '#FFF4E5' }}40;
            padding: 2px 10px;
            border-radius: {{ $customization->border_radius ?? 10 }}px;
            display: inline-block;
            margin-bottom: 6px;
            font-weight: 600;
        }
        .description {
            font-size: 9pt;
            line-height: 1.5;
            color: {{ $customization->text_color ?? '#4A5568' }};
            margin-top: 6px;
        }
        /* Creative Skill Badges */
        .skills-container {
            display: block;
        }
        .skill-item {
            display: inline-block;
            background-color: {{ $customization->primary_color ?? '#FF1B6B' }};
            color: white;
            padding: 6px 14px;
            margin: 4px 6px 4px 0;
            border-radius: {{ $customization->border_radius ?? 15 }}px;
            font-size: 9pt;
            font-weight: 600;
        }
        .skill-level-badge {
            background-color: rgba(255,255,255,0.35);
            padding: 2px 6px;
            border-radius: {{ $customization->border_radius ?? 8 }}px;
            margin-left: 5px;
            font-size: 7pt;
            font-weight: 700;
            text-transform: uppercase;
        }
        /* Creative Footer */
        .footer {
            margin-top: {{ $customization->section_spacing ?? 25 }}px;
            padding: 12px {{ ($customization->page_padding ?? 25) + 10 }}px;
            background-color: {{ $customization->accent_color ?? '#FFF9E6' }}30;
            text-align: center;
            font-size: 8pt;
            color: {{ $customization->text_color ?? '#A0AEC0' }};
            font-weight: 600;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Creative Header -->
        <div class="header">
            @if(($customization->show_photo ?? true) && !empty($resume->personal_info['photo']))
                <div class="header-photo">
                    <img src="{{ $resume->personal_info['photo'] }}" alt="Profile Photo" class="profile-photo">
                </div>
            @endif
            <div class="header-content">
                <div class="name">{{ $resume->personal_info['full_name'] ?? 'Your Name' }}</div>
                <div class="tagline">Creative Professional</div>
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
            <!-- About Me -->
            @if(($customization->show_summary ?? true) && !empty($resume->personal_info['summary']))
                <div class="section">
                    <div class="section-title">About Me</div>
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
                                {{ \Carbon\Carbon::parse($experience->start_date)->format('M Y') }} →
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
                                {{ \Carbon\Carbon::parse($education->start_date)->format('M Y') }} →
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
                    <div class="section-title">Skills & Talents</div>
                    <div class="skills-container">
                        @foreach($resume->skills as $skill)
                            <div class="skill-item">
                                {{ $skill->name }}
                                <span class="skill-level-badge">{{ ucfirst($skill->proficiency_level) }}</span>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>

        <!-- Footer -->
        <div class="footer">
            Created with Creativity & Passion
        </div>
    </div>
</body>
</html>
