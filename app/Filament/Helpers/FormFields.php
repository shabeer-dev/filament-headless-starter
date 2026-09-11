<?php

namespace App\Filament\Helpers;

use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Components\Utilities\Get;
use Happenv\FilamentTranslatable\Forms\Component\Translations;

class FormFields
{
    public static function routeSelect(string $name, string $label = 'Route'): Select
    {
        return Select::make($name)->label($label)->options([
            'home' => 'Home Page',
            'about' => 'About Page',
            'contact' => 'Contact Page',
            'articles.index' => 'Articles Page',
        ])->searchable();
    }

    public static function icon(string $name = 'icon'): TextInput
    {
        return TextInput::make($name)
            ->placeholder('e.g. check_circle, star, shield')
            ->helperText('Use Material Symbols names. Browse at fonts.google.com/icons');
    }

    public static function colSpanSelect(string $name = 'col_span'): Select
    {
        return Select::make($name)->options([
            '4' => '1/3 Width (4 Cols)',
            '5' => '5/12 Width (5 Cols)',
            '6' => 'Half Width (6 Cols)',
            '7' => '7/12 Width (7 Cols)',
            '8' => '2/3 Width (8 Cols)',
            '12' => 'Full Width (12 Cols)',
        ])->default('6');
    }

    public static function bentoSpanSelect(string $name = 'span'): Select
    {
        return Select::make($name)->options([
            'small' => 'Small Square (1 Col x 1 Row)',
            'wide' => 'Wide Rectangle (2 Cols x 1 Row)',
            'tall' => 'Tall Rectangle (1 Col x 2 Rows)',
            'large' => 'Large Square (2 Cols x 2 Rows)',
        ])->default('small');
    }

    public static function themeSelect(string $name = 'theme'): Select
    {
        return Select::make($name)->options([
            'light' => 'Light',
            'steel' => 'Steel',
            'slate' => 'Slate',
            'dark' => 'Dark',
            'primary' => 'Primary',
            'transparent' => 'Transparent',
            'banner' => 'Banner',
        ])->default('light');
    }

    public static function directionSelect(string $name = 'direction'): Select
    {
        return Select::make($name)->options([
            'vertical' => 'Vertical (Standard)',
            'horizontal' => 'Horizontal (Banner)',
        ])->default('vertical');
    }

    /**
     * Standard Hero Section tab shared across all product and page resources.
     */
    public static function heroSectionTab(): Tab
    {
        return Tab::make('Hero Section')->schema([
            TextInput::make('hero_title')->label('Hero Title'),
            TextInput::make('hero_highlighted')->label('Hero Highlighted'),
            TextInput::make('hero_label')->label('Hero Label'),
            Forms\Components\Textarea::make('hero_description')->label('Hero Description')->rows(3)->columnSpanFull(),
            TextInput::make('hero_cta_primary')->label('Primary Action Text'),
            self::routeSelect('hero_cta_primary_route', 'Primary Action Route'),
            TextInput::make('hero_cta_secondary')->label('Secondary Action Text'),
            self::routeSelect('hero_cta_secondary_route', 'Secondary Action Route'),
            Forms\Components\SpatieMediaLibraryFileUpload::make('hero')
                ->disk('public')
                ->visibility('public')
                ->dehydrated(false)
                ->collection('hero')
                ->label('Hero Background (Image/Video)')
                ->helperText('Recommended size: 1920x1080px. Keep file size under 500KB.')

                ->columnSpanFull(),
        ])->columns(2);
    }

    /**
     * Standard Overview tab with right-block configuration, shared across product resources.
     */
    public static function overviewTab(): Tab
    {
        return Tab::make('Overview')->schema([
            TextInput::make('overview_title')->label('Heading'),
            TextInput::make('overview_subtitle')->label('Subtitle'),
            Forms\Components\Textarea::make('overview_description')->label('Description')->rows(3)->columnSpanFull(),
            Fieldset::make('Right Block Configuration')->schema([
                Forms\Components\Radio::make('overview_right_block_type')
                    ->label('Right Block Content Type')
                    ->options([
                        'none' => 'None',
                        'image' => 'Image',
                        'content' => 'Content',
                    ])
                    ->default('none')
                    ->inline()
                    ->reactive()
                    ->columnSpanFull(),
                TextInput::make('overview_right_block_title')
                    ->requiredIf('overview_right_block_type', 'content')
                    ->visible(fn (Get $get) => $get('overview_right_block_type')['en'] === 'content')
                    ->label('Content Title'),
                self::icon('overview_right_block_icon')
                    ->requiredIf('overview_right_block_type', 'content')
                    ->visible(fn (Get $get) => $get('overview_right_block_type')['en'] === 'content')
                    ->label('Content Icon'),
                Forms\Components\Textarea::make('overview_right_block_description')
                    ->requiredIf('overview_right_block_type', 'content')
                    ->visible(fn (Get $get) => $get('overview_right_block_type')['en'] === 'content')
                    ->label('Content Description')
                    ->rows(3)
                    ->columnSpanFull(),
                Forms\Components\SpatieMediaLibraryFileUpload::make('overview')
                    ->disk('public')
                    ->visibility('public')
                    ->dehydrated(false)
                    ->requiredIf('overview_right_block_type', 'image')
                    ->visible(fn (Get $get) => $get('overview_right_block_type')['en'] === 'image')
                    ->collection('overview')
                    ->label('Image')

                    ->columnSpanFull(),
            ])->columns(2)->columnSpanFull(),
        ])->columns(2);
    }

    /**
     * Standard Footer CTA tab shared across all resources.
     */
    public static function footerCtaTab(): Tab
    {
        return Tab::make('Footer CTA')->schema([
            TextInput::make('footer_cta_title')->label('Section Heading')->columnSpanFull(),
            TextInput::make('footer_cta_button')->label('Button Text'),
            self::routeSelect('footer_cta_route', 'Footer CTA Route'),
            Forms\Components\SpatieMediaLibraryFileUpload::make('footer_cta_bg')
                ->disk('public')
                ->visibility('public')
                ->dehydrated(false)
                ->collection('footer_cta_bg')
                ->label('Background Image (Optional)')

                ->columnSpanFull(),
        ])->columns(2);
    }

    public static function seoSection(): Section
    {
        return Section::make('SEO Settings')->schema([
            Group::make()->relationship('seo')->schema([
                Translations::make('translations')->schema([
                    TextInput::make('title')->label('Meta Title')
                        ->helperText('Override the default page title. 50-60 characters recommended.'),
                    Forms\Components\Textarea::make('description')->label('Meta Description')->rows(3)
                        ->helperText('Override the default description. 150-160 characters recommended.'),
                    Forms\Components\TagsInput::make('keywords')->label('Keywords')
                        ->helperText('Press enter to add keywords.'),
                ]),
                Forms\Components\FileUpload::make('og_image')->label('OpenGraph Image')->image()->disk('public')->directory('seo')->visibility('public')
                    ->getUploadedFileNameForStorageUsing(
                        fn ($get, $file): string => (string) str($get('title') ?? 'seo-image')
                            ->slug()
                            ->append('-', substr(uniqid(), -5))
                            ->append('.', $file->getClientOriginalExtension())
                    )
                    ->helperText('1200x630 pixels recommended for social media sharing.'),
            ]),
        ])->collapsed()
            ->columnSpanFull();
    }
}
