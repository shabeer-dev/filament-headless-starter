<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Spatie\Honeypot\Honeypot;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = app()->getLocale();
        $translationsPath = base_path("lang/{$locale}.json");

        $translations = file_exists($translationsPath)
            ? json_decode(file_get_contents($translationsPath), true)
            : [];

        $supportedLocales = config('app.locales', ['en', 'ar', 'es']);
        $alternateUrls = [];

        $route = $request->route();
        if ($route && $route->getName()) {
            foreach ($supportedLocales as $supLocale) {
                try {
                    $params = $route->parameters();
                    $params['locale'] = $supLocale;
                    $url = route($route->getName(), $params);
                    if (! str_contains($url, '?locale=')) {
                        $alternateUrls[$supLocale] = $url;
                    }
                } catch (\Exception $e) {
                    // Ignore route generation errors
                }
            }
        }

        return [
            ...parent::share($request),
            'appName' => config('app.name', 'Headless Starter'),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => $locale,
            'supportedLocales' => $supportedLocales,
            'translations' => $translations,
            'honeypot' => app(Honeypot::class)->toArray(),
            'support' => config('app.support', [
                'email' => 'support@example.com',
                'phone' => '+1 (555) 000-0000',
            ]),
            'appUrl' => config('app.url'),
            'currentUrl' => $request->url(),
            'currentPath' => $request->path(),
            'alternateUrls' => $alternateUrls,
            'turnstileSiteKey' => config('turnstile.site_key'),
        ];
    }
}
