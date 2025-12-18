<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profile_views', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('business_card_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('resume_id')->nullable()->constrained()->onDelete('cascade');

            // What was viewed
            $table->enum('view_type', ['profile', 'card', 'resume', 'portfolio']);

            // Viewer info
            $table->foreignId('viewer_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('referrer')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('device_type')->nullable();
            $table->string('browser')->nullable();

            // Source tracking
            $table->enum('source', ['direct', 'qr_code', 'link', 'social', 'search', 'other'])->default('direct');
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();

            $table->timestamps();

            $table->index(['user_id', 'view_type', 'created_at']);
            $table->index(['business_card_id', 'created_at']);
            $table->index(['resume_id', 'created_at']);
        });

        // Link clicks tracking
        Schema::create('link_clicks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('business_card_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('link_type'); // email, phone, website, linkedin, etc.
            $table->string('link_url');
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'link_type', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('link_clicks');
        Schema::dropIfExists('profile_views');
    }
};
