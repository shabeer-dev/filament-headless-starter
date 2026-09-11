<?php

namespace App\Filament\Widgets;

use App\Models\Inquiry;
use Filament\Widgets\ChartWidget;
use Flowframe\Trend\Trend;
use Flowframe\Trend\TrendValue;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

class InquiriesChartWidget extends ChartWidget
{
    protected ?string $heading = 'Inquiries Over Time';

    protected static ?int $sort = 4;

    protected function getData(): array
    {
        $data = Cache::remember('stats.inquiries_chart', 300, function () {
            return Trend::model(Inquiry::class)
                ->between(
                    start: now()->subMonths(11)->startOfMonth(),
                    end: now()->endOfMonth(),
                )
                ->perMonth()
                ->count()
                ->map(fn (TrendValue $value) => [
                    'date' => Carbon::parse($value->date)->format('M Y'),
                    'aggregate' => $value->aggregate,
                ])
                ->toArray();
        });

        return [
            'datasets' => [
                [
                    'label' => 'New Inquiries',
                    'data' => array_column($data, 'aggregate'),
                    'backgroundColor' => '#c9a84c',
                    'borderColor' => '#c9a84c',
                ],
            ],
            'labels' => array_column($data, 'date'),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
