<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'icon',
        'price_from',
        'price_to',
        'price_unit',
        'features',
        'is_visible',
        'is_featured',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_visible' => 'boolean',
            'is_featured' => 'boolean',
            'price_from' => 'decimal:2',
            'price_to' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }

    public function getPriceDisplay(): ?string
    {
        if (!$this->price_from) {
            return null;
        }

        if ($this->price_to && $this->price_to !== $this->price_from) {
            return '$' . number_format($this->price_from) . ' - $' . number_format($this->price_to);
        }

        $price = '$' . number_format($this->price_from);
        if ($this->price_unit) {
            $price .= '/' . $this->price_unit;
        }

        return $price;
    }
}
