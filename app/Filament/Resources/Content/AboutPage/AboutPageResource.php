<?php

namespace App\Filament\Resources\Content\AboutPage;

use App\Filament\Helpers\FormFields;
use App\Filament\Resources\SingletonResource;
use App\Models\Content\PageAbout;
use Filament\Forms;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Happenv\FilamentTranslatable\Forms\Component\Translations;

class AboutPageResource extends SingletonResource
{
    protected static ?string $model = PageAbout::class;

    protected static ?int $navigationSort = 2;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-information-circle';

    protected static string|\UnitEnum|null $navigationGroup = 'Pages';

    protected static ?string $modelLabel = 'About Page';

    protected static ?string $pluralModelLabel = 'About';

    protected static ?string $slug = 'pages/about';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Translations::make('translations')->columnSpanFull()
                    ->schema([
                        Tabs::make('Tabs')
                            ->tabs([
                                FormFields::heroSectionTab(),
                                Tab::make('Our Story')
                                    ->schema([
                                        TextInput::make('story_title')->label('Heading')->columnSpanFull(),
                                        Forms\Components\Textarea::make('story_description')->label('Description')->rows(5)->columnSpanFull(),
                                    ])->columns(2),
                                Tab::make('Core Values')
                                    ->schema([
                                        Repeater::make('core_values')
                                            ->label('Core Values')
                                            ->collapsed()
                                            ->cloneable()
                                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                                            ->schema([
                                                TextInput::make('title')->label('Title')->required(),
                                                Forms\Components\Textarea::make('description')->label('Description')->rows(2)->required(),
                                            ])
                                            ->columns(2)
                                            ->columnSpanFull(),
                                    ]),
                                Tab::make('Milestones')
                                    ->schema([
                                        Repeater::make('milestones')
                                            ->label('Timeline Milestones')
                                            ->cloneable()
                                            ->collapsed()
                                            ->itemLabel(fn (array $state): ?string => ($state['year'] ?? '').' - '.($state['title'] ?? ''))
                                            ->schema([
                                                TextInput::make('year')->label('Year / Version')->required(),
                                                TextInput::make('title')->label('Title')->required(),
                                                Forms\Components\Textarea::make('description')->label('Description')->rows(2)->required()->columnSpanFull(),
                                            ])->columns(2)
                                            ->columnSpanFull(),
                                    ]),
                                FormFields::footerCtaTab(),
                            ])
                            ->columnSpanFull(),
                    ]),
                FormFields::seoSection(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageAboutPage::route('/'),
        ];
    }
}
