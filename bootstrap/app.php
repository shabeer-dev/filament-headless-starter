<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\PreventRequestsDuringMaintenance;
use App\Http\Middleware\SecurityHeaders;
use App\Http\Middleware\SetLocale;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->replace(
            Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance::class,
            PreventRequestsDuringMaintenance::class
        );

        $middleware->preventRequestsDuringMaintenance(except: [
            'contact/submit',
        ]);

        $middleware->web(append: [
            SetLocale::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            SecurityHeaders::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            // Always render 503 via Inertia (even in local dev) since it's not a code error
            if ($response->getStatusCode() === 503) {
                return Inertia::render('Error', [
                    'status' => $response->getStatusCode(),
                    'support' => config('app.support'),
                ])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            }

            if (! app()->environment(['local', 'testing']) && in_array($response->getStatusCode(), [500, 404, 403])) {
                return Inertia::render('Error', [
                    'status' => $response->getStatusCode(),
                    'support' => config('app.support'),
                ])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            } elseif (in_array($response->getStatusCode(), [404, 403])) {
                return Inertia::render('Error', [
                    'status' => $response->getStatusCode(),
                    'support' => config('app.support'),
                ])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            }

            return $response;
        });
    })->create();
