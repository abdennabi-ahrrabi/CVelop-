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
        // Add index on resumes.template_id (missing from original migration)
        Schema::table('resumes', function (Blueprint $table) {
            $table->index('template_id');
        });

        // Add indexes on commonly queried template fields
        Schema::table('templates', function (Blueprint $table) {
            $table->index('is_active');
            $table->index('is_public');
            $table->index(['is_active', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resumes', function (Blueprint $table) {
            $table->dropIndex(['template_id']);
        });

        Schema::table('templates', function (Blueprint $table) {
            $table->dropIndex(['is_active']);
            $table->dropIndex(['is_public']);
            $table->dropIndex(['is_active', 'sort_order']);
        });
    }
};
