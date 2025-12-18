<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfileView extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_card_id',
        'resume_id',
        'view_type',
        'viewer_id',
        'ip_address',
        'user_agent',
        'referrer',
        'country',
        'city',
        'device_type',
        'browser',
        'source',
        'utm_source',
        'utm_medium',
        'utm_campaign',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function businessCard(): BelongsTo
    {
        return $this->belongsTo(BusinessCard::class);
    }

    public function resume(): BelongsTo
    {
        return $this->belongsTo(Resume::class);
    }

    public function viewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'viewer_id');
    }

    public static function recordView(
        int $userId,
        string $viewType,
        ?int $businessCardId = null,
        ?int $resumeId = null,
        ?int $viewerId = null,
        string $source = 'direct'
    ): self {
        $request = request();

        return static::create([
            'user_id' => $userId,
            'business_card_id' => $businessCardId,
            'resume_id' => $resumeId,
            'view_type' => $viewType,
            'viewer_id' => $viewerId,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'referrer' => $request->header('referer'),
            'source' => $source,
            'utm_source' => $request->get('utm_source'),
            'utm_medium' => $request->get('utm_medium'),
            'utm_campaign' => $request->get('utm_campaign'),
            'device_type' => static::detectDeviceType($request->userAgent()),
            'browser' => static::detectBrowser($request->userAgent()),
        ]);
    }

    protected static function detectDeviceType(?string $userAgent): ?string
    {
        if (!$userAgent) return null;

        if (preg_match('/mobile/i', $userAgent)) return 'mobile';
        if (preg_match('/tablet/i', $userAgent)) return 'tablet';
        return 'desktop';
    }

    protected static function detectBrowser(?string $userAgent): ?string
    {
        if (!$userAgent) return null;

        if (preg_match('/Chrome/i', $userAgent)) return 'Chrome';
        if (preg_match('/Safari/i', $userAgent)) return 'Safari';
        if (preg_match('/Firefox/i', $userAgent)) return 'Firefox';
        if (preg_match('/Edge/i', $userAgent)) return 'Edge';
        if (preg_match('/Opera/i', $userAgent)) return 'Opera';

        return 'Other';
    }
}
