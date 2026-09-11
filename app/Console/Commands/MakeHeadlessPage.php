<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeHeadlessPage extends Command
{
    protected $signature = 'make:headless-page {name : The name of the page (e.g. Services, Team, PrivacyPolicy)}
                            {--force : Overwrite existing files}';

    protected $description = 'Generate a complete vertical slice for a Headless CMS singleton page (Model, Migration, Seeder, Filament Resource, Controller, React Page, Types & Route)';

    public function handle(): int
    {
        $rawName = trim($this->argument('name'));
        $name = Str::studly(preg_replace('/Page$/i', '', $rawName));

        $modelName = "Page{$name}";
        $tableName = 'page_'.Str::snake($name);
        $kebabName = Str::kebab($name);
        $headline = Str::headline($name);
        $pluralModelLabel = $headline;
        $modelLabel = "{$headline} Page";

        $this->info("Scaffolding Headless Singleton Page: <comment>{$name}</comment>");

        $this->createMigration($name, $tableName);
        $this->createModel($name, $modelName, $tableName);
        $this->createSeeder($name, $modelName, $headline);
        $this->createFilamentResource($name, $modelName, $modelLabel, $pluralModelLabel, $kebabName);
        $this->createController($name, $modelName);
        $this->createReactPage($name, $modelName, $headline);
        $this->updateTypes($name, $modelName);
        $this->registerRoute($name, $kebabName);

        $this->newLine();
        $this->info("Headless page <info>{$name}</info> scaffolded successfully!");
        $this->line('Next steps:');
        $this->line(' 1. Run <comment>php artisan migrate</comment>');
        $this->line(" 2. Run <comment>php artisan db:seed --class=Database\\\\Seeders\\\\{$modelName}Seeder</comment>");
        $this->line(" 3. Customize the Filament form in <comment>app/Filament/Resources/Content/{$name}Page/{$name}PageResource.php</comment>");
        $this->line(" 4. Customize the frontend in <comment>resources/js/pages/{$name}.tsx</comment>");

        return 0;
    }

    protected function createMigration(string $name, string $tableName): void
    {
        $migrationName = date('Y_m_d_His')."_create_{$tableName}_table.php";
        $path = database_path("migrations/{$migrationName}");

        // Check if migration for this table already exists
        $existing = glob(database_path("migrations/*_create_{$tableName}_table.php"));
        if (! empty($existing) && ! $this->option('force')) {
            $this->warn("Migration for {$tableName} already exists. Skipping.");

            return;
        }

        $content = <<<PHP
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('{$tableName}', function (Blueprint \$table) {
            \$table->id();

            // Hero section
            \$table->text('hero_label')->nullable();
            \$table->text('hero_title')->nullable();
            \$table->text('hero_highlighted')->nullable();
            \$table->text('hero_description')->nullable();
            \$table->text('hero_cta_primary')->nullable();
            \$table->text('hero_cta_primary_route')->nullable();
            \$table->text('hero_cta_secondary')->nullable();
            \$table->text('hero_cta_secondary_route')->nullable();

            // Content & Overview section
            \$table->text('overview_title')->nullable();
            \$table->text('overview_subtitle')->nullable();
            \$table->text('overview_description')->nullable();
            \$table->json('features')->nullable();

            // Footer CTA
            \$table->text('footer_cta_title')->nullable();
            \$table->text('footer_cta_button')->nullable();
            \$table->text('footer_cta_route')->nullable();

            \$table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('{$tableName}');
    }
};

PHP;

        File::put($path, $content);
        $this->line(" <info>✓</info> Migration: database/migrations/{$migrationName}");
    }

    protected function createModel(string $name, string $modelName, string $tableName): void
    {
        $dir = app_path('Models/Content');
        File::ensureDirectoryExists($dir);
        $path = "{$dir}/{$modelName}.php";

        if (File::exists($path) && ! $this->option('force')) {
            $this->warn("Model {$modelName} already exists. Skipping.");

            return;
        }

        $content = <<<PHP
<?php

namespace App\Models\Content;

use App\Models\Concerns\HasSEO;
use App\Models\Concerns\InteractsWithOptimizedMedia;
use App\Models\Concerns\SerializesLocalizedStrings;
use App\Observers\ContentObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\Translatable\HasTranslations;

#[ObservedBy(ContentObserver::class)]
class {$modelName} extends Model implements HasMedia
{
    use HasSEO;
    use HasTranslations, InteractsWithOptimizedMedia;
    use SerializesLocalizedStrings;

    protected \$table = '{$tableName}';

    protected \$guarded = [];

    public array \$translatable = [
        'hero_label',
        'hero_title',
        'hero_highlighted',
        'hero_description',
        'hero_cta_primary',
        'hero_cta_primary_route',
        'hero_cta_secondary',
        'hero_cta_secondary_route',
        'overview_title',
        'overview_subtitle',
        'overview_description',
        'features',
        'footer_cta_title',
        'footer_cta_button',
        'footer_cta_route',
    ];

    protected \$casts = [
        'features' => 'array',
    ];

    public function registerMediaCollections(): void
    {
        \$this->addMediaCollection('hero')->singleFile();
        \$this->addMediaCollection('overview')->singleFile();
        \$this->addMediaCollection('footer_cta_bg')->singleFile();
    }
}

PHP;

        File::put($path, $content);
        $this->line(" <info>✓</info> Model: app/Models/Content/{$modelName}.php");
    }

    protected function createSeeder(string $name, string $modelName, string $headline): void
    {
        $path = database_path("seeders/{$modelName}Seeder.php");

        if (File::exists($path) && ! $this->option('force')) {
            $this->warn("Seeder {$modelName}Seeder already exists. Skipping.");

            return;
        }

        $content = <<<PHP
<?php

namespace Database\Seeders;

use App\Models\Content\\{$modelName};
use Illuminate\Database\Seeder;

class {$modelName}Seeder extends Seeder
{
    public function run(): void
    {
        {$modelName}::updateOrCreate(
            ['id' => 1],
            [
                'hero_label' => ['en' => '{$headline}', 'ar' => '{$headline}'],
                'hero_title' => ['en' => 'Discover Our {$headline}', 'ar' => 'اكتشف {$headline}'],
                'hero_highlighted' => ['en' => 'Excellence', 'ar' => 'التميز'],
                'hero_description' => [
                    'en' => 'Welcome to our {$headline} page. We deliver state-of-the-art solutions tailored to your operational needs.',
                    'ar' => 'مرحبًا بكم في صفحتنا. نحن نقدم حلولاً متطورة ومصممة خصيصًا لتلبية احتياجاتك.',
                ],
                'hero_cta_primary' => ['en' => 'Get in Touch', 'ar' => 'اتصل بنا'],
                'hero_cta_primary_route' => ['en' => 'contact', 'ar' => 'contact'],
                'overview_title' => ['en' => 'Overview', 'ar' => 'نظرة عامة'],
                'overview_description' => [
                    'en' => 'Comprehensive insights and tailored features built for reliability and performance.',
                    'ar' => 'رؤى شاملة وميزات مصممة خصيصًا لضمان الموثوقية والأداء العالي.',
                ],
                'features' => [
                    'en' => [
                        ['title' => 'Industry Leadership', 'description' => 'Uncompromising standards of design and engineering.'],
                        ['title' => 'Global Compliance', 'description' => 'Fully certified and tested against international benchmarks.'],
                    ],
                    'ar' => [
                        ['title' => 'الريادة في المجال', 'description' => 'معايير صارمة في التصميم والهندسة.'],
                        ['title' => 'الامتثال الدولي', 'description' => 'معتمد ومختبر بالكامل وفقًا للمعايير الدولية.'],
                    ],
                ],
                'footer_cta_title' => ['en' => 'Ready to build with us?', 'ar' => 'هل أنت مستعد لبدء العمل معنا؟'],
                'footer_cta_button' => ['en' => 'Contact Team', 'ar' => 'تواصل مع فريقنا'],
                'footer_cta_route' => ['en' => 'contact', 'ar' => 'contact'],
            ]
        );
    }
}

PHP;

        File::put($path, $content);
        $this->line(" <info>✓</info> Seeder: database/seeders/{$modelName}Seeder.php");
    }

    protected function createFilamentResource(string $name, string $modelName, string $modelLabel, string $pluralModelLabel, string $kebabName): void
    {
        $resourceDir = app_path("Filament/Resources/Content/{$name}Page");
        $pagesDir = "{$resourceDir}/Pages";
        File::ensureDirectoryExists($pagesDir);

        $resourceClass = "{$name}PageResource";
        $pageClass = "Manage{$name}Page";

        $resourcePath = "{$resourceDir}/{$resourceClass}.php";
        $pagePath = "{$pagesDir}/{$pageClass}.php";

        if (! File::exists($resourcePath) || $this->option('force')) {
            $resourceContent = <<<PHP
<?php

namespace App\Filament\Resources\Content\\{$name}Page;

use App\Filament\Helpers\FormFields;
use App\Filament\Resources\SingletonResource;
use App\Models\Content\\{$modelName};
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Happenv\FilamentTranslatable\Forms\Component\Translations;

class {$resourceClass} extends SingletonResource
{
    protected static ?string \$model = {$modelName}::class;

    protected static string|\BackedEnum|null \$navigationIcon = 'heroicon-o-document-text';

    protected static string|\UnitEnum|null \$navigationGroup = 'Pages';

    protected static ?string \$modelLabel = '{$modelLabel}';

    protected static ?string \$pluralModelLabel = '{$pluralModelLabel}';

    protected static ?string \$slug = 'pages/{$kebabName}';

    public static function form(Schema \$schema): Schema
    {
        return \$schema
            ->schema([
                Translations::make('translations')->columnSpanFull()
                    ->schema([
                        Tabs::make('Tabs')
                            ->tabs([
                                FormFields::heroSectionTab(),
                                Tab::make('Overview')
                                    ->schema([
                                        TextInput::make('overview_title')->label('Heading'),
                                        TextInput::make('overview_subtitle')->label('Subtitle'),
                                        Textarea::make('overview_description')->label('Description')->rows(3)->columnSpanFull(),
                                        Forms\Components\Repeater::make('features')
                                            ->label('Key Features')
                                            ->collapsed()
                                            ->cloneable()
                                            ->itemLabel(fn (array \$state): ?string => \$state['title'] ?? null)
                                            ->schema([
                                                TextInput::make('title')->label('Title')->required(),
                                                TextInput::make('description')->label('Description')->required(),
                                            ])
                                            ->columns(2)
                                            ->columnSpanFull(),
                                    ])->columns(2),
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
            'index' => Pages\\{$pageClass}::route('/'),
        ];
    }
}

PHP;
            File::put($resourcePath, $resourceContent);
            $this->line(" <info>✓</info> Filament Resource: app/Filament/Resources/Content/{$name}Page/{$resourceClass}.php");
        }

        if (! File::exists($pagePath) || $this->option('force')) {
            $pageContent = <<<PHP
<?php

namespace App\Filament\Resources\Content\\{$name}Page\Pages;

use App\Filament\Pages\ManageSingletonPage;
use App\Filament\Resources\Content\\{$name}Page\\{$resourceClass};

class {$pageClass} extends ManageSingletonPage
{
    protected static string \$resource = {$resourceClass}::class;
}

PHP;
            File::put($pagePath, $pageContent);
            $this->line(" <info>✓</info> Filament Page: app/Filament/Resources/Content/{$name}Page/Pages/{$pageClass}.php");
        }
    }

    protected function createController(string $name, string $modelName): void
    {
        $dir = app_path('Http/Controllers/Page');
        File::ensureDirectoryExists($dir);
        $path = "{$dir}/{$name}Controller.php";

        if (File::exists($path) && ! $this->option('force')) {
            $this->warn("Controller {$name}Controller already exists. Skipping.");

            return;
        }

        $content = <<<PHP
<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\ContentPageController;
use App\Models\Content\\{$modelName};

class {$name}Controller extends ContentPageController
{
    protected function model(): string
    {
        return {$modelName}::class;
    }

    protected function component(): string
    {
        return '{$name}';
    }
}

PHP;

        File::put($path, $content);
        $this->line(" <info>✓</info> Controller: app/Http/Controllers/Page/{$name}Controller.php");
    }

    protected function createReactPage(string $name, string $modelName, string $headline): void
    {
        $dir = resource_path('js/pages');
        File::ensureDirectoryExists($dir);
        $path = "{$dir}/{$name}.tsx";

        if (File::exists($path) && ! $this->option('force')) {
            $this->warn("React page {$name}.tsx already exists. Skipping.");

            return;
        }

        $content = <<<TSX
import SeoMeta from '@/components/SeoMeta';
import HeroSection from '@/components/ui/HeroSection';
import FooterCta from '@/components/ui/FooterCta';
import AppLayout from '@/layouts/AppLayout';
import type { {$modelName} } from '@/types/content';

export default function {$name}({ content }: { content?: {$modelName} }) {
    const pageContent = content || ({} as {$modelName});

    return (
        <>
            <SeoMeta />

            <HeroSection
                content={pageContent}
                size="large"
                media={pageContent.media || []}
                showWatermark={true}
            />

            {pageContent.features && pageContent.features.length > 0 && (
                <section className="py-16 md:py-24 bg-surface border-b border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold text-heading">{pageContent.overview_title || 'Features'}</h2>
                            {pageContent.overview_description && (
                                <p className="mt-4 text-body text-lg">{pageContent.overview_description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {pageContent.features.map((feature, idx) => (
                                <div key={idx} className="p-6 rounded-lg border border-border bg-background shadow-xs hover:border-primary transition-colors">
                                    <h3 className="text-xl font-semibold text-heading mb-2">{feature.title}</h3>
                                    <p className="text-body">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <FooterCta
                route={pageContent.footer_cta_route}
                title={pageContent.footer_cta_title}
                buttonText={pageContent.footer_cta_button}
                media={pageContent.media || []}
            />
        </>
    );
}

{$name}.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
TSX;

        File::put($path, $content);
        $this->line(" <info>✓</info> React Page: resources/js/pages/{$name}.tsx");
    }

    protected function updateTypes(string $name, string $modelName): void
    {
        $path = resource_path('js/types/content.ts');
        if (! File::exists($path)) {
            return;
        }

        $content = File::get($path);
        if (str_contains($content, "export interface {$modelName}")) {
            return;
        }

        $typeDefinition = <<<TYPES


export interface {$modelName} extends HeroFields, FooterCtaFields {
    id: number;
    overview_title?: string | null;
    overview_subtitle?: string | null;
    overview_description?: string | null;
    features?: Array<{
        title: string;
        description: string;
    }>;
    media?: MediaItem[];
}
TYPES;

        File::append($path, $typeDefinition);
        $this->line(" <info>✓</info> TypeScript Interface: added {$modelName} to resources/js/types/content.ts");
    }

    protected function registerRoute(string $name, string $kebabName): void
    {
        $path = base_path('routes/web.php');
        if (! File::exists($path)) {
            return;
        }

        $content = File::get($path);
        $routeDefinition = "    Route::get('/{$kebabName}', Page\\{$name}Controller::class)->name('{$kebabName}');";

        if (str_contains($content, "->name('{$kebabName}')")) {
            return;
        }

        // Insert inside the {locale} route group
        $needle = "Route::prefix('{locale}')->where(['locale' => '[a-zA-Z]{2}'])->group(function () {";
        if (str_contains($content, $needle)) {
            $replacement = "{$needle}\n{$routeDefinition}";
            $content = str_replace($needle, $replacement, $content);
            File::put($path, $content);
            $this->line(" <info>✓</info> Route: added route '{$kebabName}' into routes/web.php");
        }
    }
}
