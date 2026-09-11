<?php

namespace App\Filament\Resources\Content\HomePage;

use App\Filament\Helpers\FormFields;
use App\Filament\Resources\SingletonResource;
use App\Models\Content\PageHome;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Happenv\FilamentTranslatable\Forms\Component\Translations;

class HomePageResource extends SingletonResource
{
    protected static ?string $model = PageHome::class;

    protected static ?int $navigationSort = 1;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-home';

    protected static string|\UnitEnum|null $navigationGroup = 'Pages';

    protected static ?string $modelLabel = 'Home Page';

    protected static ?string $pluralModelLabel = 'Home';

    protected static ?string $slug = 'pages/home';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Translations::make('translations')->columnSpanFull()
                    ->schema([
                        Tabs::make('Tabs')
                            ->tabs([
                                FormFields::heroSectionTab(),
                                Tab::make('Stats Band')
                                    ->schema([
                                        Forms\Components\Repeater::make('stats')
                                            ->label('Key Metrics')
                                            ->collapsed()
                                            ->cloneable()
                                            ->itemLabel(fn (array $state): ?string => $state['label'] ?? null)
                                            ->schema([
                                                TextInput::make('label')->label('Title')->required(),
                                                TextInput::make('value')->label('Value')->default('0')->required(),
                                                TextInput::make('suffix')->label('Suffix (e.g. %, +)'),
                                            ])
                                            ->columns(3),
                                    ]),
                                Tab::make('Features')
                                    ->schema([
                                        Forms\Components\Repeater::make('features')
                                            ->label('Features Grid')
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
            'index' => Pages\ManageHomePage::route('/'),
        ];
    }
}
