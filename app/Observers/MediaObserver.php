<?php

namespace App\Observers;

use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaObserver
{
    /**
     * Handle the Media "saved" event.
     */
    public function saved(Media $media): void
    {
        $this->touchParent($media);
    }

    /**
     * Handle the Media "deleted" event.
     */
    public function deleted(Media $media): void
    {
        $this->touchParent($media);
    }

    /**
     * Touch the parent model to trigger its updated event.
     */
    protected function touchParent(Media $media): void
    {
        if ($media->model) {
            $media->model->touch();
        }
    }
}
