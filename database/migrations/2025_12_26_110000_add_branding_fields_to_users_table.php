<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Adds logo and URL alternatives for portfolio branding images.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Personal/Business logo
            $table->string('logo')->nullable()->after('avatar');
            $table->string('logo_url')->nullable()->after('logo');

            // URL alternatives for existing image fields
            $table->string('avatar_url')->nullable()->after('logo_url');
            $table->string('cover_image_url')->nullable()->after('cover_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['logo', 'logo_url', 'avatar_url', 'cover_image_url']);
        });
    }
};
