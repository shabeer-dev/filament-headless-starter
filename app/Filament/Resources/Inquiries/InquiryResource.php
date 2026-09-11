<?php

namespace App\Filament\Resources\Inquiries;

use App\Filament\Resources\Inquiries\Pages\ManageInquiries;
use App\Models\Inquiry;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class InquiryResource extends Resource
{
    protected static ?string $model = Inquiry::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-envelope';

    protected static ?int $navigationSort = 1;

    protected static string|\UnitEnum|null $navigationGroup = 'Activity';

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('is_read', false)->count() ?: null;
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit(Model $record): bool
    {
        return false;
    }

    public static function canDelete(Model $record): bool
    {
        return false;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Inquiry Details')
                    ->description('Read-only details submitted by the user.')
                    ->schema([
                        TextInput::make('name')
                            ->required(),
                        TextInput::make('company'),
                        TextInput::make('email')
                            ->label('Email address')
                            ->email()
                            ->required(),
                        TextInput::make('phone')
                            ->tel(),
                        TextInput::make('country'),
                        TextInput::make('segment'),
                        Textarea::make('message')
                            ->required()
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Inquiry Details')
                    ->description('Read-only details submitted by the user.')
                    ->schema([
                        TextEntry::make('name'),
                        TextEntry::make('company')
                            ->placeholder('-'),
                        TextEntry::make('email')
                            ->label('Email address'),
                        TextEntry::make('phone')
                            ->placeholder('-'),
                        TextEntry::make('country')
                            ->placeholder('-'),
                        TextEntry::make('segment')
                            ->placeholder('-'),
                        TextEntry::make('message')
                            ->columnSpanFull(),
                        TextEntry::make('created_at')
                            ->label('Received')
                            ->dateTime('F j, Y, g:i A')
                            ->placeholder('-'),
                        TextEntry::make('updated_at')
                            ->dateTime()
                            ->placeholder('-'),
                    ])->columns(2)
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('company')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email address')
                    ->searchable(),
                TextColumn::make('phone')
                    ->searchable(),
                TextColumn::make('country')
                    ->searchable(),
                TextColumn::make('segment')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->label('Received')
                    ->since()
                    ->sortable()
                    ->tooltip(fn ($state) => $state?->format('F j, Y g:i A'))
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->recordClasses(fn (Inquiry $record) => ! $record->is_read ? 'bg-unread-row' : null)
            ->filters([
                //
            ])
            ->recordAction('view')
            ->actions([
                ViewAction::make()
                    ->extraAttributes(['style' => 'display: none;'])
                    ->mutateRecordDataUsing(function (array $data, Inquiry $record): array {
                        if (! $record->is_read) {
                            $record->update(['is_read' => true]);
                        }

                        return $data;
                    }),
            ])
            ->toolbarActions([
                // BulkActionGroup::make([
                //     //
                // ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageInquiries::route('/'),
        ];
    }
}
