<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Lead</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: {{ $card->color_primary ?? '#8b5cf6' }}; padding: 25px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Inquiry Received</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <p style="margin: 0 0 15px; color: #6b7280; font-size: 14px;">
                                You received a new inquiry via your <strong>{{ $card->name }}</strong> business card.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                                <tr>
                                    <td>
                                        <p style="margin: 0 0 10px; font-size: 14px;">
                                            <strong style="color: #374151;">Name:</strong>
                                            <span style="color: #6b7280;">{{ $lead->name }}</span>
                                        </p>
                                        <p style="margin: 0 0 10px; font-size: 14px;">
                                            <strong style="color: #374151;">Email:</strong>
                                            <a href="mailto:{{ $lead->email }}" style="color: {{ $card->color_primary ?? '#8b5cf6' }};">{{ $lead->email }}</a>
                                        </p>
                                        @if($lead->phone)
                                        <p style="margin: 0 0 10px; font-size: 14px;">
                                            <strong style="color: #374151;">Phone:</strong>
                                            <a href="tel:{{ $lead->phone }}" style="color: #6b7280;">{{ $lead->phone }}</a>
                                        </p>
                                        @endif
                                        @if($lead->company)
                                        <p style="margin: 0 0 10px; font-size: 14px;">
                                            <strong style="color: #374151;">Company:</strong>
                                            <span style="color: #6b7280;">{{ $lead->company }}</span>
                                        </p>
                                        @endif
                                        <p style="margin: 0 0 10px; font-size: 14px;">
                                            <strong style="color: #374151;">Type:</strong>
                                            <span style="color: #6b7280; text-transform: capitalize;">{{ $lead->type }}</span>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            @if($lead->subject)
                            <p style="margin: 0 0 5px; font-size: 14px;"><strong style="color: #374151;">Subject:</strong></p>
                            <p style="margin: 0 0 15px; color: #6b7280; font-size: 14px;">{{ $lead->subject }}</p>
                            @endif

                            @if($lead->message)
                            <p style="margin: 0 0 5px; font-size: 14px;"><strong style="color: #374151;">Message:</strong></p>
                            <p style="margin: 0; color: #6b7280; font-size: 14px; white-space: pre-wrap;">{{ $lead->message }}</p>
                            @endif
                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td style="padding: 0 30px 30px; text-align: center;">
                            <a href="{{ route('leads.show', $lead) }}" style="display: inline-block; padding: 12px 24px; background-color: {{ $card->color_primary ?? '#8b5cf6' }}; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">
                                View in Dashboard
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                This notification was sent via <a href="{{ config('app.url') }}" style="color: {{ $card->color_primary ?? '#8b5cf6' }};">Identio</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
