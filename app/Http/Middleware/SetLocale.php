<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->segment(1);

        $supportedLocales = ['en', 'ar', 'es']; // Could be moved to config

        if (in_array($locale, $supportedLocales)) {
            app()->setLocale($locale);
            URL::defaults(['locale' => $locale]);
        } else {
            // Default to 'en' if not set or invalid
            app()->setLocale('en');
            URL::defaults(['locale' => 'en']);
        }

        return $next($request);
    }
}
