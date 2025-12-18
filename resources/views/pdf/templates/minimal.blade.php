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
            font-family: '{{ $customization->font_family ?? "DejaVu Sans" }}', 'Helvetica', Arial, sans-serif;
            font-size: {{ $customization->font_size ?? 10 }}pt;
            color: {{ $customization->text_color ?? '#1a1a1a' }};
            line-height: {{ $customization->line_height ?? 1.5 }};
        }
        .container {
            padding: {{ $customization->page_padding ?? 40 }}px;
            max-width: 800px;
            background-color: {{ $customization->background_color ?? '#FFFFFF' }};
        }
        /* Header - Ultra Minimal */
        .header {
            margin-bottom: 35px;
            display: table;
            width: 100%;
        }
        .header-photo {
            display: table-cell;
            width: 70px;
            vertical-align: top;
            padding-right: 20px;
        }
        .profile-photo {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 1px solid #ccc;
            object-fit: cover;
        }
        .header-content {
            display: table-cell;
            vertical-align: top;
        }
        .name {
            font-size: 26pt;
            font-weight: 300;
            letter-spacing: -0.5px;
            color: #000;
            margin-bottom: 6px;
        }
        .contact-info {
            font-size: 9pt;
            color: #666;
            font-weight: 300;
        }
        .contact-item {
            display: inline-block;
            margin-right: 14px;
        }
        /* Sections */
        .section {
            margin-bottom: 28px;
        }
        .section-title {
            font-size: 10pt;
            font-weight: 600;
            color: #000;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 14px;
        }
        .summary {
            font-size: 10pt;
            line-height: 1.6;
            color: #333;
            font-weight: 300;
        }
        /* Experience & Education */
        .experience-item, .education-item {
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        .job-title, .degree {
            font-size: 11pt;
            font-weight: 600;
            color: #000;
            margin-bottom: 2px;
        }
        .company, .institution {
            font-size: 10pt;
            color: #666;
            font-weight: 400;
            margin-bottom: 2px;
        }
        .date-range {
            font-size: 9pt;
            color: #999;
            font-weight: 300;
            margin-bottom: 6px;
        }
        .description {
            font-size: 9pt;
            line-height: 1.6;
            color: #444;
            font-weight: 300;
        }
        /* Skills - Simple List */
        .skills-container {
            display: table;
            width: 100%;
        }
        .skill-item {
            display: table-row;
        }
        .skill-name {
            display: table-cell;
            font-size: 10pt;
            color: #333;
            font-weight: 400;
            padding: 5px 20px 5px 0;
            width: 50%;
        }
        .skill-level {
            display: table-cell;
            font-size: 9pt;
            color: #999;
            font-weight: 300;
            padding: 5px 0;
        }
        /* Footer */
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 8pt;
            color: #ccc;
            font-weight: 300;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            @if(!empty($resume->personal_info['photo']))
                <div class="header-photo">
                    <img src="{{ $resume->personal_info['photo'] }}" alt="Profile Photo" class="profile-photo">
                </div>
            @endif
            <div class="header-content">
                <div class="name">{{ $resume->personal_info['full_name'] ?? 'Your Name' }}</div>
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
            </div>
        </div>

        <!-- Professional Summary -->
        @if(!empty($resume->personal_info['summary']))
            <div class="section">
                <div class="section-title">About</div>
                <div class="summary">{{ $resume->personal_info['summary'] }}</div>
            </div>
        @endif

        <!-- Work Experience -->
        @if($resume->workExperiences->count() > 0)
            <div class="section">
                <div class="section-title">Experience</div>
                @foreach($resume->workExperiences as $experience)
                    <div class="experience-item">
                        <div class="job-title">{{ $experience->position }}</div>
                        <div class="company">{{ $experience->company }}</div>
                        <div class="date-range">
                            {{ \Carbon\Carbon::parse($experience->start_date)->format('F Y') }} —
                            {{ $experience->is_current ? 'Present' : \Carbon\Carbon::parse($experience->end_date)->format('F Y') }}
                        </div>
                        @if($experience->description)
                            <div class="description">{{ $experience->description }}</div>
                        @endif
                    </div>
                @endforeach
            </div>
        @endif

        <!-- Education -->
        @if($resume->educations->count() > 0)
            <div class="section">
                <div class="section-title">Education</div>
                @foreach($resume->educations as $education)
                    <div class="education-item">
                        <div class="degree">{{ $education->degree }}@if($education->field), {{ $education->field }}@endif</div>
                        <div class="institution">{{ $education->institution }}</div>
                        <div class="date-range">
                            {{ \Carbon\Carbon::parse($education->start_date)->format('F Y') }} —
                            {{ $education->is_current ? 'Present' : \Carbon\Carbon::parse($education->end_date)->format('F Y') }}
                        </div>
                        @if($education->description)
                            <div class="description">{{ $education->description }}</div>
                        @endif
                    </div>
                @endforeach
            </div>
        @endif

        <!-- Skills -->
        @if($resume->skills->count() > 0)
            <div class="section">
                <div class="section-title">Skills</div>
                <div class="skills-container">
                    @foreach($resume->skills as $skill)
                        <div class="skill-item">
                            <div class="skill-name">{{ $skill->name }}</div>
                            <div class="skill-level">{{ ucfirst($skill->proficiency_level) }}</div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif

        <!-- Footer -->
        <div class="footer">
            —
        </div>
    </div>
</body>
</html>
