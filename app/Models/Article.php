<?php

namespace App\Models;

use App\Models\Concerns\HasSEO;
use App\Models\Concerns\InteractsWithOptimizedMedia;
use App\Models\Concerns\SerializesLocalizedStrings;
use App\Observers\ContentObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\Translatable\HasTranslations;

#[ObservedBy(ContentObserver::class)]
class Article extends Model implements HasMedia
{
    use HasSEO;
    use HasTranslations, InteractsWithOptimizedMedia;
    use SerializesLocalizedStrings;

    protected $table = 'articles';

    protected $guarded = [];

    public array $translatable = [
        'title',
        'excerpt',
        'content',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->where(function ($q) {
                $q->whereNull('published_at')->orWhere('published_at', '<=', now());
            });
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('featured_image')->singleFile();
    }
}
