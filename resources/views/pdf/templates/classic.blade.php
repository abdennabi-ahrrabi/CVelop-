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
            color: {{ $customization->text_color ?? '#1F2937' }};
            line-height: {{ $customization->line_height ?? 1.5 }};
        }
        .container {
            padding: {{ $customization->page_padding ?? 35 }}px {{ ($customization->page_padding ?? 35) + 5 }}px;
            border: {{ $customization->border_width ?? 6 }}px solid {{ $customization->primary_color ?? '#1F2937' }};
            margin: 15px;
        }
        /* Classic Header - Centered */
        .header {
            text-align: center;
            padding-bottom: 18px;
            margin-bottom: {{ $customization->section_spacing ?? 25 }}px;
            border-bottom: {{ $customization->border_width ?? 3 }}px double {{ $customization->primary_color ?? '#1F2937' }};
        }
        .profile-photo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: {{ $customization->border_width ?? 4 }}px solid {{ $customization->primary_color ?? '#1F2937' }};
            margin: 0 auto 15px;
            object-fit: cover;
        }
        .name {
            font-size: 24pt;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #000;
        }
        .name-underline {
            width: 150px;
            height: {{ $customization->border_width ?? 2 }}px;
            background-color: {{ $customization->primary_color ?? '#1F2937' }};
            margin: 8px auto;
        }
        .contact-info {
            font-size: 9pt;
            color: #4B5563;
            line-height: 1.6;
        }
        .contact-item {
            display: block;
            margin: 3px 0;
        }
        .contact-divider {
            margin: 0 8px;
        }
        /* Sections */
        .section {
            margin-bottom: {{ $customization->section_spacing ?? 22 }}px;
        }
        .section-title {
            font-size: 13pt;
            font-weight: bold;
            color: {{ $customization->primary_color ?? '#1F2937' }};
            border-bottom: {{ $customization->border_width ?? 2 }}px solid {{ $customization->primary_color ?? '#1F2937' }};
            padding-bottom: 5px;
            margin-bottom: {{ $customization->item_spacing ?? 12 }}px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            text-align: center;
        }
        .summary {
            font-size: 10pt;
            line-height: 1.6;
            text-align: justify;
            color: {{ $customization->text_color ?? '#374151' }};
            font-style: italic;
            padding: 0 15px;
        }
        /* Experience & Education */
        .experience-item, .education-item {
            margin-bottom: {{ $customization->item_spacing ?? 16 }}px;
            page-break-inside: avoid;
        }
        .item-header {
            margin-bottom: 8px;
            position: relative;
            padding-bottom: 6px;
            border-bottom: 1px solid #D1D5DB;
        }
        .job-title, .degree {
            font-size: 11pt;
            font-weight: bold;
            color: {{ $customization->secondary_color ?? '#1F2937' }};
            margin-bottom: 2px;
        }
        .company, .institution {
            font-size: 10pt;
            color: {{ $customization->primary_color ?? '#4B5563' }};
            font-style: italic;
            font-weight: 600;
            margin-bottom: 2px;
        }
        .date-range {
            font-size: 9pt;
            color: #6B7280;
            position: absolute;
            right: 0;
            top: 0;
        }
        .description {
            font-size: 9pt;
            line-height: 1.6;
            color: #4B5563;
            text-align: justify;
            margin-top: 6px;
        }
        /* Skills - Two Column List */
        .skills-list {
            columns: 2;
            column-gap: 30px;
        }
        .skill-item {
            margin-bottom: 8px;
            break-inside: avoid;
            position: relative;
            padding-left: 15px;
        }
        .skill-item::before {
            content: '▪';
            position: absolute;
            left: 0;
            color: {{ $customization->primary_color ?? '#1F2937' }};
            font-size: 12pt;
        }
        .skill-name {
            font-weight: 600;
            color: {{ $customization->secondary_color ?? '#1F2937' }};
            font-size: 9pt;
        }
        .skill-level {
            font-size: 8pt;
            color: #6B7280;
            font-style: italic;
            margin-left: 4px;
        }
        /* Footer */
        .footer {
            margin-top: {{ $customization->section_spacing ?? 30 }}px;
            padding-top: 15px;
            border-top: {{ $customization->border_width ?? 3 }}px double {{ $customization->primary_color ?? '#1F2937' }};
            text-align: center;
            font-size: 8pt;
            color: #6B7280;
            font-style: italic;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            @if(($customization->show_photo ?? true) && !empty($resume->personal_info['photo']))
                <img src="{{ $resume->personal_info['photo'] }}" alt="Profile Photo" class="profile-photo">
            @endif
            <div class="name">{{ $resume->personal_info['full_name'] ?? 'Your Name' }}</div>
            <div class="name-underline"></div>
            @if($customization->show_contact ?? true)
                <div class="contact-info">
                    @if(!empty($resume->personal_info['email']))
                        <span class="contact-item">{{ $resume->personal_info['email'] }}</span>
                    @endif
                    @if(!empty($resume->personal_info['phone']))
                        @if(!empty($resume->personal_info['email']))<span class="contact-divider">•</span>@endif
                        <span class="contact-item">{{ $resume->personal_info['phone'] }}</span>
                    @endif
                    @if(!empty($resume->personal_info['address']))
                        <span class="contact-item">{{ $resume->personal_info['address'] }}</span>
                    @endif
                </div>
            @endif
        </div>

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
                <div class="section-title">Professional Experience</div>
                @foreach($resume->workExperiences as $experience)
                    <div class="experience-item">
                        <div class="item-header">
                            <div class="date-range">
                                {{ \Carbon\Carbon::parse($experience->start_date)->format('F Y') }} –
                                {{ $experience->is_current ? 'Present' : \Carbon\Carbon::parse($experience->end_date)->format('F Y') }}
                            </div>
                            <div class="job-title">{{ $experience->position }}</div>
                            <div class="company">{{ $experience->company }}</div>
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
                        <div class="item-header">
                            <div class="date-range">
                                {{ \Carbon\Carbon::parse($education->start_date)->format('F Y') }} –
                                {{ $education->is_current ? 'Present' : \Carbon\Carbon::parse($education->end_date)->format('F Y') }}
                            </div>
                            <div class="degree">{{ $education->degree }}@if($education->field), {{ $education->field }}@endif</div>
                            <div class="institution">{{ $education->institution }}</div>
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
                <div class="skills-list">
                    @foreach($resume->skills as $skill)
                        <div class="skill-item">
                            <span class="skill-name">{{ $skill->name }}</span>
                            <span class="skill-level">— {{ ucfirst($skill->proficiency_level) }}</span>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif

        <!-- Footer -->
        <div class="footer">
            Curriculum Vitae
        </div>
    </div>
</body>
</html>
