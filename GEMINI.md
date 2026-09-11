# Filament Headless CMS + Inertia React Boilerplate Guidelines

This application is built on **Laravel 13**, **Filament v5**, and **Inertia.js v3 + React 19**, styled with **Tailwind CSS v4** and typed with **Laravel Wayfinder**.

---

## 1. Core Architecture Principles

### The Singleton Resource Pattern (Zero Table Bloat)
In this architecture, Filament is used strictly as a decoupled **Headless CMS**.
- Marketing and content pages (Home, About, Contact, Services, etc.) are **singletons** (exactly one database record per page).
- Page resources extend `App\Filament\Resources\SingletonResource`, which disables `canCreate()` and `canDelete()`.
- Pages bypass Filament Table listing pages and mount directly into `App\Filament\Pages\ManageSingletonPage` to edit record ID 1.

### Universal Translatability
- All text blocks, titles, descriptions, and repeatable lists are stored as JSON in the database.
- Models must use `Spatie\Translatable\HasTranslations` and `App\Models\Concerns\SerializesLocalizedStrings`.
- In Filament, wrap form schemas inside `Happenv\FilamentTranslatable\Forms\Component\Translations::make('translations')->columnSpanFull()->schema([...])`.
- On serialization (`toArray()`), JSON fields are automatically flattened to strings in the active application locale (falling back to English if untranslated).

### Media Management
- Handled exclusively via `spatie/laravel-medialibrary`.
- Models implement `HasMedia` and use `App\Models\Concerns\InteractsWithOptimizedMedia`.
- Define collections in `registerMediaCollections()`.
- Use `Forms\Components\SpatieMediaLibraryFileUpload` in Filament forms.

### Form Schema Abstraction
- Abstract repetitive UI blocks into `App\Filament\Helpers\FormFields`:
  - `FormFields::heroSectionTab()`
  - `FormFields::overviewTab()`
  - `FormFields::footerCtaTab()`
  - `FormFields::seoSection()`
  - `FormFields::routeSelect()`

### High-Performance Caching
- Page controllers extend `App\Http\Controllers\ContentPageController`.
- Content is retrieved with relations (`media`, `seo`) and cached indefinitely using `Cache::rememberForever()`.
- `App\Observers\ContentObserver` automatically clears cache across all locales whenever a content model is saved.

---

## 2. CLI Scaffolding Commands

Always use the custom Artisan commands to generate new content structures:

### Singleton Marketing Page
```bash
php artisan make:headless-page {Name}
```
Generates Migration, Seeder, Model, Filament Singleton Resource, Page Controller, React Page, TypeScript types, and registers the route in `routes/web.php`.

### Multi-Record Collection (Blog, Projects, Testimonials)
```bash
php artisan make:headless-collection {Name}
```
Generates Migration, Seeder, Model, Filament CRUD Resource, Controller with index/show, React Index and Show pages, TypeScript types, and routes.

---

## 3. Frontend Standards (Inertia v3 + React 19)

- **Route Calling:** Use Laravel Wayfinder. Import routes from `@/routes` or controller actions from `@/actions`.
- **Layout:** Wrap every page with `AppLayout`:
  ```tsx
  MyPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
  ```
- **SEO:** Always include `<SeoMeta />` inside the page template.
- **Props:** The page receives strongly typed `content` passed from the controller:
  ```tsx
  export default function MyPage({ content }: { content: PageModel }) { ... }
  ```
- **Styling:** Use Tailwind CSS v4 CSS variable themes defined in `resources/css/app.css`.

---

## 4. Skills Activation

Domain skills are located in `.agents/skills/`:
- `headless-architecture`: Complete architectural details, traits, and patterns.
- `headless-page-scaffolding`: Vertical-slice generation workflows.
- `inertia-react-development`: Inertia v3 React client-side patterns.
- `wayfinder-development`: Wayfinder route generation and typed links.
- `pest-testing`: Pest PHP test writing and execution.
- `tailwindcss-development`: Tailwind utility classes and responsive layouts.

---

## 5. Verification & Code Quality

- **Format PHP:** Run `vendor/bin/pint --format agent` after modifying PHP files.
- **Test Enforcement:** Write and run tests for every feature using `php artisan test --compact`.
- **Type Check:** Run `npm run types:check` before finalizing frontend changes.
