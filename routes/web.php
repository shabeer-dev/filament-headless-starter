<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Page;
use Illuminate\Support\Facades\Route;
use Spatie\Honeypot\ProtectAgainstSpam;

Route::get('/robots.txt', function () {
    $content = "User-agent: *\n";
    if (app()->isProduction()) {
        $content .= "Allow: /\n";
        $content .= 'Sitemap: '.url('/sitemap.xml')."\n";
    } else {
        $content .= "Disallow: /\n";
    }

    return response($content, 200)->header('Content-Type', 'text/plain');
});

Route::post('/contact/submit', [ContactController::class, 'submit'])
    ->middleware([ProtectAgainstSpam::class, 'throttle:5,1'])
    ->name('contact.submit');

Route::get('/', function () {
    return redirect()->route('home', ['locale' => 'en']);
});

Route::prefix('{locale}')->where(['locale' => '[a-zA-Z]{2}'])->group(function () {
    Route::get('/', Page\HomeController::class)->name('home');
    Route::get('/about', Page\AboutController::class)->name('about');
    Route::get('/contact', Page\ContactController::class)->name('contact');

    // Example Collection: Articles / Blog
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/articles/{slug}', [ArticleController::class, 'show'])->name('articles.show');

    // Legal & Information Pages
    Route::inertia('/privacy-policy', 'Legal/PrivacyPolicy')->name('legal.privacy');
    Route::inertia('/terms-of-service', 'Legal/TermsOfService')->name('legal.terms');
    Route::inertia('/sitemap', 'Sitemap')->name('sitemap');
});

Route::fallback(function () {
    $path = request()->path();
    $segment = request()->segment(1);

    if ($segment && preg_match('/^[a-zA-Z]{2}$/', $segment)) {
        abort(404);
    }

    $locales = config('app.locales', ['en', 'ar', 'es']);
    $preferredLocale = request()->getPreferredLanguage($locales);

    return redirect("/{$preferredLocale}/".ltrim($path, '/'), 301);
});
