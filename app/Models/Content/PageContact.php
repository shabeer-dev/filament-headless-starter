<?php

namespace App\Models\Content;

use App\Models\Concerns\HasSEO;
use App\Models\Concerns\InteractsWithOptimizedMedia;
use App\Models\Concerns\SerializesLocalizedStrings;
use App\Observers\ContentObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\Translatable\HasTranslations;

#[ObservedBy(ContentObserver::class)]
class PageContact extends Model implements HasMedia
{
    use HasSEO;
    use HasTranslations, InteractsWithOptimizedMedia;
    use SerializesLocalizedStrings;

    protected $table = 'page_contact';

    protected $guarded = [];

    public array $translatable = [
        'hero_label',
        'hero_title',
        'hero_highlighted',
        'hero_description',
        'hero_cta_primary',
        'hero_cta_primary_route',
        'hero_cta_secondary',
        'hero_cta_secondary_route',
        'form_headline',
        'contact_email',
        'contact_phone',
        'contact_address',
        'business_hours',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('hero')->singleFile();
    }
}
