<?php

namespace App\Filament\Resources\Content\ContactPage;

use App\Filament\Helpers\FormFields;
use App\Filament\Resources\SingletonResource;
use App\Models\Content\PageContact;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Happenv\FilamentTranslatable\Forms\Component\Translations;

class ContactPageResource extends SingletonResource
{
    protected static ?string $model = PageContact::class;

    protected static ?int $navigationSort = 3;

    protected static ?string $pluralModelLabel = 'Contact';

    protected static ?string $modelLabel = 'Contact Page';

    protected static ?string $slug = 'pages/contact';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-phone';

    protected static string|\UnitEnum|null $navigationGroup = 'Pages';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Translations::make('translations')->columnSpanFull()
                    ->schema([
                        Tabs::make('Tabs')->tabs([
                            FormFields::heroSectionTab(),
                            Tab::make('Contact Details')->schema([
                                TextInput::make('form_headline')->label('Form Headline')->columnSpanFull(),
                                TextInput::make('contact_email')->label('Email Address')->email(),
                                TextInput::make('contact_phone')->label('Phone Number'),
                                TextInput::make('business_hours')->label('Operating Hours')->columnSpanFull(),
                                Textarea::make('contact_address')->label('Physical Address')->rows(3)->columnSpanFull(),
                            ])->columns(2),
                        ])->columnSpanFull(),
                    ]),
                FormFields::seoSection(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageContactPage::route('/'),
        ];
    }
}
