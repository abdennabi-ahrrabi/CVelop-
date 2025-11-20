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
        Schema::create('template_customizations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resume_id')->constrained()->onDelete('cascade');

            // Color customizations
            $table->string('primary_color')->default('#3498DB');
            $table->string('secondary_color')->default('#2C3E50');
            $table->string('accent_color')->default('#1A2332');
            $table->string('text_color')->default('#2C3E50');
            $table->string('background_color')->default('#FFFFFF');
            $table->string('sidebar_bg_color')->nullable();

            // Typography
            $table->string('font_family')->default('DejaVu Serif');
            $table->integer('font_size')->default(10);
            $table->decimal('line_height', 3, 2)->default(1.5);

            // Spacing
            $table->integer('page_padding')->default(30);
            $table->integer('section_spacing')->default(25);
            $table->integer('item_spacing')->default(15);

            // Layout options
            $table->enum('layout_type', ['single_column', 'two_column'])->default('two_column');
            $table->integer('sidebar_width')->default(35); // percentage

            // Section visibility
            $table->boolean('show_photo')->default(true);
            $table->boolean('show_summary')->default(true);
            $table->boolean('show_skills')->default(true);
            $table->boolean('show_experience')->default(true);
            $table->boolean('show_education')->default(true);
            $table->boolean('show_contact')->default(true);

            // Border and styling
            $table->integer('border_radius')->default(4);
            $table->integer('border_width')->default(2);

            // Advanced options
            $table->json('custom_css')->nullable();
            $table->string('preset_theme')->nullable();

            $table->timestamps();

            // Ensure one customization per resume
            $table->unique('resume_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_customizations');
    }
};
