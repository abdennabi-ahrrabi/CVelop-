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
        Schema::table('users', function (Blueprint $table) {
            // Section visibility toggles
            $table->boolean('show_projects')->default(true)->after('show_phone');
            $table->boolean('show_resumes')->default(true)->after('show_projects');
            $table->boolean('show_business_card')->default(true)->after('show_resumes');
            $table->boolean('show_contact_form')->default(true)->after('show_business_card');
            $table->boolean('show_social_links')->default(true)->after('show_contact_form');

            // Profile layout/theme settings
            $table->string('profile_layout', 50)->default('default')->after('theme');
            $table->json('profile_colors')->nullable()->after('profile_layout');

            // SEO and meta
            $table->string('meta_title')->nullable()->after('profile_colors');
            $table->text('meta_description')->nullable()->after('meta_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'show_projects',
                'show_resumes',
                'show_business_card',
                'show_contact_form',
                'show_social_links',
                'profile_layout',
                'profile_colors',
                'meta_title',
                'meta_description',
            ]);
        });
    }
};
