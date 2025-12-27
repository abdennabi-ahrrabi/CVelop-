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
            $table->foreignId('featured_resume_id')->nullable()->constrained('resumes')->nullOnDelete();
            $table->foreignId('featured_business_card_id')->nullable()->constrained('business_cards')->nullOnDelete();
            $table->string('portfolio_template')->default('modern');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['featured_resume_id']);
            $table->dropForeign(['featured_business_card_id']);
            $table->dropColumn(['featured_resume_id', 'featured_business_card_id', 'portfolio_template']);
        });
    }
};
