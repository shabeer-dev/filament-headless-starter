<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PreventRequestsDuringMaintenance extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @return mixed
     *
     * @throws HttpException
     */
    public function handle($request, Closure $next)
    {
        // Bypass maintenance mode for the admin domain
        $adminDomain = env('FILAMENT_DOMAIN', 'admin.'.parse_url(config('app.url'), PHP_URL_HOST));

        if ($request->getHost() === $adminDomain) {
            return $next($request);
        }

        return parent::handle($request, $next);
    }
}
