<?php

namespace App\Observers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ContentObserver
{
    /**
     * Clear cache for the given model.
     */
    protected function clearCache($model)
    {
        $className = class_basename($model);
        // e.g. PageHome -> page_home_content
        $key = Str::snake($className).'_content';
        foreach (config('app.locales', ['en', 'ar']) as $locale) {
            Cache::forget($key.'_'.$locale);
        }
    }

    public function saving($model): void
    {
        // Prevent Filament Translatable or dehydrated forms from trying to save these obsolete media columns to the database
        $obsoleteMediaColumns = ['hero', 'story', 'intro', 'trust', 'overview', 'footer_cta_bg'];
        foreach ($obsoleteMediaColumns as $column) {
            if (array_key_exists($column, $model->getAttributes())) {
                unset($model->{$column});
            }
        }
    }

    public function created($model): void
    {
        $this->clearCache($model);
    }

    public function updated($model): void
    {
        $this->clearCache($model);
    }

    public function deleted($model): void
    {
        $this->clearCache($model);
    }

    public function restored($model): void
    {
        $this->clearCache($model);
    }

    public function forceDeleted($model): void
    {
        $this->clearCache($model);
    }
}
