<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_home', function (Blueprint $table) {
            $table->id();

            // Hero section
            $table->text('hero_label')->nullable();
            $table->text('hero_title')->nullable();
            $table->text('hero_highlighted')->nullable();
            $table->text('hero_description')->nullable();
            $table->text('hero_cta_primary')->nullable();
            $table->text('hero_cta_primary_route')->nullable();
            $table->text('hero_cta_secondary')->nullable();
            $table->text('hero_cta_secondary_route')->nullable();

            // Stats band
            $table->json('stats')->nullable();

            // Features section
            $table->json('features')->nullable();

            // Footer CTA
            $table->text('footer_cta_title')->nullable();
            $table->text('footer_cta_button')->nullable();
            $table->text('footer_cta_route')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_home');
    }
};
