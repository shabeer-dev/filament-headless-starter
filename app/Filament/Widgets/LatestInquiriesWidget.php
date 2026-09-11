<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Inquiries\InquiryResource;
use App\Models\Inquiry;
use Filament\Actions\ViewAction;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestInquiriesWidget extends BaseWidget
{
    protected static ?int $sort = 2;

    public function table(Table $table): Table
    {
        return $table
            ->poll('10s')
            ->query(
                Inquiry::query()->where('is_read', false)->latest()->limit(5)
            )
            ->columns([
                TextColumn::make('name')
                    ->description(fn (Inquiry $record) => $record->company),
                TextColumn::make('created_at')
                    ->label('Received')
                    ->since()
                    ->alignEnd()
                    ->tooltip(fn ($state) => $state?->format('F j, Y g:i A')),
            ])
            ->recordAction('view')
            ->paginated(false)
            ->actions([
                ViewAction::make()
                    ->extraAttributes(['style' => 'display: none;'])
                    ->infolist(fn (Schema $schema) => InquiryResource::infolist($schema))
                    ->mutateRecordDataUsing(function (array $data, Inquiry $record): array {
                        if (! $record->is_read) {
                            $record->update(['is_read' => true]);
                        }

                        return $data;
                    }),
            ])
            ->recordClasses(fn (Inquiry $record) => ! $record->is_read ? 'bg-unread-row' : null);
    }
}
