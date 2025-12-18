<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LinkClick extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_card_id',
        'link_type',
        'link_url',
        'ip_address',
        'user_agent',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function businessCard(): BelongsTo
    {
        return $this->belongsTo(BusinessCard::class);
    }

    public static function recordClick(
        int $userId,
        string $linkType,
        string $linkUrl,
        ?int $businessCardId = null
    ): self {
        $request = request();

        return static::create([
            'user_id' => $userId,
            'business_card_id' => $businessCardId,
            'link_type' => $linkType,
            'link_url' => $linkUrl,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);
    }
}
