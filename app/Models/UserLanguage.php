<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserLanguage extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'language',
        'proficiency',
        'is_visible',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_visible' => 'boolean',
        ];
    }

    public const PROFICIENCY_LEVELS = [
        'native' => 'Native',
        'fluent' => 'Fluent',
        'advanced' => 'Advanced',
        'intermediate' => 'Intermediate',
        'basic' => 'Basic',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')
            ->orderByRaw("CASE proficiency
                WHEN 'native' THEN 1
                WHEN 'fluent' THEN 2
                WHEN 'advanced' THEN 3
                WHEN 'intermediate' THEN 4
                WHEN 'basic' THEN 5
                ELSE 6 END");
    }

    public function getProficiencyLabel(): string
    {
        return self::PROFICIENCY_LEVELS[$this->proficiency] ?? $this->proficiency;
    }
}
