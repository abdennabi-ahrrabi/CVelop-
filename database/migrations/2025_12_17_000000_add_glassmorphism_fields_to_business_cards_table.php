<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('business_cards', function (Blueprint $table) {
            // Glassmorphism settings
            $table->string('glass_blur')->default('12');
            $table->string('glass_opacity')->default('0.15');
            $table->boolean('glass_border')->default(true);

            // Advanced typography
            $table->string('font_family')->default('inter');
            $table->string('font_weight_heading')->default('700');
            $table->string('font_weight_body')->default('400');

            // Border & Shadow
            $table->string('border_radius')->default('24');
            $table->string('border_width')->default('1');
            $table->string('border_opacity')->default('0.2');
            $table->string('shadow_intensity')->default('medium');

            // Animation settings
            $table->string('animation_style')->default('none');
            $table->string('hover_effect')->default('lift');

            // Auto-contrast
            $table->boolean('auto_contrast')->default(true);

            // Additional accent color
            $table->string('color_accent')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('business_cards', function (Blueprint $table) {
            $table->dropColumn([
                'glass_blur',
                'glass_opacity',
                'glass_border',
                'font_family',
                'font_weight_heading',
                'font_weight_body',
                'border_radius',
                'border_width',
                'border_opacity',
                'shadow_intensity',
                'animation_style',
                'hover_effect',
                'auto_contrast',
                'color_accent',
            ]);
        });
    }
};
