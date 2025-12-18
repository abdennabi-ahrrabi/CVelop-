<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $resume->title ?? 'Resume' }}</title>
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
        body {
            font-family: '{{ $customization->font_family ?? "DejaVu Sans" }}', Arial, sans-serif;
            font-size: {{ $customization->font_size ?? 10 }}pt;
            color: #2c3e50;
            line-height: {{ $customization->line_height ?? 1.5 }};
            margin: 0;
            padding: 0;
        }

        /* Sidebar - Elegant Dark Slate */
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 35%;
            height: 100%;
            background-color: #1e272e;
            color: #ffffff;
            padding: 0;
        }

        /* Sidebar Header */
        .sidebar-header {
            background-color: #151c22;
            padding: 35px 25px;
            text-align: center;
            border-bottom: 3px solid #3498db;
        }

        .profile-photo {
            width: 95px;
            height: 95px;
            border-radius: 50%;
            border: 3px solid #3498db;
            margin: 0 auto 15px;
            object-fit: cover;
            background-color: #2c3e50;
        }

        .name {
            font-size: 18pt;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: 0.5px;
            line-height: 1.3;
            margin-bottom: 10px;
        }

        .title-divider {
            width: 50px;
            height: 2px;
            background-color: #3498db;
            margin: 12px auto;
        }

        .tagline {
            font-size: 9pt;
            color: #74b9ff;
            font-weight: 500;
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }

        /* Sidebar Content */
        .sidebar-content {
            padding: 25px 22px;
        }

        .sidebar-section {
            margin-bottom: 28px;
        }

        .sidebar-title {
            font-size: 10pt;
            font-weight: bold;
            color: #74b9ff;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #3d5a6e;
        }

        .contact-item {
            margin-bottom: 14px;
        }

        .contact-label {
            display: block;
            font-size: 7pt;
            color: #7f8fa6;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 3px;
        }

        .contact-value {
            font-size: 9pt;
            color: #dfe6e9;
            font-weight: 400;
        }

        /* Skills */
        .skill-item {
            margin-bottom: 12px;
        }

        .skill-name {
            font-size: 9pt;
            color: #dfe6e9;
            font-weight: 500;
            margin-bottom: 5px;
            display: block;
        }

        .skill-bar-bg {
            background-color: #2d3f4f;
            height: 6px;
            border-radius: 3px;
            overflow: hidden;
        }

        .skill-bar {
            height: 100%;
            background-color: #3498db;
            border-radius: 3px;
        }

        .skill-bar.beginner { width: 25%; }
        .skill-bar.intermediate { width: 55%; }
        .skill-bar.advanced { width: 80%; }
        .skill-bar.expert { width: 100%; }

        /* Main Content */
        .main-content {
            margin-left: 35%;
            padding: 35px 38px;
            background-color: #ffffff;
            min-height: 100%;
        }

        /* Section Styling */
        .section {
            margin-bottom: 26px;
        }

        .section-title {
            font-size: 13pt;
            font-weight: bold;
            color: #1e272e;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 2px solid #3498db;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Summary Box */
        .summary {
            font-size: 10pt;
            line-height: 1.7;
            color: #4a5568;
            padding: 18px;
            background-color: #f7f9fc;
            border-left: 3px solid #3498db;
        }

        /* Experience & Education Items */
        .item {
            margin-bottom: 20px;
            padding-bottom: 18px;
            border-bottom: 1px solid #e8ecef;
            page-break-inside: avoid;
        }

        .item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .item-title {
            font-size: 11pt;
            font-weight: bold;
            color: #1e272e;
            margin-bottom: 3px;
        }

        .item-subtitle {
            font-size: 10pt;
            color: #3498db;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .item-date {
            font-size: 8pt;
            color: #7f8c8d;
            margin-bottom: 10px;
        }

        .item-date span {
            background-color: #ecf0f1;
            color: #576574;
            padding: 3px 10px;
            border-radius: 3px;
            display: inline-block;
        }

        .item-description {
            font-size: 9pt;
            line-height: 1.65;
            color: #4a5568;
            text-align: justify;
        }

        /* Footer */
        .footer {
            margin-top: 28px;
            padding-top: 15px;
            border-top: 1px solid #dfe6e9;
            text-align: center;
        }

        .footer-text {
            font-size: 7pt;
            color: #b2bec3;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .footer-line {
            width: 35px;
            height: 2px;
            background-color: #3498db;
            margin: 6px auto 0;
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="sidebar-header">
            @if(($customization->show_photo ?? true) && !empty($resume->personal_info['photo']))
                <img src="{{ $resume->personal_info['photo'] }}" alt="Profile Photo" class="profile-photo">
            @endif
            <div class="name">{{ $resume->personal_info['full_name'] ?? 'Your Name' }}</div>
            <div class="title-divider"></div>
            <div class="tagline">Professional</div>
        </div>

        <div class="sidebar-content">
            <!-- Contact Information -->
            @if($customization->show_contact ?? true)
                <div class="sidebar-section">
                    <div class="sidebar-title">Contact</div>
                    @if(!empty($resume->personal_info['email']))
                        <div class="contact-item">
                            <span class="contact-label">Email</span>
                            <span class="contact-value">{{ $resume->personal_info['email'] }}</span>
                        </div>
                    @endif
                    @if(!empty($resume->personal_info['phone']))
                        <div class="contact-item">
                            <span class="contact-label">Phone</span>
                            <span class="contact-value">{{ $resume->personal_info['phone'] }}</span>
                        </div>
                    @endif
                    @if(!empty($resume->personal_info['address']))
                        <div class="contact-item">
                            <span class="contact-label">Location</span>
                            <span class="contact-value">{{ $resume->personal_info['address'] }}</span>
                        </div>
                    @endif
                </div>
            @endif

            <!-- Skills -->
            @if(($customization->show_skills ?? true) && $resume->skills->count() > 0)
                <div class="sidebar-section">
                    <div class="sidebar-title">Skills</div>
                    @foreach($resume->skills as $skill)
                        <div class="skill-item">
                            <span class="skill-name">{{ $skill->name }}</span>
                            <div class="skill-bar-bg">
                                <div class="skill-bar {{ $skill->proficiency_level }}"></div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Professional Summary -->
        @if(($customization->show_summary ?? true) && !empty($resume->personal_info['summary']))
            <div class="section">
                <div class="section-title">About Me</div>
                <div class="summary">{{ $resume->personal_info['summary'] }}</div>
            </div>
        @endif

        <!-- Work Experience -->
        @if(($customization->show_experience ?? true) && $resume->workExperiences->count() > 0)
            <div class="section">
                <div class="section-title">Experience</div>
                @foreach($resume->workExperiences as $experience)
                    <div class="item">
                        <div class="item-title">{{ $experience->position }}</div>
                        <div class="item-subtitle">{{ $experience->company }}</div>
                        <div class="item-date">
                            <span>{{ \Carbon\Carbon::parse($experience->start_date)->format('M Y') }} - {{ $experience->is_current ? 'Present' : \Carbon\Carbon::parse($experience->end_date)->format('M Y') }}</span>
                        </div>
                        @if($experience->description)
                            <div class="item-description">{{ $experience->description }}</div>
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
                    <div class="item">
                        <div class="item-title">{{ $education->degree }}@if($education->field) in {{ $education->field }}@endif</div>
                        <div class="item-subtitle">{{ $education->institution }}</div>
                        <div class="item-date">
                            <span>{{ \Carbon\Carbon::parse($education->start_date)->format('M Y') }} - {{ $education->is_current ? 'Present' : \Carbon\Carbon::parse($education->end_date)->format('M Y') }}</span>
                        </div>
                        @if($education->description)
                            <div class="item-description">{{ $education->description }}</div>
                        @endif
                    </div>
                @endforeach
            </div>
        @endif

        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">Curriculum Vitae</div>
            <div class="footer-line"></div>
        </div>
    </div>
</body>
</html>
