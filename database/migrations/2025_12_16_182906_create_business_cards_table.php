<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->boolean('is_primary')->default(false);

            // Card content
            $table->string('display_name');
            $table->string('title')->nullable();
            $table->string('company')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->string('location')->nullable();
            $table->text('tagline')->nullable();

            // Social links (can override user's defaults)
            $table->string('linkedin_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->json('custom_links')->nullable();

            // Design settings
            $table->string('template')->default('modern');
            $table->string('color_primary')->default('#8b5cf6');
            $table->string('color_secondary')->default('#6366f1');
            $table->string('color_background')->default('#0a0a0f');
            $table->string('color_text')->default('#ffffff');
            $table->string('avatar')->nullable();
            $table->string('logo')->nullable();
            $table->string('background_image')->nullable();

            // QR Code settings
            $table->string('qr_style')->default('default');
            $table->string('qr_color')->default('#8b5cf6');

            // Analytics
            $table->unsignedBigInteger('view_count')->default(0);
            $table->unsignedBigInteger('qr_scan_count')->default(0);
            $table->unsignedBigInteger('link_click_count')->default(0);

            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['user_id', 'is_primary']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_cards');
    }
};
