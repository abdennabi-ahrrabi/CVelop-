<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('availability_status', ['available', 'open_to_work', 'freelance', 'employed', 'not_available'])->nullable()->after('portfolio_template');
            $table->string('availability_text')->nullable()->after('availability_status');
            $table->unsignedInteger('years_of_experience')->nullable()->after('availability_text');
            $table->unsignedInteger('projects_completed')->nullable()->after('years_of_experience');
            $table->unsignedInteger('clients_served')->nullable()->after('projects_completed');
            $table->string('video_intro_url')->nullable()->after('clients_served');
            $table->json('skills_with_levels')->nullable()->after('video_intro_url');
            $table->boolean('show_testimonials')->default(true)->after('show_social_links');
            $table->boolean('show_services')->default(true)->after('show_testimonials');
            $table->boolean('show_certifications')->default(true)->after('show_services');
            $table->boolean('show_awards')->default(true)->after('show_certifications');
            $table->boolean('show_clients')->default(true)->after('show_awards');
            $table->boolean('show_languages')->default(true)->after('show_clients');
            $table->boolean('show_stats')->default(true)->after('show_languages');
            $table->boolean('show_availability')->default(true)->after('show_stats');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'availability_status',
                'availability_text',
                'years_of_experience',
                'projects_completed',
                'clients_served',
                'video_intro_url',
                'skills_with_levels',
                'show_testimonials',
                'show_services',
                'show_certifications',
                'show_awards',
                'show_clients',
                'show_languages',
                'show_stats',
                'show_availability',
            ]);
        });
    }
};
