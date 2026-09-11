---
name: headless-page-scaffolding
description: Instructions and CLI workflows for scaffolding new singleton pages and multi-record collections in the Filament Headless architecture.
---

# Headless Page & Collection Scaffolding

This project includes custom Artisan commands designed to generate full vertical slices in one command.

## 1. Creating a Singleton Page (Marketing / Landing / Legal)

To generate a new singleton page:
```bash
php artisan make:headless-page {PageName}
```
Example:
```bash
php artisan make:headless-page Services
```

This command automatically generates:
1. **Migration:** `database/migrations/{timestamp}_create_page_services_table.php`
2. **Model:** `app/Models/Content/PageServices.php` (with `HasTranslations`, `HasSEO`, `SerializesLocalizedStrings`, `InteractsWithOptimizedMedia`)
3. **Seeder:** `database/seeders/PageServicesSeeder.php` (seeds row 1 with placeholder content)
4. **Filament Resource:** `app/Filament/Resources/Content/ServicesPage/ServicesPageResource.php` and `Pages/ManageServicesPage.php`
5. **Controller:** `app/Http/Controllers/Page/ServicesController.php` (extends `ContentPageController`)
6. **React Component:** `resources/js/pages/Services.tsx` (wrapped in `AppLayout` with `<SeoMeta />`)
7. **TypeScript Types:** Appends `PageServices` interface to `resources/js/types/content.ts`
8. **Route:** Injects route into `routes/web.php` inside the `{locale}` route group.

### After Running:
1. Run migrations: `php artisan migrate`
2. Seed the page: `php artisan db:seed --class=Database\\Seeders\\PageServicesSeeder`
3. Customize fields in Filament Resource and React page.

---

## 2. Creating a Multi-Record Collection (Blog, Projects, Testimonials)

To generate a multi-record collection:
```bash
php artisan make:headless-collection {ModelName}
```
Example:
```bash
php artisan make:headless-collection Project
```

This command automatically generates:
1. **Migration:** `database/migrations/{timestamp}_create_projects_table.php` (with translatable title, slug, excerpt, content, status, published_at)
2. **Model:** `app/Models/Project.php` (with `published` scope, translatable traits, media collections)
3. **Seeder:** `database/seeders/ProjectsSeeder.php`
4. **Filament Resource:** `app/Filament/Resources/ProjectResource.php` with List, Create, Edit pages
5. **Controller:** `app/Http/Controllers/ProjectController.php` with `index()` and `show()` actions
6. **React Pages:** `resources/js/pages/Projects/Index.tsx` and `Show.tsx`
7. **TypeScript Types:** Appends `Project` interface to `resources/js/types/content.ts`
8. **Routes:** Registers list and show routes in `routes/web.php`.
