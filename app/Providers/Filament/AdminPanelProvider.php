<?php

namespace App\Providers\Filament;

use App\Filament\Widgets\InquiryStatsWidget;
use App\Filament\Widgets\LatestInquiriesWidget;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationGroup;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\View\PanelsRenderHook;
use Guava\IconPicker\IconPickerPlugin;
use Happenv\FilamentTranslatable\FilamentTranslatablePlugin;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Blade;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->renderHook(
                PanelsRenderHook::HEAD_END,
                fn (): string => Blade::render('<style>
                    ::-webkit-scrollbar { width: 8px; height: 8px; }
                    ::-webkit-scrollbar-track { background: transparent; }
                    ::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.5); border-radius: 4px; }
                    .dark ::-webkit-scrollbar-thumb { background: rgba(75, 85, 99, 0.5); }
                    .bg-unread-row > td { background-color: rgba(16, 185, 129, 0.05) !important; }
                    .dark .bg-unread-row > td { background-color: rgba(16, 185, 129, 0.15) !important; }
                </style>')
            )
            ->default()
            ->id('admin')
            ->path(env('FILAMENT_PATH', 'admin'))
            ->login()
            ->profile()
            ->brandName('Headless Starter')
            ->colors([
                'primary' => Color::Amber,
            ])
            ->darkMode()
            ->navigationGroups([
                NavigationGroup::make('Content'),
                NavigationGroup::make('Pages'),
                NavigationGroup::make('Activity'),
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                InquiryStatsWidget::class,
                LatestInquiriesWidget::class,
            ])
            ->plugins([
                FilamentTranslatablePlugin::make()
                    ->locales(config('app.locales', ['en', 'ar', 'es'])),
                IconPickerPlugin::make(),
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
