<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Business Card Shared</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f5;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 500px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, {{ $card->color_primary ?? '#8b5cf6' }}, {{ $card->color_secondary ?? '#6366f1' }}); padding: 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                                {{ $sender->name }} shared their business card
                            </h1>
                        </td>
                    </tr>

                    <!-- Personal Message -->
                    @if($personalMessage)
                    <tr>
                        <td style="padding: 25px 30px 0;">
                            <div style="background-color: #f9fafb; border-left: 4px solid {{ $card->color_primary ?? '#8b5cf6' }}; padding: 15px; border-radius: 4px;">
                                <p style="margin: 0; color: #4b5563; font-style: italic;">"{{ $personalMessage }}"</p>
                            </div>
                        </td>
                    </tr>
                    @endif

                    <!-- Card Preview -->
                    <tr>
                        <td style="padding: 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fafafa; border-radius: 12px; padding: 20px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h2 style="margin: 0 0 5px; color: {{ $card->color_primary ?? '#8b5cf6' }}; font-size: 22px;">
                                            {{ $card->display_name }}
                                        </h2>
                                        @if($card->title)
                                        <p style="margin: 0 0 3px; color: #6b7280; font-size: 14px;">{{ $card->title }}</p>
                                        @endif
                                        @if($card->company)
                                        <p style="margin: 0; color: #9ca3af; font-size: 14px;">{{ $card->company }}</p>
                                        @endif

                                        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;">

                                        @if($card->email)
                                        <p style="margin: 0 0 8px; font-size: 14px;">
                                            <span style="color: #9ca3af;">Email:</span>
                                            <a href="mailto:{{ $card->email }}" style="color: #1f2937; text-decoration: none;">{{ $card->email }}</a>
                                        </p>
                                        @endif
                                        @if($card->phone)
                                        <p style="margin: 0 0 8px; font-size: 14px;">
                                            <span style="color: #9ca3af;">Phone:</span>
                                            <a href="tel:{{ $card->phone }}" style="color: #1f2937; text-decoration: none;">{{ $card->phone }}</a>
                                        </p>
                                        @endif
                                        @if($card->website)
                                        <p style="margin: 0; font-size: 14px;">
                                            <span style="color: #9ca3af;">Website:</span>
                                            <a href="{{ $card->website }}" style="color: {{ $card->color_primary ?? '#8b5cf6' }}; text-decoration: none;">{{ str_replace(['https://', 'http://'], '', $card->website) }}</a>
                                        </p>
                                        @endif
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 30px 30px; text-align: center;">
                            <a href="{{ $card->getPublicUrl() }}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, {{ $card->color_primary ?? '#8b5cf6' }}, {{ $card->color_secondary ?? '#6366f1' }}); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                                View Full Business Card
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                This card was shared via <a href="{{ config('app.url') }}" style="color: {{ $card->color_primary ?? '#8b5cf6' }}; text-decoration: none;">Identio</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
