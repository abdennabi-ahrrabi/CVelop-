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
        Schema::table('templates', function (Blueprint $table) {
            $table->boolean('is_custom')->default(false)->after('is_active');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('cascade')->after('is_custom');
            $table->json('layout_structure')->nullable()->after('colors');
            $table->json('component_config')->nullable()->after('layout_structure');
            $table->boolean('is_public')->default(false)->after('is_premium');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('templates', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropColumn(['is_custom', 'created_by', 'layout_structure', 'component_config', 'is_public']);
        });
    }
};
