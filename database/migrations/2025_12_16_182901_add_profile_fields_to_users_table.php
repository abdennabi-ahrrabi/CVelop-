<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique()->nullable()->after('name');
            $table->string('headline')->nullable()->after('username');
            $table->text('bio')->nullable()->after('headline');
            $table->string('avatar')->nullable()->after('bio');
            $table->string('cover_image')->nullable()->after('avatar');
            $table->string('location')->nullable()->after('cover_image');
            $table->string('phone')->nullable()->after('location');
            $table->string('website')->nullable()->after('phone');

            // Social links
            $table->string('linkedin_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('tiktok_url')->nullable();
            $table->string('dribbble_url')->nullable();
            $table->string('behance_url')->nullable();

            // Profile settings
            $table->boolean('is_public')->default(true);
            $table->boolean('show_email')->default(false);
            $table->boolean('show_phone')->default(false);
            $table->string('theme')->default('default');
            $table->json('custom_links')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'username', 'headline', 'bio', 'avatar', 'cover_image',
                'location', 'phone', 'website',
                'linkedin_url', 'twitter_url', 'github_url', 'instagram_url',
                'facebook_url', 'youtube_url', 'tiktok_url', 'dribbble_url', 'behance_url',
                'is_public', 'show_email', 'show_phone', 'theme', 'custom_links'
            ]);
        });
    }
};
