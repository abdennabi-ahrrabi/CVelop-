<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $card->display_name }} - Print Sheet</title>
    <style>
        @page {
            margin: 0.25in;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', 'Helvetica', Arial, sans-serif;
            background: #ffffff;
        }
        .page {
            width: 100%;
        }
        .row {
            display: table;
            width: 100%;
            margin-bottom: 0.1in;
        }
        .card-cell {
            display: table-cell;
            width: 3.5in;
            height: 2in;
            padding: 0 0.1in;
            vertical-align: top;
        }

        /* =====================================================
           SINGLE CARD STYLES
           Matching the main template styles
           ===================================================== */
        .business-card {
            width: 3.5in;
            height: 2in;
            position: relative;
            overflow: hidden;
        }

        /* Classic / Minimal Template */
        .template-classic,
        .template-minimal {
            background: {{ $card->color_background ?? '#ffffff' }};
            padding: 0.15in;
            display: table;
            border: 0.5pt solid #e5e7eb;
        }

        .template-classic .content-wrapper,
        .template-minimal .content-wrapper {
            display: table-cell;
            width: 2.4in;
            vertical-align: middle;
        }

        .template-classic .qr-wrapper,
        .template-minimal .qr-wrapper {
            display: table-cell;
            width: 0.9in;
            vertical-align: middle;
            text-align: right;
        }

        .template-classic .display-name,
        .template-minimal .display-name {
            font-size: 12pt;
            font-weight: 700;
            color: {{ $card->color_primary ?? '#1a1a1a' }};
            margin-bottom: 1pt;
        }

        .template-classic .title-line,
        .template-minimal .title-line {
            font-size: 7pt;
            color: {{ $card->color_secondary ?? '#64748b' }};
            margin-bottom: 2pt;
        }

        .template-classic .company,
        .template-minimal .company {
            font-size: 6pt;
            font-weight: 600;
            color: {{ $card->color_text ?? '#374151' }};
            text-transform: uppercase;
            letter-spacing: 0.5pt;
            margin-bottom: 6pt;
        }

        .template-classic .contact-grid,
        .template-minimal .contact-grid {
            font-size: 5.5pt;
            line-height: 1.4;
            color: {{ $card->color_text ?? '#374151' }};
        }

        .template-classic .contact-item,
        .template-minimal .contact-item {
            margin-bottom: 1pt;
        }

        .template-classic .contact-icon,
        .template-minimal .contact-icon {
            display: inline-block;
            width: 8pt;
            color: {{ $card->color_primary ?? '#8b5cf6' }};
        }

        .template-classic .qr-code,
        .template-minimal .qr-code {
            width: 0.7in;
            height: 0.7in;
            padding: 2pt;
            background: #ffffff;
        }

        .template-classic .qr-code img,
        .template-minimal .qr-code img {
            width: 100%;
            height: 100%;
        }

        .template-classic .accent-line {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2pt;
            background: {{ $card->color_primary ?? '#8b5cf6' }};
        }

        /* Modern Template */
        .template-modern {
            background: {{ $card->color_background ?? '#ffffff' }};
            border: 0.5pt solid #e5e7eb;
        }

        .template-modern .header-strip {
            height: 0.45in;
            background: {{ $card->color_primary ?? '#1e3a5f' }};
            padding: 0.08in 0.12in;
        }

        .template-modern .header-strip .display-name {
            font-size: 10pt;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1pt;
        }

        .template-modern .header-strip .title-line {
            font-size: 6pt;
            color: rgba(255, 255, 255, 0.85);
        }

        .template-modern .body-content {
            padding: 0.1in 0.12in;
            display: table;
            width: 100%;
        }

        .template-modern .contact-section {
            display: table-cell;
            width: 2.3in;
            vertical-align: top;
        }

        .template-modern .company {
            font-size: 6pt;
            font-weight: 600;
            color: {{ $card->color_text ?? '#374151' }};
            text-transform: uppercase;
            letter-spacing: 0.4pt;
            margin-bottom: 4pt;
        }

        .template-modern .contact-grid {
            font-size: 5.5pt;
            line-height: 1.5;
            color: {{ $card->color_text ?? '#374151' }};
        }

        .template-modern .contact-label {
            color: {{ $card->color_secondary ?? '#6b7280' }};
            display: inline-block;
            width: 6pt;
        }

        .template-modern .qr-section {
            display: table-cell;
            width: 0.9in;
            vertical-align: top;
            text-align: right;
        }

        .template-modern .qr-code {
            width: 0.65in;
            height: 0.65in;
            padding: 2pt;
            background: #ffffff;
            border: 0.5pt solid {{ $card->color_primary ?? '#1e3a5f' }};
        }

        .template-modern .qr-code img {
            width: 100%;
            height: 100%;
        }

        /* Executive Template */
        .template-executive {
            background: {{ $card->color_background ?? '#1a1a2e' }};
            padding: 0.12in;
        }

        .template-executive .left-accent {
            position: absolute;
            left: 0;
            top: 0.3in;
            bottom: 0.3in;
            width: 2pt;
            background: {{ $card->color_accent ?? '#d4af37' }};
        }

        .template-executive .content-wrapper {
            display: table;
            width: 100%;
            height: 100%;
        }

        .template-executive .main-content {
            display: table-cell;
            width: 2.4in;
            vertical-align: middle;
            padding-left: 6pt;
        }

        .template-executive .display-name {
            font-size: 12pt;
            font-weight: 700;
            color: {{ $card->color_text ?? '#ffffff' }};
            margin-bottom: 2pt;
        }

        .template-executive .title-line {
            font-size: 6pt;
            color: {{ $card->color_accent ?? '#d4af37' }};
            margin-bottom: 2pt;
        }

        .template-executive .company {
            font-size: 5.5pt;
            color: {{ $card->color_secondary ?? 'rgba(255,255,255,0.7)' }};
            text-transform: uppercase;
            letter-spacing: 0.8pt;
            margin-bottom: 6pt;
        }

        .template-executive .contact-grid {
            font-size: 5pt;
            line-height: 1.5;
            color: {{ $card->color_secondary ?? 'rgba(255,255,255,0.8)' }};
        }

        .template-executive .contact-divider {
            color: {{ $card->color_accent ?? '#d4af37' }};
            margin: 0 3pt;
        }

        .template-executive .qr-wrapper {
            display: table-cell;
            width: 0.85in;
            vertical-align: middle;
            text-align: right;
        }

        .template-executive .qr-code {
            width: 0.6in;
            height: 0.6in;
            padding: 2pt;
            background: rgba(255, 255, 255, 0.95);
        }

        .template-executive .qr-code img {
            width: 100%;
            height: 100%;
        }

        /* Creative Template */
        .template-creative {
            background: {{ $card->color_background ?? '#ffffff' }};
            border: 0.5pt solid #e5e7eb;
        }

        .template-creative .gradient-bar {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 6pt;
            background: linear-gradient(180deg, {{ $card->color_primary ?? '#8b5cf6' }}, {{ $card->color_secondary ?? '#ec4899' }});
        }

        .template-creative .main-area {
            padding: 0.12in 0.12in 0.12in 0.2in;
            display: table;
            width: 100%;
            height: 100%;
        }

        .template-creative .info-section {
            display: table-cell;
            width: 2.3in;
            vertical-align: middle;
        }

        .template-creative .display-name {
            font-size: 12pt;
            font-weight: 800;
            color: {{ $card->color_primary ?? '#8b5cf6' }};
            margin-bottom: 1pt;
        }

        .template-creative .title-line {
            font-size: 6pt;
            color: {{ $card->color_text ?? '#374151' }};
            margin-bottom: 2pt;
        }

        .template-creative .company {
            font-size: 5.5pt;
            font-weight: 600;
            color: {{ $card->color_secondary ?? '#ec4899' }};
            margin-bottom: 6pt;
        }

        .template-creative .contact-grid {
            font-size: 5.5pt;
            line-height: 1.5;
            color: {{ $card->color_text ?? '#4b5563' }};
        }

        .template-creative .contact-bullet {
            color: {{ $card->color_primary ?? '#8b5cf6' }};
            margin-right: 2pt;
        }

        .template-creative .qr-section {
            display: table-cell;
            width: 0.85in;
            vertical-align: middle;
            text-align: right;
        }

        .template-creative .qr-code {
            width: 0.65in;
            height: 0.65in;
            padding: 2pt;
            background: #ffffff;
            border: 1pt solid {{ $card->color_primary ?? '#8b5cf6' }};
        }

        .template-creative .qr-code img {
            width: 100%;
            height: 100%;
        }

        /* Glass / Premium Templates */
        .template-glass,
        .template-aurora,
        .template-frost,
        .template-prism {
            background: {{ $card->color_background ?? '#1a1a2e' }};
            overflow: hidden;
        }

        .template-glass .bg-pattern,
        .template-aurora .bg-pattern {
            position: absolute;
            top: -0.3in;
            right: -0.3in;
            width: 1.5in;
            height: 1.5in;
            border-radius: 50%;
            background: {{ $card->color_primary ?? '#8b5cf6' }};
            opacity: 0.15;
        }

        .template-glass .bg-pattern-2,
        .template-aurora .bg-pattern-2 {
            position: absolute;
            bottom: -0.4in;
            left: 0.8in;
            width: 1in;
            height: 1in;
            border-radius: 50%;
            background: {{ $card->color_secondary ?? '#06b6d4' }};
            opacity: 0.1;
        }

        .template-frost .bg-pattern {
            position: absolute;
            top: 0;
            right: 0;
            width: 1.3in;
            height: 2in;
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
        }

        .template-prism .border-accent {
            position: absolute;
            top: 4pt;
            left: 4pt;
            right: 4pt;
            bottom: 4pt;
            border: 1pt solid {{ $card->color_primary ?? '#8b5cf6' }};
        }

        .template-glass .card-inner,
        .template-aurora .card-inner,
        .template-frost .card-inner,
        .template-prism .card-inner {
            position: relative;
            z-index: 1;
            padding: 0.12in 0.15in;
            display: table;
            width: 100%;
            height: 100%;
        }

        .template-glass .content-col,
        .template-aurora .content-col,
        .template-frost .content-col,
        .template-prism .content-col {
            display: table-cell;
            width: 2.4in;
            vertical-align: middle;
        }

        .template-glass .display-name,
        .template-aurora .display-name,
        .template-frost .display-name,
        .template-prism .display-name {
            font-size: 12pt;
            font-weight: 700;
            color: {{ $card->color_text ?? '#ffffff' }};
            margin-bottom: 2pt;
        }

        .template-glass .title-line,
        .template-aurora .title-line,
        .template-frost .title-line,
        .template-prism .title-line {
            font-size: 6pt;
            color: {{ $card->color_primary ?? '#8b5cf6' }};
            margin-bottom: 2pt;
        }

        .template-glass .company,
        .template-aurora .company,
        .template-frost .company,
        .template-prism .company {
            font-size: 5pt;
            color: {{ $card->color_secondary ?? 'rgba(255,255,255,0.7)' }};
            text-transform: uppercase;
            letter-spacing: 0.6pt;
            margin-bottom: 6pt;
        }

        .template-glass .contact-grid,
        .template-aurora .contact-grid,
        .template-frost .contact-grid,
        .template-prism .contact-grid {
            font-size: 5pt;
            line-height: 1.6;
            color: {{ $card->color_secondary ?? 'rgba(255,255,255,0.85)' }};
        }

        .template-glass .contact-dot,
        .template-aurora .contact-dot,
        .template-frost .contact-dot,
        .template-prism .contact-dot {
            color: {{ $card->color_primary ?? '#8b5cf6' }};
            margin-right: 3pt;
        }

        .template-glass .qr-col,
        .template-aurora .qr-col,
        .template-frost .qr-col,
        .template-prism .qr-col {
            display: table-cell;
            width: 0.8in;
            vertical-align: middle;
            text-align: right;
        }

        .template-glass .qr-code,
        .template-aurora .qr-code,
        .template-frost .qr-code,
        .template-prism .qr-code {
            width: 0.6in;
            height: 0.6in;
            padding: 2pt;
            background: rgba(255, 255, 255, 0.95);
        }

        .template-glass .qr-code img,
        .template-aurora .qr-code img,
        .template-frost .qr-code img,
        .template-prism .qr-code img {
            width: 100%;
            height: 100%;
        }

        /* Cut guides */
        .cut-guide {
            border: 0.25pt dashed #cccccc;
        }

        /* Page title */
        .sheet-title {
            text-align: center;
            font-size: 8pt;
            color: #9ca3af;
            margin-bottom: 0.15in;
        }
    </style>
</head>
<body>
    @php
        $template = $card->template ?? 'classic';
        $templateClass = 'template-' . $template;
        $totalCards = $cardsPerRow * $rows;
    @endphp

    <div class="sheet-title">Cut along dashed lines | {{ $card->display_name }} | {{ $totalCards }} cards</div>

    <div class="page">
        @for($row = 0; $row < $rows; $row++)
            <div class="row">
                @for($col = 0; $col < $cardsPerRow; $col++)
                    <div class="card-cell">
                        <div class="business-card {{ $templateClass }} cut-guide">
                            @if(in_array($template, ['classic', 'minimal']))
                                <div class="content-wrapper">
                                    <div class="display-name">{{ $card->display_name }}</div>
                                    @if($card->title)
                                        <div class="title-line">{{ $card->title }}</div>
                                    @endif
                                    @if($card->company)
                                        <div class="company">{{ $card->company }}</div>
                                    @endif
                                    <div class="contact-grid">
                                        @if($card->email)
                                            <div class="contact-item">
                                                <span class="contact-icon">✉</span>
                                                {{ $card->email }}
                                            </div>
                                        @endif
                                        @if($card->phone)
                                            <div class="contact-item">
                                                <span class="contact-icon">☎</span>
                                                {{ $card->phone }}
                                            </div>
                                        @endif
                                        @if($card->website)
                                            <div class="contact-item">
                                                <span class="contact-icon">⌂</span>
                                                {{ str_replace(['https://', 'http://'], '', $card->website) }}
                                            </div>
                                        @endif
                                        @if($card->location)
                                            <div class="contact-item">
                                                <span class="contact-icon">◉</span>
                                                {{ $card->location }}
                                            </div>
                                        @endif
                                    </div>
                                </div>
                                <div class="qr-wrapper">
                                    <div class="qr-code">
                                        <img src="{{ $qrCode }}" alt="QR">
                                    </div>
                                </div>
                                @if($template === 'classic')
                                    <div class="accent-line"></div>
                                @endif

                            @elseif($template === 'modern')
                                <div class="header-strip">
                                    <div class="display-name">{{ $card->display_name }}</div>
                                    @if($card->title)
                                        <div class="title-line">{{ $card->title }}</div>
                                    @endif
                                </div>
                                <div class="body-content">
                                    <div class="contact-section">
                                        @if($card->company)
                                            <div class="company">{{ $card->company }}</div>
                                        @endif
                                        <div class="contact-grid">
                                            @if($card->email)
                                                <div><span class="contact-label">E</span> {{ $card->email }}</div>
                                            @endif
                                            @if($card->phone)
                                                <div><span class="contact-label">T</span> {{ $card->phone }}</div>
                                            @endif
                                            @if($card->website)
                                                <div><span class="contact-label">W</span> {{ str_replace(['https://', 'http://'], '', $card->website) }}</div>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="qr-section">
                                        <div class="qr-code">
                                            <img src="{{ $qrCode }}" alt="QR">
                                        </div>
                                    </div>
                                </div>

                            @elseif($template === 'executive')
                                <div class="left-accent"></div>
                                <div class="content-wrapper">
                                    <div class="main-content">
                                        <div class="display-name">{{ $card->display_name }}</div>
                                        @if($card->title)
                                            <div class="title-line">{{ $card->title }}</div>
                                        @endif
                                        @if($card->company)
                                            <div class="company">{{ $card->company }}</div>
                                        @endif
                                        <div class="contact-grid">
                                            @if($card->email)
                                                <span>{{ $card->email }}</span>
                                            @endif
                                            @if($card->phone)
                                                <span class="contact-divider">|</span>
                                                <span>{{ $card->phone }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="qr-wrapper">
                                        <div class="qr-code">
                                            <img src="{{ $qrCode }}" alt="QR">
                                        </div>
                                    </div>
                                </div>

                            @elseif($template === 'creative')
                                <div class="gradient-bar"></div>
                                <div class="main-area">
                                    <div class="info-section">
                                        <div class="display-name">{{ $card->display_name }}</div>
                                        @if($card->title)
                                            <div class="title-line">{{ $card->title }}</div>
                                        @endif
                                        @if($card->company)
                                            <div class="company">{{ $card->company }}</div>
                                        @endif
                                        <div class="contact-grid">
                                            @if($card->email)
                                                <div><span class="contact-bullet">●</span>{{ $card->email }}</div>
                                            @endif
                                            @if($card->phone)
                                                <div><span class="contact-bullet">●</span>{{ $card->phone }}</div>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="qr-section">
                                        <div class="qr-code">
                                            <img src="{{ $qrCode }}" alt="QR">
                                        </div>
                                    </div>
                                </div>

                            @elseif(in_array($template, ['glass', 'aurora', 'frost', 'prism']))
                                @if(in_array($template, ['glass', 'aurora']))
                                    <div class="bg-pattern"></div>
                                    <div class="bg-pattern-2"></div>
                                @elseif($template === 'frost')
                                    <div class="bg-pattern"></div>
                                @elseif($template === 'prism')
                                    <div class="border-accent"></div>
                                @endif
                                <div class="card-inner">
                                    <div class="content-col">
                                        <div class="display-name">{{ $card->display_name }}</div>
                                        @if($card->title)
                                            <div class="title-line">{{ $card->title }}</div>
                                        @endif
                                        @if($card->company)
                                            <div class="company">{{ $card->company }}</div>
                                        @endif
                                        <div class="contact-grid">
                                            @if($card->email)
                                                <div><span class="contact-dot">◆</span>{{ $card->email }}</div>
                                            @endif
                                            @if($card->phone)
                                                <div><span class="contact-dot">◆</span>{{ $card->phone }}</div>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="qr-col">
                                        <div class="qr-code">
                                            <img src="{{ $qrCode }}" alt="QR">
                                        </div>
                                    </div>
                                </div>

                            @else
                                {{-- Fallback to classic --}}
                                <div class="content-wrapper">
                                    <div class="display-name">{{ $card->display_name }}</div>
                                    @if($card->title)
                                        <div class="title-line">{{ $card->title }}</div>
                                    @endif
                                    <div class="contact-grid">
                                        @if($card->email)
                                            <div><span class="contact-icon">✉</span>{{ $card->email }}</div>
                                        @endif
                                        @if($card->phone)
                                            <div><span class="contact-icon">☎</span>{{ $card->phone }}</div>
                                        @endif
                                    </div>
                                </div>
                                <div class="qr-wrapper">
                                    <div class="qr-code">
                                        <img src="{{ $qrCode }}" alt="QR">
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                @endfor
            </div>
        @endfor
    </div>
</body>
</html>
