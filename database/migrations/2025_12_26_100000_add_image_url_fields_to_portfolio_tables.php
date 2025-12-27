<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Adds image_url fields to allow external image URLs as alternative to file uploads.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('image_url')->nullable()->after('image');
        });

        Schema::table('client_logos', function (Blueprint $table) {
            $table->string('logo_url')->nullable()->after('logo');
            // Make logo nullable since we can now use logo_url instead
            $table->string('logo')->nullable()->change();
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->string('client_avatar_url')->nullable()->after('client_avatar');
        });

        Schema::table('certifications', function (Blueprint $table) {
            $table->string('badge_image_url')->nullable()->after('badge_image');
        });

        Schema::table('awards', function (Blueprint $table) {
            $table->string('image_url')->nullable()->after('image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('image_url');
        });

        Schema::table('client_logos', function (Blueprint $table) {
            $table->dropColumn('logo_url');
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropColumn('client_avatar_url');
        });

        Schema::table('certifications', function (Blueprint $table) {
            $table->dropColumn('badge_image_url');
        });

        Schema::table('awards', function (Blueprint $table) {
            $table->dropColumn('image_url');
        });
    }
};
