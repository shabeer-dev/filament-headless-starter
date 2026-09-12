<?php

namespace App\Console\Commands;

use App\Models\Content\PageAbout;
use App\Models\Content\PageContact;
use App\Models\Content\PageHome;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.xml file for all locales';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating sitemap...');

        $sitemap = Sitemap::create();
        $locales = config('app.locales', ['en']);

        $routes = [
            'home' => ['priority' => 1.0, 'model' => PageHome::class],
            'about' => ['priority' => 0.8, 'model' => PageAbout::class],
            'contact' => ['priority' => 0.9, 'model' => PageContact::class],
            'articles.index' => ['priority' => 0.8, 'model' => null],
        ];

        // Cache the model instances
        $models = [];
        foreach ($routes as $routeName => $data) {
            $models[$routeName] = $data['model'] ? $data['model']::first() : null;
        }

        foreach ($locales as $locale) {
            foreach ($routes as $routeName => $data) {
                $url = route($routeName, ['locale' => $locale]);

                $urlTag = Url::create($url)
                    ->setPriority($data['priority'])
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY);

                $model = $models[$routeName];
                if ($model) {
                    $mediaItems = $model->getMedia('hero');
                    if ($mediaItems->isEmpty()) {
                        $mediaItems = $model->getMedia('overview');
                    }
                    if ($mediaItems->isEmpty()) {
                        $mediaItems = $model->getMedia(); // fallback to any media
                    }

                    foreach ($mediaItems as $media) {
                        $caption = $model->hero_title ?? $model->overview_title ?? config('app.name');
                        if (is_array($caption)) {
                            // If it's a translatable array, get the current locale or fallback
                            $caption = $caption[$locale] ?? reset($caption);
                        }
                        $urlTag->addImage($media->getUrl(), $caption);
                    }
                }

                $sitemap->add($urlTag);
            }
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully at public/sitemap.xml');
    }
}
