<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeHeadlessCollection extends Command
{
    protected $signature = 'make:headless-collection {name : The name of the collection (e.g. Article, Project, Service)}
                            {--force : Overwrite existing files}';

    protected $description = 'Generate a complete vertical slice for a Headless CMS multi-record collection (Model, Migration, Seeder, Filament CRUD Resource, Controller, React List & Show Pages, Types & Routes)';

    public function handle(): int
    {
        $rawName = trim($this->argument('name'));
        $singular = Str::studly(Str::singular($rawName));
        $plural = Str::plural($singular);
        $modelName = $singular;

        $tableName = Str::snake($plural);
        $kebabPlural = Str::kebab($plural);
        $kebabSingular = Str::kebab($singular);
        $headlineSingular = Str::headline($singular);
        $headlinePlural = Str::headline($plural);

        $this->info("Scaffolding Headless Collection: <comment>{$plural}</comment>");

        $this->createMigration($tableName);
        $this->createModel($modelName, $tableName);
        $this->createSeeder($modelName, $plural, $headlineSingular);
        $this->createFilamentResource($modelName, $plural, $headlineSingular, $headlinePlural, $kebabPlural);
        $this->createController($modelName, $plural);
        $this->createReactPages($modelName, $plural, $headlinePlural, $kebabPlural);
        $this->updateTypes($modelName);
        $this->registerRoutes($modelName, $plural, $kebabPlural);

        $this->newLine();
        $this->info("Headless collection <info>{$plural}</info> scaffolded successfully!");
        $this->line('Next steps:');
        $this->line(' 1. Run <comment>php artisan migrate</comment>');
        $this->line(" 2. Run <comment>php artisan db:seed --class=Database\\\\Seeders\\\\{$plural}Seeder</comment>");
        $this->line(" 3. View the Filament admin CRUD at <comment>/admin/{$kebabPlural}</comment>");
        $this->line(" 4. Browse the frontend at <comment>/{locale}/{$kebabPlural}</comment>");

        return 0;
    }

    protected function createMigration(string $tableName): void
    {
        $migrationName = date('Y_m_d_His')."_create_{$tableName}_table.php";
        $path = database_path("migrations/{$migrationName}");

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

            // Translatable fields stored as JSON
            \$table->text('title');
            \$table->string('slug')->unique();
            \$table->text('excerpt')->nullable();
            \$table->longText('content')->nullable();

            // Status & publishing
            \$table->string('status')->default('published')->index();
            \$table->timestamp('published_at')->nullable()->index();

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

    protected function createModel(string $modelName, string $tableName): void
    {
        $dir = app_path('Models');
        File::ensureDirectoryExists($dir);
        $path = "{$dir}/{$modelName}.php";

        if (File::exists($path) && ! $this->option('force')) {
            $this->warn("Model {$modelName} already exists. Skipping.");

            return;
        }

        $content = <<<PHP
<?php

namespace App\Models;

use App\Models\Concerns\HasSEO;
use App\Models\Concerns\InteractsWithOptimizedMedia;
use App\Models\Concerns\SerializesLocalizedStrings;
use App\Observers\ContentObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
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
        'title',
        'excerpt',
        'content',
    ];

    protected \$casts = [
        'published_at' => 'datetime',
    ];

    public function scopePublished(Builder \$query): Builder
    {
        return \$query->where('status', 'published')
            ->where(function (\$q) {
                \$q->whereNull('published_at')->orWhere('published_at', '<=', now());
            });
    }

    public function registerMediaCollections(): void
    {
        \$this->addMediaCollection('featured_image')->singleFile();
    }
}

PHP;

        File::put($path, $content);
        $this->line(" <info>✓</info> Model: app/Models/{$modelName}.php");
    }

    protected function createSeeder(string $modelName, string $plural, string $headlineSingular): void
    {
        $path = database_path("seeders/{$plural}Seeder.php");

        if (File::exists($path) && ! $this->option('force')) {
            $this->warn("Seeder {$plural}Seeder already exists. Skipping.");

            return;
        }

        $content = <<<PHP
<?php

namespace Database\Seeders;

use App\Models\\{$modelName};
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class {$plural}Seeder extends Seeder
{
    public function run(): void
    {
        \$items = [
            [
                'title' => [
                    'en' => "Getting Started with {$headlineSingular} Innovation",
                    'ar' => "البدء مع ابتكارات {$headlineSingular}",
                ],
                'slug' => Str::slug("getting-started-with-{$headlineSingular}-innovation"),
                'excerpt' => [
                    'en' => "Explore foundational principles and strategies driving modern {$headlineSingular} development.",
                    'ar' => "استكشف المبادئ والاستراتيجيات الأساسية التي تدفع عجلة تطوير {$headlineSingular} الحديثة.",
                ],
                'content' => [
                    'en' => "<p>Discover how continuous research, rigorous engineering, and forward-looking architecture deliver tangible results across all operational benchmarks.</p>",
                    'ar' => "<p>اكتشف كيف تقدم الأبحاث المستمرة والهندسة الدقيقة نتائج ملموسة عبر جميع المعايير التشغيلية.</p>",
                ],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => [
                    'en' => "Strategic Scaling and Quality Standards for {$headlineSingular}",
                    'ar' => "التوسع الاستراتيجي ومعايير الجودة لـ {$headlineSingular}",
                ],
                'slug' => Str::slug("strategic-scaling-and-quality-standards-for-{$headlineSingular}"),
                'excerpt' => [
                    'en' => "A deep dive into high-performance methodologies and international compliance.",
                    'ar' => "نظرة عميقة على المنهجيات عالية الأداء والامتثال للمعايير الدولية.",
                ],
                'content' => [
                    'en' => "<p>Ensuring compliance, scalability, and seamless integration requires an unwavering commitment to precision and performance metrics.</p>",
                    'ar' => "<p>يتطلب ضمان الامتثال والقابلية للتوسع التزامًا راسخًا بمقاييس الدقة والأداء.</p>",
                ],
                'status' => 'published',
                'published_at' => now()->subDays(3),
            ],
        ];

        foreach (\$items as \$item) {
            {$modelName}::updateOrCreate(['slug' => \$item['slug']], \$item);
        }
    }
}

PHP;

        File::put($path, $content);
        $this->line(" <info>✓</info> Seeder: database/seeders/{$plural}Seeder.php");
    }

    protected function createFilamentResource(string $modelName, string $plural, string $headlineSingular, string $headlinePlural, string $kebabPlural): void
    {
        $resourceDir = app_path("Filament/Resources/{$plural}");
        $pagesDir = "{$resourceDir}/Pages";
        File::ensureDirectoryExists($pagesDir);

        $resourceClass = "{$modelName}Resource";
        $resourcePath = app_path("Filament/Resources/{$resourceClass}.php");

        if (! File::exists($resourcePath) || $this->option('force')) {
            $resourceContent = <<<PHP
<?php

namespace App\Filament\Resources;

use App\Filament\Helpers\FormFields;
use App\Filament\Resources\\{$plural}\Pages;
use App\Models\\{$modelName};
use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Happenv\FilamentTranslatable\Forms\Component\Translations;
use Illuminate\Support\Str;

class {$resourceClass} extends Resource
{
    protected static ?string \$model = {$modelName}::class;

    protected static string|\BackedEnum|null \$navigationIcon = 'heroicon-o-folder-open';

    protected static string|\UnitEnum|null \$navigationGroup = 'Content';

    protected static ?string \$modelLabel = '{$headlineSingular}';

    protected static ?string \$pluralModelLabel = '{$headlinePlural}';

    protected static ?string \$slug = '{$kebabPlural}';

    public static function form(Schema \$schema): Schema
    {
        return \$schema
            ->schema([
                Grid::make(3)->schema([
                    Section::make('Content Details')
                        ->schema([
                            Translations::make('translations')
                                ->schema([
                                    TextInput::make('title')
                                        ->required()
                                        ->live(onBlur: true)
                                        ->afterStateUpdated(fn (\$set, ?string \$state) => \$set('slug', Str::slug(\$state ?? ''))),
                                    Textarea::make('excerpt')
                                        ->rows(3),
                                    RichEditor::make('content')
                                        ->columnSpanFull(),
                                ]),
                        ])
                        ->columnSpan(2),

                    Section::make('Publishing & Media')
                        ->schema([
                            TextInput::make('slug')
                                ->required()
                                ->unique(ignoreRecord: true),
                            Select::make('status')
                                ->options([
                                    'draft' => 'Draft',
                                    'published' => 'Published',
                                ])
                                ->default('published')
                                ->required(),
                            DateTimePicker::make('published_at')
                                ->default(now()),
                            Forms\Components\SpatieMediaLibraryFileUpload::make('featured_image')
                                ->collection('featured_image')
                                ->label('Featured Image')
                                ->disk('public')
                                ->visibility('public'),
                        ])
                        ->columnSpan(1),
                ]),
                FormFields::seoSection(),
            ]);
    }

    public static function table(Table \$table): Table
    {
        return \$table
            ->columns([
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('semibold'),
                TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string \$state): string => match (\$state) {
                        'published' => 'success',
                        'draft' => 'gray',
                        default => 'warning',
                    }),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'published' => 'Published',
                        'draft' => 'Draft',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\List{$plural}::route('/'),
            'create' => Pages\Create{$modelName}::route('/create'),
            'edit' => Pages\Edit{$modelName}::route('/{record}/edit'),
        ];
    }
}

PHP;
            File::put($resourcePath, $resourceContent);
            $this->line(" <info>✓</info> Filament Resource: app/Filament/Resources/{$resourceClass}.php");
        }

        // List Page
        $listPagePath = "{$pagesDir}/List{$plural}.php";
        if (! File::exists($listPagePath) || $this->option('force')) {
            $listContent = <<<PHP
<?php

namespace App\Filament\Resources\\{$plural}\Pages;

use App\Filament\Resources\\{$modelName}Resource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class List{$plural} extends ListRecords
{
    protected static string \$resource = {$modelName}Resource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

PHP;
            File::put($listPagePath, $listContent);
            $this->line(" <info>✓</info> Filament Page: app/Filament/Resources/{$plural}/Pages/List{$plural}.php");
        }

        // Create Page
        $createPagePath = "{$pagesDir}/Create{$modelName}.php";
        if (! File::exists($createPagePath) || $this->option('force')) {
            $createContent = <<<PHP
<?php

namespace App\Filament\Resources\\{$plural}\Pages;

use App\Filament\Resources\\{$modelName}Resource;
use Filament\Resources\Pages\CreateRecord;

class Create{$modelName} extends CreateRecord
{
    protected static string \$resource = {$modelName}Resource::class;
}

PHP;
            File::put($createPagePath, $createContent);
            $this->line(" <info>✓</info> Filament Page: app/Filament/Resources/{$plural}/Pages/Create{$modelName}.php");
        }

        // Edit Page
        $editPagePath = "{$pagesDir}/Edit{$modelName}.php";
        if (! File::exists($editPagePath) || $this->option('force')) {
            $editContent = <<<PHP
<?php

namespace App\Filament\Resources\\{$plural}\Pages;

use App\Filament\Resources\\{$modelName}Resource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class Edit{$modelName} extends EditRecord
{
    protected static string \$resource = {$modelName}Resource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

PHP;
            File::put($editPagePath, $editContent);
            $this->line(" <info>✓</info> Filament Page: app/Filament/Resources/{$plural}/Pages/Edit{$modelName}.php");
        }
    }

    protected function createController(string $modelName, string $plural): void
    {
        $dir = app_path('Http/Controllers');
        $path = "{$dir}/{$modelName}Controller.php";

        if (File::exists($path) && ! $this->option('force')) {
            $this->warn("Controller {$modelName}Controller already exists. Skipping.");

            return;
        }

        $content = <<<PHP
<?php

namespace App\Http\Controllers;

use App\Models\\{$modelName};
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class {$modelName}Controller extends Controller
{
    public function index(): Response
    {
        \$items = {$modelName}::published()
            ->with(['media', 'seo'])
            ->latest('published_at')
            ->paginate(9);

        return Inertia::render('{$plural}/Index', [
            'items' => \$items,
        ]);
    }

    public function show(Request \$request, string \$locale, string \$slug): Response
    {
        \$item = {$modelName}::where('slug', \$slug)
            ->with(['media', 'seo'])
            ->firstOrFail();

        return Inertia::render('{$plural}/Show', [
            'item' => \$item,
        ]);
    }
}

PHP;

        File::put($path, $content);
        $this->line(" <info>✓</info> Controller: app/Http/Controllers/{$modelName}Controller.php");
    }

    protected function createReactPages(string $modelName, string $plural, string $headlinePlural, string $kebabPlural): void
    {
        $dir = resource_path("js/pages/{$plural}");
        File::ensureDirectoryExists($dir);

        $indexPath = "{$dir}/Index.tsx";
        $showPath = "{$dir}/Show.tsx";

        if (! File::exists($indexPath) || $this->option('force')) {
            $indexContent = <<<TSX
import SeoMeta from '@/components/SeoMeta';
import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import type { {$modelName} } from '@/types/content';

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export default function {$plural}Index({ items }: { items: PaginatedData<{$modelName}> }) {
    return (
        <>
            <SeoMeta />

            <section className="py-20 bg-background border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary text-sm font-semibold tracking-wider uppercase">Archives</span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-heading mt-2">{$headlinePlural}</h1>
                        <p className="mt-4 text-body text-lg">Browse our latest publications, updates, and releases.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.data.map((item) => (
                            <article key={item.id} className="bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg transition duration-200 flex flex-col">
                                {item.media && item.media.length > 0 && (
                                    <div className="h-48 w-full overflow-hidden bg-surface-alt">
                                        <img
                                            src={item.media[0].original_url}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h2 className="text-xl font-bold text-heading hover:text-primary transition-colors mb-2">
                                        <Link href={`/{$kebabPlural}/\${item.slug}`}>{item.title}</Link>
                                    </h2>
                                    {item.excerpt && <p className="text-body text-sm line-clamp-3 mb-4">{item.excerpt}</p>}
                                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-caption">
                                        <span>{item.published_at ? new Date(item.published_at).toLocaleDateString() : ''}</span>
                                        <Link href={`/{$kebabPlural}/\${item.slug}`} className="text-primary font-medium hover:underline">Read more →</Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {items.last_page > 1 && (
                        <div className="mt-12 flex justify-center gap-4">
                            {items.prev_page_url && (
                                <Link href={items.prev_page_url} className="px-4 py-2 rounded-md border border-border bg-surface text-heading hover:bg-surface-alt text-sm">Previous</Link>
                            )}
                            {items.next_page_url && (
                                <Link href={items.next_page_url} className="px-4 py-2 rounded-md border border-border bg-surface text-heading hover:bg-surface-alt text-sm">Next</Link>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

{$plural}Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
TSX;
            File::put($indexPath, $indexContent);
            $this->line(" <info>✓</info> React Page: resources/js/pages/{$plural}/Index.tsx");
        }

        if (! File::exists($showPath) || $this->option('force')) {
            $showContent = <<<TSX
import SeoMeta from '@/components/SeoMeta';
import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import type { {$modelName} } from '@/types/content';

export default function {$modelName}Show({ item }: { item: {$modelName} }) {
    return (
        <>
            <SeoMeta />

            <article className="py-16 md:py-24 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link href="/{$kebabPlural}" className="text-sm font-medium text-primary hover:underline">
                            ← Back to {$headlinePlural}
                        </Link>
                    </div>

                    <header className="mb-10">
                        <h1 className="text-3xl sm:text-5xl font-bold text-heading leading-tight">{item.title}</h1>
                        {item.published_at && (
                            <p className="mt-4 text-sm text-caption">Published on {new Date(item.published_at).toLocaleDateString()}</p>
                        )}
                    </header>

                    {item.media && item.media.length > 0 && (
                        <div className="mb-10 rounded-2xl overflow-hidden border border-border max-h-[480px]">
                            <img src={item.media[0].original_url} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {item.content && (
                        <div
                            className="prose prose-lg max-w-none text-body"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                    )}
                </div>
            </article>
        </>
    );
}

{$modelName}Show.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
TSX;
            File::put($showPath, $showContent);
            $this->line(" <info>✓</info> React Page: resources/js/pages/{$plural}/Show.tsx");
        }
    }

    protected function updateTypes(string $modelName): void
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


export interface {$modelName} {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: string | null;
    status: 'draft' | 'published';
    published_at?: string | null;
    media?: MediaItem[];
    seo?: SeoMetadata;
}
TYPES;

        File::append($path, $typeDefinition);
        $this->line(" <info>✓</info> TypeScript Interface: added {$modelName} to resources/js/types/content.ts");
    }

    protected function registerRoutes(string $modelName, string $plural, string $kebabPlural): void
    {
        $path = base_path('routes/web.php');
        if (! File::exists($path)) {
            return;
        }

        $content = File::get($path);
        $indexRoute = "    Route::get('/{$kebabPlural}', [\\App\\Http\\Controllers\\{$modelName}Controller::class, 'index'])->name('{$kebabPlural}.index');";
        $showRoute = "    Route::get('/{$kebabPlural}/{slug}', [\\App\\Http\\Controllers\\{$modelName}Controller::class, 'show'])->name('{$kebabPlural}.show');";

        if (str_contains($content, "->name('{$kebabPlural}.index')")) {
            return;
        }

        $needle = "Route::prefix('{locale}')->where(['locale' => '[a-zA-Z]{2}'])->group(function () {";
        if (str_contains($content, $needle)) {
            $replacement = "{$needle}\n{$indexRoute}\n{$showRoute}";
            $content = str_replace($needle, $replacement, $content);
            File::put($path, $content);
            $this->line(" <info>✓</info> Routes: registered {$kebabPlural}.index and {$kebabPlural}.show into routes/web.php");
        }
    }
}
