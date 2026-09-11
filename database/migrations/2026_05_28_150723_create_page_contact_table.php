<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_contact', function (Blueprint $table) {
            $table->id();

            // Hero
            $table->text('hero_label')->nullable();
            $table->text('hero_title')->nullable();
            $table->text('hero_highlighted')->nullable();
            $table->text('hero_description')->nullable();
            $table->text('hero_cta_primary')->nullable();
            $table->text('hero_cta_primary_route')->nullable();
            $table->text('hero_cta_secondary')->nullable();
            $table->text('hero_cta_secondary_route')->nullable();

            // Form section
            $table->text('form_headline')->nullable();

            // Contact details
            $table->text('contact_email')->nullable();
            $table->text('contact_phone')->nullable();
            $table->text('contact_address')->nullable();
            $table->text('business_hours')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_contact');
    }
};
