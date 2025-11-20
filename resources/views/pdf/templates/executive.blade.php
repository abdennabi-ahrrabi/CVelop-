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
            font-family: '{{ $customization->font_family ?? "DejaVu Serif" }}', Georgia, serif;
            font-size: {{ $customization->font_size ?? 10 }}pt;
            color: {{ $customization->text_color ?? '#2C3E50' }};
            line-height: {{ $customization->line_height ?? 1.5 }};
        }
        /* Two Column Layout with Floats */
        .page {
            width: 100%;
            position: relative;
            display: table;
            table-layout: fixed;
        }
        .sidebar {
            width: {{ $customization->sidebar_width ?? 35 }}%;
            display: table-cell;
            vertical-align: top;
            background-color: {{ $customization->sidebar_bg_color ?? $customization->accent_color ?? '#1A2332' }};
            color: white;
            padding: {{ $customization->page_padding ?? 30 }}px {{ ($customization->page_padding ?? 30) - 5 }}px;
            border-right: {{ $customization->border_width ?? 4 }}px solid {{ $customization->primary_color ?? '#3498DB' }};
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        .main-content {
            width: {{ 100 - ($customization->sidebar_width ?? 35) }}%;
            display: table-cell;
            vertical-align: top;
            padding: {{ $customization->page_padding ?? 30 }}px {{ ($customization->page_padding ?? 30) + 5 }}px;
            background-color: {{ $customization->background_color ?? '#FFFFFF' }};
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        /* Sidebar Header */
        .sidebar-header {
            margin-bottom: {{ $customization->section_spacing ?? 25 }}px;
            padding-bottom: {{ $customization->item_spacing ?? 20 }}px;
            border-bottom: {{ $customization->border_width ?? 2 }}px solid {{ $customization->primary_color ?? '#3498DB' }}80;
            text-align: center;
        }
        .profile-photo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: {{ $customization->border_width ?? 4 }}px solid {{ $customization->primary_color ?? '#3498DB' }};
            margin: 0 auto {{ $customization->item_spacing ?? 15 }}px;
            object-fit: cover;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        .name {
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 8px;
            color: #FFFFFF;
            letter-spacing: 0.5px;
            line-height: 1.2;
        }
        .tagline {
            font-size: 9pt;
            color: {{ $customization->primary_color ?? '#3498DB' }};
            font-style: italic;
            font-weight: 600;
        }
        /* Sidebar Sections */
        .sidebar-section {
            margin-bottom: {{ $customization->section_spacing ?? 25 }}px;
            background-color: rgba(255,255,255,0.03);
            padding: {{ $customization->item_spacing ?? 15 }}px;
            border-radius: {{ $customization->border_radius ?? 4 }}px;
        }
        .sidebar-title {
            font-size: 10pt;
            font-weight: bold;
            color: {{ $customization->primary_color ?? '#3498DB' }};
            text-transform: uppercase;
            letter-spacing: 1.8px;
            margin-bottom: {{ ($customization->item_spacing ?? 12) }}px;
            padding-bottom: 8px;
            border-bottom: {{ $customization->border_width ?? 2 }}px solid {{ $customization->primary_color ?? '#3498DB' }}50;
        }
        .contact-item {
            font-size: 9pt;
            margin-bottom: 8px;
            color: #ECF0F1;
            line-height: 1.6;
            padding-left: 5px;
        }
        .skill-item-sidebar {
            margin-bottom: 12px;
            background-color: rgba(255,255,255,0.05);
            padding: 8px;
            border-radius: 3px;
        }
        .skill-name-sidebar {
            font-size: 9pt;
            color: #FFFFFF;
            font-weight: 600;
            margin-bottom: 5px;
        }
        .skill-bar-container {
            background-color: rgba(255,255,255,0.15);
            height: 6px;
            border-radius: {{ $customization->border_radius ?? 3 }}px;
            overflow: hidden;
        }
        .skill-bar-fill {
            background-color: {{ $customization->primary_color ?? '#3498DB' }};
            height: 100%;
            border-radius: {{ $customization->border_radius ?? 3 }}px;
        }
        .skill-bar-fill.beginner { width: 25%; }
        .skill-bar-fill.intermediate { width: 50%; }
        .skill-bar-fill.advanced { width: 75%; }
        .skill-bar-fill.expert { width: 100%; }
        /* Main Content */
        .section {
            margin-bottom: {{ $customization->section_spacing ?? 25 }}px;
        }
        .section-title {
            font-size: 14pt;
            font-weight: bold;
            color: {{ $customization->secondary_color ?? '#1A2332' }};
            margin-bottom: {{ $customization->item_spacing ?? 15 }}px;
            padding-bottom: 8px;
            padding-left: 12px;
            border-left: 5px solid {{ $customization->primary_color ?? '#3498DB' }};
            border-bottom: {{ $customization->border_width ?? 2 }}px solid {{ $customization->primary_color ?? '#3498DB' }}20;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .summary {
            font-size: 10pt;
            line-height: 1.7;
            text-align: justify;
            color: {{ $customization->text_color ?? '#2C3E50' }};
            font-style: italic;
            background-color: {{ $customization->primary_color ?? '#3498DB' }}08;
            padding: {{ $customization->item_spacing ?? 15 }}px;
            border-left: {{ $customization->border_width ?? 4 }}px solid {{ $customization->primary_color ?? '#3498DB' }};
            border-radius: 0 {{ $customization->border_radius ?? 4 }}px {{ $customization->border_radius ?? 4 }}px 0;
        }
        /* Experience & Education */
        .experience-item, .education-item {
            margin-bottom: {{ $customization->item_spacing ?? 18 }}px;
            padding: {{ ($customization->item_spacing ?? 12) }}px;
            background-color: {{ $customization->primary_color ?? '#3498DB' }}05;
            border-left: {{ $customization->border_width ?? 3 }}px solid {{ $customization->primary_color ?? '#3498DB' }};
            border-radius: 0 {{ $customization->border_radius ?? 4 }}px {{ $customization->border_radius ?? 4 }}px 0;
            page-break-inside: avoid;
        }
        .item-header {
            margin-bottom: 8px;
        }
        .job-title, .degree {
            font-size: 12pt;
            font-weight: bold;
            color: {{ $customization->secondary_color ?? '#1A2332' }};
            margin-bottom: 3px;
        }
        .company, .institution {
            font-size: 10pt;
            color: {{ $customization->primary_color ?? '#3498DB' }};
            font-weight: 600;
            margin-bottom: 4px;
        }
        .date-range {
            font-size: 9pt;
            color: #7F8C8D;
            font-style: italic;
            margin-bottom: 8px;
            background-color: {{ $customization->primary_color ?? '#3498DB' }}15;
            padding: 2px 8px;
            border-radius: {{ $customization->border_radius ?? 3 }}px;
            display: inline-block;
        }
        .description {
            font-size: 9pt;
            line-height: 1.7;
            color: #34495E;
            text-align: justify;
        }
        /* Footer */
        .footer {
            margin-top: {{ $customization->section_spacing ?? 30 }}px;
            padding: 12px 20px;
            background-color: {{ $customization->primary_color ?? '#3498DB' }}08;
            border-top: {{ $customization->border_width ?? 3 }}px solid {{ $customization->primary_color ?? '#3498DB' }};
            text-align: center;
            font-size: 8pt;
            color: #7F8C8D;
            font-weight: 600;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="page">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="sidebar-header">
                @if(($customization->show_photo ?? true) && !empty($resume->personal_info['photo']))
                    <img src="{{ $resume->personal_info['photo'] }}" alt="Profile Photo" class="profile-photo">
                @endif
                <div class="name">{{ $resume->personal_info['full_name'] ?? 'Your Name' }}</div>
                <div class="tagline">Executive Professional</div>
            </div>

            <!-- Contact Information -->
            @if($customization->show_contact ?? true)
                <div class="sidebar-section">
                    <div class="sidebar-title">Contact</div>
                    @if(!empty($resume->personal_info['email']))
                        <div class="contact-item">{{ $resume->personal_info['email'] }}</div>
                    @endif
                    @if(!empty($resume->personal_info['phone']))
                        <div class="contact-item">{{ $resume->personal_info['phone'] }}</div>
                    @endif
                    @if(!empty($resume->personal_info['address']))
                        <div class="contact-item">{{ $resume->personal_info['address'] }}</div>
                    @endif
                </div>
            @endif

            <!-- Skills in Sidebar -->
            @if(($customization->show_skills ?? true) && $resume->skills->count() > 0)
                <div class="sidebar-section">
                    <div class="sidebar-title">Expertise</div>
                    @foreach($resume->skills as $skill)
                        <div class="skill-item-sidebar">
                            <div class="skill-name-sidebar">{{ $skill->name }}</div>
                            <div class="skill-bar-container">
                                <div class="skill-bar-fill {{ $skill->proficiency_level }}"></div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <!-- Professional Summary -->
            @if(($customization->show_summary ?? true) && !empty($resume->personal_info['summary']))
                <div class="section">
                    <div class="section-title">Executive Summary</div>
                    <div class="summary">{{ $resume->personal_info['summary'] }}</div>
                </div>
            @endif

            <!-- Work Experience -->
            @if(($customization->show_experience ?? true) && $resume->workExperiences->count() > 0)
                <div class="section">
                    <div class="section-title">Professional Experience</div>
                    @foreach($resume->workExperiences as $experience)
                        <div class="experience-item">
                            <div class="item-header">
                                <div class="job-title">{{ $experience->position }}</div>
                                <div class="company">{{ $experience->company }}</div>
                                <div class="date-range">
                                    {{ \Carbon\Carbon::parse($experience->start_date)->format('F Y') }} -
                                    {{ $experience->is_current ? 'Present' : \Carbon\Carbon::parse($experience->end_date)->format('F Y') }}
                                </div>
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
                    <div class="section-title">Education & Qualifications</div>
                    @foreach($resume->educations as $education)
                        <div class="education-item">
                            <div class="item-header">
                                <div class="degree">{{ $education->degree }}@if($education->field), {{ $education->field }}@endif</div>
                                <div class="institution">{{ $education->institution }}</div>
                                <div class="date-range">
                                    {{ \Carbon\Carbon::parse($education->start_date)->format('F Y') }} -
                                    {{ $education->is_current ? 'Present' : \Carbon\Carbon::parse($education->end_date)->format('F Y') }}
                                </div>
                            </div>
                            @if($education->description)
                                <div class="description">{{ $education->description }}</div>
                            @endif
                        </div>
                    @endforeach
                </div>
            @endif

            <!-- Footer -->
            <div class="footer">
                Executive Curriculum Vitae
            </div>
        </div>
    </div>
</body>
</html>
