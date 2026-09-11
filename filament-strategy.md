# 🚀 The Filament Headless CMS Strategy

In this architecture, Filament is **not** used to build a traditional full-stack web application. Instead, it acts entirely as a **Headless CMS** to manage content, while the frontend is completely decoupled using React and Inertia.js.

## 1. The Singleton Resource Pattern & No Data Tables
Unlike traditional Filament resources which allow creating, editing, and deleting multiple records (e.g., Blog Posts or Users), this project uses a strict Singleton pattern for pages.

- **The `SingletonResource` Base Class:** All page resources (like `HomePageResource`) extend a custom `App\Filament\Resources\SingletonResource`.
- **Disabled Actions:** This base class overrides `canCreate()` and `canDelete()` to return `false`.
- **No Table Views:** Because there is only exactly one database row per page, **Filament Tables (List Pages) are completely bypassed for page content.** Users do not see a table of "Homes" to choose from. When they click "Home Page" in the sidebar, they are taken directly to the Edit Form for that singular record. 
- **The Result:** There is always exactly one database row per page (e.g., one row in the `page_home` table). The Filament admin panel only allows the user to *edit* that specific row.

## 2. Universal Translatability
Multi-language support is baked into the foundation using `spatie/laravel-translatable` and `webard/filament-translatable`.

- **Model Setup:** Models like `PageHome` use the `HasTranslations` trait and define a `$translatable` array containing every text field on the page (e.g., `['hero_title', 'hero_description']`).
- **Database Schema:** Translatable fields are stored as `JSON` columns in the database rather than standard strings.
- **Filament Schema Wrapper:** In the Filament Resource `form()` method, the *entire* schema is wrapped in a translation component:
  ```php
  Translations::make('translations')->columnSpanFull()->schema([
      // All Tabs, TextInputs, and Repeaters go inside here
  ])
  ```
  This automatically renders a locale switcher at the top of the Filament form, allowing admins to edit English, Arabic, Spanish, etc., seamlessly on the same page without navigating away.

## 3. Media Management
Media (images, PDFs, videos) is strictly handled by `spatie/laravel-medialibrary`.

- Models implement `HasMedia` and use `InteractsWithOptimizedMedia`.
- The `registerMediaCollections()` method is used to define specific collections (e.g., `$this->addMediaCollection('hero')->singleFile()`).
- In Filament, `SpatieMediaLibraryFileUpload` components are used to directly bind uploads to these collections rather than saving raw paths in the database.

## 4. Reusable Form Architecture
To prevent Filament Resource files from becoming massively bloated with hundreds of fields, the project abstracts common UI components.

- **The `FormFields` Helper:** `App\Filament\Helpers\FormFields` contains static methods that return pre-configured Filament schema blocks.
- **Examples:** `FormFields::seoSection()`, `FormFields::heroSectionTab()`, or `FormFields::footerCtaTab()`. This keeps the actual `HomePageResource` clean and ensures consistency across different pages.

## 5. The Frontend Bridge (Inertia & Controllers)
Once Filament saves the data, it must be delivered to the React frontend. This is handled by a standardized pipeline:

1. **The `ContentPageController`:** An abstract controller handles the heavy lifting. When a route is visited, it dynamically generates a cache key based on the model and locale.
2. **Caching:** It queries the database for the singleton row, eager-loads the media and SEO relations, and caches the entire array forever (using `rememberForever`). Cache is flushed via Observers when Filament saves changes.
3. **Inertia Payload:** It returns `Inertia::render('PageName', ['content' => $content])`.
4. **React Consumption:** The React component receives the strongly-typed `content` prop and passes it down to individual UI components (e.g., `<h1>{content.hero_title}</h1>`).

## Summary
By using this exact strategy, the project achieves the best of both worlds: 
1. **For the Developer:** A lightning-fast, highly interactive React frontend powered by Inertia.
2. **For the Client:** A beautiful, easy-to-use Filament admin panel that bypasses confusing data tables for singletons, supports multiple languages instantly, and handles media management out-of-the-box—all without the risk of accidentally creating or deleting core website pages.
