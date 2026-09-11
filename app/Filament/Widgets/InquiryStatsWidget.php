<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\ArticleResource;
use App\Filament\Resources\Inquiries\InquiryResource;
use App\Models\Article;
use App\Models\Inquiry;
use Filament\Actions\Action;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Support\Colors\Color;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class InquiryStatsWidget extends BaseWidget implements HasActions, HasForms
{
    use InteractsWithActions;
    use InteractsWithForms;

    protected int|string|array $columnSpan = 'full';

    protected function getColumns(): int
    {
        return 4;
    }

    protected function getStats(): array
    {
        $unreadCount = Cache::remember('stats.unread_inquiries', 300, fn () => Inquiry::where('is_read', false)->count());
        $newThisMonth = Cache::remember('stats.new_inquiries_month', 300, fn () => Inquiry::whereMonth('created_at', now()->month)->count());
        $totalArticles = Cache::remember('stats.total_articles', 300, fn () => Article::published()->count());

        return [
            Stat::make('Unread Inquiries', $unreadCount)
                ->description('Requires response')
                ->descriptionIcon('heroicon-m-bell-alert')
                ->color(Color::Orange)
                ->url(InquiryResource::getUrl()),
            Stat::make('New This Month', $newThisMonth)
                ->description('Inquiries received this month')
                ->descriptionIcon('heroicon-m-calendar')
                ->color(Color::Blue)
                ->url(InquiryResource::getUrl()),
            Stat::make('Published Articles', $totalArticles)
                ->description('Active blog & news items')
                ->descriptionIcon('heroicon-m-document-text')
                ->color(Color::Emerald)
                ->url(ArticleResource::getUrl()),
            Stat::make('Site Status', fn () => app()->isDownForMaintenance() ? 'Maintenance' : 'Live')
                ->description('Current site status')
                ->descriptionIcon('heroicon-m-information-circle')
                ->color(app()->isDownForMaintenance() ? 'danger' : 'success')
                ->extraAttributes([
                    'class' => 'cursor-pointer stat-hover transition-colors duration-200',
                    'wire:click' => "mountAction('toggleMaintenance')",
                ]),
        ];
    }

    public function toggleMaintenanceAction(): Action
    {
        $isDown = app()->isDownForMaintenance();

        return Action::make('toggleMaintenance')
            ->label($isDown ? 'Bring Online' : 'Put Down for Maintenance')
            ->color($isDown ? 'success' : 'danger')
            ->icon($isDown ? 'heroicon-m-play' : 'heroicon-m-pause')
            ->form($isDown ? [] : [
                TextInput::make('secret')
                    ->label('Bypass Secret (Optional)')
                    ->helperText('A secret key that allows you to bypass maintenance mode.')
                    ->default(Str::uuid()->toString()),
            ])
            ->action(function (array $data) use ($isDown) {
                if ($isDown) {
                    Artisan::call('up');
                    Notification::make()
                        ->title('Site is now LIVE')
                        ->success()
                        ->send();
                } else {
                    $parameters = [];
                    if (! empty($data['secret'])) {
                        $parameters['--secret'] = $data['secret'];
                    }

                    Artisan::call('down', $parameters);

                    $message = 'Site is now in MAINTENANCE MODE.';
                    if (! empty($data['secret'])) {
                        $message .= ' Bypass URL: /'.$data['secret'];
                    }

                    Notification::make()
                        ->title($message)
                        ->warning()
                        ->duration(30000)
                        ->send();
                }
            });
    }
}
