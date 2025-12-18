<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $card->display_name }} - Business Card</title>
    <style>
        @page {
            margin: 0;
            padding: 0;
            size: letter;
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
            font-family: 'DejaVu Sans', 'Helvetica', Arial, sans-serif;
            background: #f8fafc;
        }

        /* Page container - Letter size: 612pt x 792pt */
        .page-container {
            width: 612pt;
            height: 792pt;
            position: relative;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        /* Decorative background pattern */
        .bg-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.1;
        }
        .bg-circle {
            position: absolute;
            border-radius: 50%;
            background: #fff;
        }
        .bg-circle-1 { width: 300pt; height: 300pt; top: -100pt; right: -50pt; }
        .bg-circle-2 { width: 200pt; height: 200pt; bottom: 100pt; left: -80pt; }
        .bg-circle-3 { width: 150pt; height: 150pt; bottom: -50pt; right: 100pt; }

        /* Header section */
        .header {
            position: absolute;
            top: 40pt;
            left: 50pt;
            right: 50pt;
            text-align: center;
        }
        .header-title {
            font-size: 11pt;
            color: rgba(255,255,255,0.9);
            text-transform: uppercase;
            letter-spacing: 3pt;
            margin-bottom: 8pt;
        }
        .header-name {
            font-size: 24pt;
            font-weight: 700;
            color: #fff;
        }

        /* Card wrapper - centered on page */
        .card-wrapper {
            position: absolute;
            top: 260pt;
            left: 180pt;
        }

        /* Crop marks */
        .crop-mark {
            position: absolute;
            background: rgba(255,255,255,0.6);
        }
        .crop-mark-h { width: 20pt; height: 0.75pt; }
        .crop-mark-v { width: 0.75pt; height: 20pt; }
        .crop-tl-h { top: -25pt; left: 0; }
        .crop-tl-v { top: 0; left: -25pt; }
        .crop-tr-h { top: -25pt; right: 0; }
        .crop-tr-v { top: 0; right: -25pt; }
        .crop-bl-h { bottom: -25pt; left: 0; }
        .crop-bl-v { bottom: 0; left: -25pt; }
        .crop-br-h { bottom: -25pt; right: 0; }
        .crop-br-v { bottom: 0; right: -25pt; }

        /* Card shadow effect */
        .card-shadow {
            position: absolute;
            top: 8pt;
            left: 8pt;
            width: 252pt;
            height: 144pt;
            background: rgba(0,0,0,0.2);
            border-radius: 8pt;
        }

        /* Business card container - standard 3.5" x 2" */
        .business-card {
            width: 252pt;
            height: 144pt;
            position: relative;
            overflow: hidden;
            border-radius: 6pt;
            background: #fff;
        }

        /* Card info section below */
        .card-info {
            position: absolute;
            bottom: -60pt;
            left: 0;
            right: 0;
            text-align: center;
        }
        .card-dimensions {
            font-size: 9pt;
            color: rgba(255,255,255,0.8);
            margin-bottom: 4pt;
        }
        .card-instructions {
            font-size: 7pt;
            color: rgba(255,255,255,0.6);
        }

        /* QR Code section at bottom */
        .qr-section {
            position: absolute;
            bottom: 60pt;
            left: 0;
            right: 0;
            text-align: center;
        }
        .qr-box {
            display: inline-block;
            background: #fff;
            padding: 12pt;
            border-radius: 12pt;
        }
        .qr-code-large {
            width: 80pt;
            height: 80pt;
        }
        .qr-code-large img {
            width: 100%;
            height: 100%;
        }
        .qr-label {
            font-size: 7pt;
            color: rgba(255,255,255,0.8);
            margin-top: 10pt;
            text-transform: uppercase;
            letter-spacing: 1pt;
        }

        /* Footer */
        .footer {
            position: absolute;
            bottom: 20pt;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 6pt;
            color: rgba(255,255,255,0.5);
        }

        /* =====================================================
           TEMPLATE: MINIMAL
           ===================================================== */
        .template-minimal {
            background: {{ $card->color_background ?? '#ffffff' }};
            padding: 18pt;
            height: 100%;
        }
        .template-minimal .card-layout {
            display: table;
            width: 100%;
            height: 100%;
        }
        .template-minimal .content-col {
            display: table-cell;
            vertical-align: middle;
            width: 65%;
        }
        .template-minimal .qr-col {
            display: table-cell;
            vertical-align: middle;
            width: 35%;
            text-align: right;
        }
        .template-minimal .display-name {
            font-size: 15pt;
            font-weight: 700;
            color: {{ $card->color_primary ?? '#1f2937' }};
            margin-bottom: 3pt;
            letter-spacing: -0.3pt;
        }
        .template-minimal .title-line {
            font-size: 8pt;
            color: {{ $card->color_secondary ?? '#6b7280' }};
            margin-bottom: 4pt;
        }
        .template-minimal .company {
            font-size: 6.5pt;
            font-weight: 600;
            color: {{ $card->color_text ?? '#374151' }};
            text-transform: uppercase;
            letter-spacing: 0.8pt;
            margin-bottom: 12pt;
        }
        .template-minimal .contact-list {
            font-size: 6.5pt;
            line-height: 1.7;
            color: {{ $card->color_text ?? '#4b5563' }};
        }
        .template-minimal .contact-item {
            margin-bottom: 2pt;
        }
        .template-minimal .contact-dot {
            display: inline-block;
            width: 4pt;
            height: 4pt;
            background: {{ $card->color_primary ?? '#8b5cf6' }};
            border-radius: 50%;
            margin-right: 6pt;
            vertical-align: middle;
        }
        .template-minimal .qr-frame {
            width: 58pt;
            height: 58pt;
            padding: 4pt;
            background: #fff;
            border: 1.5pt solid {{ $card->color_primary ?? '#e5e7eb' }};
            border-radius: 6pt;
        }
        .template-minimal .qr-frame img {
            width: 100%;
            height: 100%;
        }

        /* =====================================================
           TEMPLATE: MODERN
           ===================================================== */
        .template-modern {
            background: {{ $card->color_background ?? '#ffffff' }};
            height: 100%;
        }
        .template-modern .header-band {
            height: 48pt;
            background: {{ $card->color_primary ?? '#1e3a5f' }};
            padding: 12pt 18pt;
            position: relative;
        }
        .template-modern .header-band::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3pt;
            background: {{ $card->color_secondary ?? '#3b82f6' }};
        }
        .template-modern .header-band .display-name {
            font-size: 14pt;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 2pt;
        }
        .template-modern .header-band .title-line {
            font-size: 7.5pt;
            color: rgba(255, 255, 255, 0.85);
        }
        .template-modern .body-area {
            padding: 12pt 18pt;
            display: table;
            width: 100%;
        }
        .template-modern .info-col {
            display: table-cell;
            width: 65%;
            vertical-align: top;
        }
        .template-modern .company {
            font-size: 6.5pt;
            font-weight: 600;
            color: {{ $card->color_primary ?? '#1e3a5f' }};
            text-transform: uppercase;
            letter-spacing: 0.6pt;
            margin-bottom: 8pt;
            padding-bottom: 4pt;
            border-bottom: 1pt solid #e5e7eb;
        }
        .template-modern .contact-list {
            font-size: 6.5pt;
            line-height: 1.8;
            color: {{ $card->color_text ?? '#4b5563' }};
        }
        .template-modern .contact-item {
            margin-bottom: 1pt;
        }
        .template-modern .contact-label {
            display: inline-block;
            width: 10pt;
            font-weight: 700;
            color: {{ $card->color_primary ?? '#1e3a5f' }};
        }
        .template-modern .qr-col {
            display: table-cell;
            width: 35%;
            vertical-align: top;
            text-align: right;
        }
        .template-modern .qr-frame {
            width: 54pt;
            height: 54pt;
            padding: 3pt;
            background: #ffffff;
            border: 1.5pt solid {{ $card->color_primary ?? '#1e3a5f' }};
            border-radius: 4pt;
        }
        .template-modern .qr-frame img {
            width: 100%;
            height: 100%;
        }

        /* =====================================================
           TEMPLATE: CREATIVE
           ===================================================== */
        .template-creative {
            background: {{ $card->color_background ?? '#ffffff' }};
            height: 100%;
        }
        .template-creative .card-layout {
            display: table;
            width: 100%;
            height: 100%;
        }
        .template-creative .sidebar {
            display: table-cell;
            width: 55pt;
            vertical-align: top;
            background: linear-gradient(180deg, {{ $card->color_primary ?? '#8b5cf6' }}, {{ $card->color_secondary ?? '#ec4899' }});
            position: relative;
        }
        .template-creative .sidebar-decor {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.15);
        }
        .template-creative .decor-1 {
            width: 30pt;
            height: 30pt;
            top: 12pt;
            left: 50%;
            margin-left: -15pt;
        }
        .template-creative .decor-2 {
            width: 18pt;
            height: 18pt;
            bottom: 12pt;
            left: 50%;
            margin-left: -9pt;
        }
        .template-creative .sidebar-text {
            position: absolute;
            bottom: 40pt;
            left: 50%;
            transform: rotate(-90deg);
            transform-origin: center center;
            white-space: nowrap;
            font-size: 5pt;
            color: rgba(255,255,255,0.8);
            text-transform: uppercase;
            letter-spacing: 1pt;
        }
        .template-creative .main-area {
            display: table-cell;
            vertical-align: middle;
            padding: 16pt;
        }
        .template-creative .display-name {
            font-size: 15pt;
            font-weight: 800;
            color: {{ $card->color_primary ?? '#8b5cf6' }};
            margin-bottom: 2pt;
        }
        .template-creative .title-line {
            font-size: 8pt;
            color: {{ $card->color_text ?? '#374151' }};
            margin-bottom: 12pt;
        }
        .template-creative .contact-list {
            font-size: 6.5pt;
            line-height: 1.8;
            color: {{ $card->color_text ?? '#4b5563' }};
        }
        .template-creative .contact-item {
            margin-bottom: 2pt;
            padding-left: 8pt;
            border-left: 2pt solid {{ $card->color_primary ?? '#8b5cf6' }};
        }
        .template-creative .qr-col {
            display: table-cell;
            width: 65pt;
            vertical-align: middle;
            text-align: center;
        }
        .template-creative .qr-frame {
            width: 52pt;
            height: 52pt;
            padding: 3pt;
            background: #ffffff;
            border: 2pt solid {{ $card->color_primary ?? '#8b5cf6' }};
            border-radius: 8pt;
        }
        .template-creative .qr-frame img {
            width: 100%;
            height: 100%;
        }

        /* =====================================================
           TEMPLATE: GLASS / AURORA / FROST / PRISM
           ===================================================== */
        .template-glass,
        .template-aurora,
        .template-frost,
        .template-prism {
            background: {{ $card->color_background ?? '#1a1a2e' }};
            height: 100%;
            position: relative;
            overflow: hidden;
        }
        .template-glass .bg-orb,
        .template-aurora .bg-orb {
            position: absolute;
            border-radius: 50%;
        }
        .template-glass .orb-1,
        .template-aurora .orb-1 {
            top: -35pt;
            right: -25pt;
            width: 100pt;
            height: 100pt;
            background: {{ $card->color_primary ?? '#8b5cf6' }};
            opacity: 0.25;
        }
        .template-glass .orb-2,
        .template-aurora .orb-2 {
            bottom: -30pt;
            left: 30pt;
            width: 80pt;
            height: 80pt;
            background: {{ $card->color_secondary ?? '#06b6d4' }};
            opacity: 0.2;
        }
        .template-frost .frost-layer {
            position: absolute;
            top: 0;
            right: 0;
            width: 140pt;
            height: 144pt;
            background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 70%);
        }
        .template-prism .prism-frame {
            position: absolute;
            top: 10pt;
            left: 10pt;
            right: 10pt;
            bottom: 10pt;
            border: 2pt solid transparent;
            border-image: linear-gradient(135deg, {{ $card->color_primary ?? '#8b5cf6' }}, {{ $card->color_secondary ?? '#06b6d4' }}, {{ $card->color_accent ?? '#f43f5e' }}) 1;
        }
        .template-glass .card-content,
        .template-aurora .card-content,
        .template-frost .card-content,
        .template-prism .card-content {
            position: relative;
            z-index: 1;
            padding: 18pt;
            display: table;
            width: 100%;
            height: 100%;
        }
        .template-glass .info-col,
        .template-aurora .info-col,
        .template-frost .info-col,
        .template-prism .info-col {
            display: table-cell;
            vertical-align: middle;
            width: 65%;
        }
        .template-glass .display-name,
        .template-aurora .display-name,
        .template-frost .display-name,
        .template-prism .display-name {
            font-size: 15pt;
            font-weight: 700;
            color: {{ $card->color_text ?? '#ffffff' }};
            margin-bottom: 3pt;
        }
        .template-glass .title-line,
        .template-aurora .title-line,
        .template-frost .title-line,
        .template-prism .title-line {
            font-size: 7.5pt;
            color: {{ $card->color_primary ?? '#8b5cf6' }};
            margin-bottom: 4pt;
        }
        .template-glass .company,
        .template-aurora .company,
        .template-frost .company,
        .template-prism .company {
            font-size: 6pt;
            color: rgba(255,255,255,0.6);
            text-transform: uppercase;
            letter-spacing: 1pt;
            margin-bottom: 12pt;
        }
        .template-glass .contact-list,
        .template-aurora .contact-list,
        .template-frost .contact-list,
        .template-prism .contact-list {
            font-size: 6.5pt;
            line-height: 1.8;
            color: rgba(255,255,255,0.85);
        }
        .template-glass .contact-item,
        .template-aurora .contact-item,
        .template-frost .contact-item,
        .template-prism .contact-item {
            margin-bottom: 2pt;
        }
        .template-glass .contact-icon,
        .template-aurora .contact-icon,
        .template-frost .contact-icon,
        .template-prism .contact-icon {
            display: inline-block;
            width: 10pt;
            color: {{ $card->color_primary ?? '#8b5cf6' }};
        }
        .template-glass .qr-col,
        .template-aurora .qr-col,
        .template-frost .qr-col,
        .template-prism .qr-col {
            display: table-cell;
            vertical-align: middle;
            width: 35%;
            text-align: right;
        }
        .template-glass .qr-frame,
        .template-aurora .qr-frame,
        .template-frost .qr-frame,
        .template-prism .qr-frame {
            width: 56pt;
            height: 56pt;
            padding: 4pt;
            background: rgba(255,255,255,0.95);
            border-radius: 6pt;
        }
        .template-glass .qr-frame img,
        .template-aurora .qr-frame img,
        .template-frost .qr-frame img,
        .template-prism .qr-frame img {
            width: 100%;
            height: 100%;
        }

        /* Tagline */
        .tagline {
            font-size: 5.5pt;
            font-style: italic;
            margin-top: 8pt;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    @php
        $template = $card->template ?? 'minimal';
        $bgGradient = 'linear-gradient(135deg, ' . ($card->color_primary ?? '#667eea') . ' 0%, ' . ($card->color_secondary ?? '#764ba2') . ' 100%)';
    @endphp

    <div class="page-container" style="background: {{ $bgGradient }};">
        <!-- Decorative background -->
        <div class="bg-pattern">
            <div class="bg-circle bg-circle-1"></div>
            <div class="bg-circle bg-circle-2"></div>
            <div class="bg-circle bg-circle-3"></div>
        </div>

        <!-- Header -->
        <div class="header">
            <div class="header-title">Business Card</div>
            <div class="header-name">{{ $card->display_name }}</div>
        </div>

        <!-- Card with shadow and crop marks -->
        <div class="card-wrapper">
            <!-- Crop marks -->
            <div class="crop-mark crop-mark-h crop-tl-h"></div>
            <div class="crop-mark crop-mark-v crop-tl-v"></div>
            <div class="crop-mark crop-mark-h crop-tr-h"></div>
            <div class="crop-mark crop-mark-v crop-tr-v"></div>
            <div class="crop-mark crop-mark-h crop-bl-h"></div>
            <div class="crop-mark crop-mark-v crop-bl-v"></div>
            <div class="crop-mark crop-mark-h crop-br-h"></div>
            <div class="crop-mark crop-mark-v crop-br-v"></div>

            <!-- Shadow -->
            <div class="card-shadow"></div>

            <!-- The Business Card -->
            <div class="business-card">
                @if($template === 'minimal')
                    <div class="template-minimal">
                        <div class="card-layout">
                            <div class="content-col">
                                <div class="display-name">{{ $card->display_name }}</div>
                                @if($card->title)
                                    <div class="title-line">{{ $card->title }}</div>
                                @endif
                                @if($card->company)
                                    <div class="company">{{ $card->company }}</div>
                                @endif
                                <div class="contact-list">
                                    @if($card->email)
                                        <div class="contact-item"><span class="contact-dot"></span>{{ $card->email }}</div>
                                    @endif
                                    @if($card->phone)
                                        <div class="contact-item"><span class="contact-dot"></span>{{ $card->phone }}</div>
                                    @endif
                                    @if($card->website)
                                        <div class="contact-item"><span class="contact-dot"></span>{{ str_replace(['https://', 'http://'], '', $card->website) }}</div>
                                    @endif
                                    @if($card->location)
                                        <div class="contact-item"><span class="contact-dot"></span>{{ $card->location }}</div>
                                    @endif
                                </div>
                            </div>
                            <div class="qr-col">
                                <div class="qr-frame">
                                    <img src="{{ $qrCode }}" alt="QR">
                                </div>
                            </div>
                        </div>
                    </div>

                @elseif($template === 'modern')
                    <div class="template-modern">
                        <div class="header-band">
                            <div class="display-name">{{ $card->display_name }}</div>
                            @if($card->title)
                                <div class="title-line">{{ $card->title }}</div>
                            @endif
                        </div>
                        <div class="body-area">
                            <div class="info-col">
                                @if($card->company)
                                    <div class="company">{{ $card->company }}</div>
                                @endif
                                <div class="contact-list">
                                    @if($card->email)
                                        <div class="contact-item"><span class="contact-label">E</span> {{ $card->email }}</div>
                                    @endif
                                    @if($card->phone)
                                        <div class="contact-item"><span class="contact-label">T</span> {{ $card->phone }}</div>
                                    @endif
                                    @if($card->website)
                                        <div class="contact-item"><span class="contact-label">W</span> {{ str_replace(['https://', 'http://'], '', $card->website) }}</div>
                                    @endif
                                    @if($card->location)
                                        <div class="contact-item"><span class="contact-label">L</span> {{ $card->location }}</div>
                                    @endif
                                </div>
                            </div>
                            <div class="qr-col">
                                <div class="qr-frame">
                                    <img src="{{ $qrCode }}" alt="QR">
                                </div>
                            </div>
                        </div>
                    </div>

                @elseif($template === 'creative')
                    <div class="template-creative">
                        <div class="card-layout">
                            <div class="sidebar">
                                <div class="sidebar-decor decor-1"></div>
                                <div class="sidebar-decor decor-2"></div>
                                @if($card->company)
                                    <div class="sidebar-text">{{ $card->company }}</div>
                                @endif
                            </div>
                            <div class="main-area">
                                <div class="display-name">{{ $card->display_name }}</div>
                                @if($card->title)
                                    <div class="title-line">{{ $card->title }}</div>
                                @endif
                                <div class="contact-list">
                                    @if($card->email)
                                        <div class="contact-item">{{ $card->email }}</div>
                                    @endif
                                    @if($card->phone)
                                        <div class="contact-item">{{ $card->phone }}</div>
                                    @endif
                                    @if($card->website)
                                        <div class="contact-item">{{ str_replace(['https://', 'http://'], '', $card->website) }}</div>
                                    @endif
                                    @if($card->location)
                                        <div class="contact-item">{{ $card->location }}</div>
                                    @endif
                                </div>
                            </div>
                            <div class="qr-col">
                                <div class="qr-frame">
                                    <img src="{{ $qrCode }}" alt="QR">
                                </div>
                            </div>
                        </div>
                    </div>

                @elseif(in_array($template, ['glass', 'aurora', 'frost', 'prism']))
                    <div class="template-{{ $template }}">
                        @if(in_array($template, ['glass', 'aurora']))
                            <div class="bg-orb orb-1"></div>
                            <div class="bg-orb orb-2"></div>
                        @elseif($template === 'frost')
                            <div class="frost-layer"></div>
                        @elseif($template === 'prism')
                            <div class="prism-frame"></div>
                        @endif
                        <div class="card-content">
                            <div class="info-col">
                                <div class="display-name">{{ $card->display_name }}</div>
                                @if($card->title)
                                    <div class="title-line">{{ $card->title }}</div>
                                @endif
                                @if($card->company)
                                    <div class="company">{{ $card->company }}</div>
                                @endif
                                <div class="contact-list">
                                    @if($card->email)
                                        <div class="contact-item"><span class="contact-icon">@</span> {{ $card->email }}</div>
                                    @endif
                                    @if($card->phone)
                                        <div class="contact-item"><span class="contact-icon">#</span> {{ $card->phone }}</div>
                                    @endif
                                    @if($card->website)
                                        <div class="contact-item"><span class="contact-icon">~</span> {{ str_replace(['https://', 'http://'], '', $card->website) }}</div>
                                    @endif
                                    @if($card->location)
                                        <div class="contact-item"><span class="contact-icon">*</span> {{ $card->location }}</div>
                                    @endif
                                </div>
                            </div>
                            <div class="qr-col">
                                <div class="qr-frame">
                                    <img src="{{ $qrCode }}" alt="QR">
                                </div>
                            </div>
                        </div>
                    </div>

                @else
                    {{-- Default: Minimal template --}}
                    <div class="template-minimal">
                        <div class="card-layout">
                            <div class="content-col">
                                <div class="display-name">{{ $card->display_name }}</div>
                                @if($card->title)
                                    <div class="title-line">{{ $card->title }}</div>
                                @endif
                                @if($card->company)
                                    <div class="company">{{ $card->company }}</div>
                                @endif
                                <div class="contact-list">
                                    @if($card->email)
                                        <div class="contact-item"><span class="contact-dot"></span>{{ $card->email }}</div>
                                    @endif
                                    @if($card->phone)
                                        <div class="contact-item"><span class="contact-dot"></span>{{ $card->phone }}</div>
                                    @endif
                                    @if($card->website)
                                        <div class="contact-item"><span class="contact-dot"></span>{{ str_replace(['https://', 'http://'], '', $card->website) }}</div>
                                    @endif
                                    @if($card->location)
                                        <div class="contact-item"><span class="contact-dot"></span>{{ $card->location }}</div>
                                    @endif
                                </div>
                            </div>
                            <div class="qr-col">
                                <div class="qr-frame">
                                    <img src="{{ $qrCode }}" alt="QR">
                                </div>
                            </div>
                        </div>
                    </div>
                @endif
            </div>

            <!-- Card info -->
            <div class="card-info">
                <div class="card-dimensions">3.5" x 2" Standard Business Card</div>
                <div class="card-instructions">Cut along the crop marks</div>
            </div>
        </div>

        <!-- Large QR Code Section -->
        <div class="qr-section">
            <div class="qr-box">
                <div class="qr-code-large">
                    <img src="{{ $qrCode }}" alt="QR Code">
                </div>
            </div>
            <div class="qr-label">Scan to connect</div>
        </div>

        <!-- Footer -->
        <div class="footer">
            Generated with CV Builder
        </div>
    </div>
</body>
</html>
