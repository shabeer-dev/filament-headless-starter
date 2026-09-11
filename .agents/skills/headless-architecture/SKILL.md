---
name: headless-architecture
description: Deep reference and rules for the Filament Headless CMS + Inertia React singleton architecture. Use whenever designing, creating, or modifying backend content pipelines, models, CMS resources, and localized caching.
---

# Filament Headless CMS + Inertia React Architecture

This project strictly employs **Filament v5 as a decoupled Headless CMS** and **Inertia.js v3 + React 19 as the frontend SPA**.

## 1. The Singleton Resource Pattern (Zero Table Bloat)
Standard marketing pages (Home, About, Contact, Services, Privacy, etc.) do not use multi-row CRUD data tables.
- All page resources extend `App\Filament\Resources\SingletonResource`.
- `SingletonResource` overrides `canCreate() => false` and `canDelete() => false`.
- The Filament page mounts directly into `ManageSingletonPage`, resolving `$record = 1`.
- When an admin clicks a page in the sidebar, they are taken directly to the edit form.

## 2. Multi-Language Translatability
- All text strings and repeatable content are stored as JSON in the database.
- Models use `spatie/laravel-translatable` with `use HasTranslations;` and `$translatable = [...]`.
- Models also use `App\Models\Concerns\SerializesLocalizedStrings`.
  - When `toArray()` is called, translatable JSON fields are flattened to the current app locale (or fallback to English).
- Filament forms wrap the entire schema in `Translations::make('translations')->columnSpanFull()->schema([...])`.

## 3. Media Management
- Managed via `spatie/laravel-medialibrary`.
- Models use `use InteractsWithOptimizedMedia;` and define collections in `registerMediaCollections()`.
- Filament form uploads use `Forms\Components\SpatieMediaLibraryFileUpload::make('collection_name')->collection('collection_name')->disk('public')->visibility('public')`.

## 4. Reusable Form Schemas
Use `App\Filament\Helpers\FormFields`:
- `FormFields::heroSectionTab()`: Standard Hero tab.
- `FormFields::overviewTab()`: Standard Overview with configurable right-block.
- `FormFields::footerCtaTab()`: Standard Footer CTA tab.
- `FormFields::seoSection()`: Meta title, description, keywords, OpenGraph image.
- `FormFields::routeSelect()`: Searchable route dropdown for Wayfinder routes.

## 5. Infinite Caching & Observers
- `ContentPageController` automatically queries `Model::with(['media', 'seo'])->first()` and runs `Cache::rememberForever("{model_name}_content_{locale}", ...)`.
- `ContentObserver` listens to Eloquent events (`created`, `updated`, `deleted`, `restored`) and automatically flushes the cache keys for all configured locales.

## 6. Frontend Consumption
- React components receive strongly-typed `content` prop:
  ```tsx
  export default function MyPage({ content }: { content: PageMyPage }) { ... }
  ```
- Use `<SeoMeta />` at the top of the page.
- Wrap pages in `<AppLayout>`:
  ```tsx
  MyPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
  ```
- Use Laravel Wayfinder for all route references.
