# ⚡ Filament v5 Headless CMS + Inertia.js v3 + React 19 Starter Kit

[![Latest Version on Packagist](https://img.shields.io/packagist/v/shabeer-dev/filament-headless-starter.svg?style=flat-square)](https://packagist.org/packages/shabeer-dev/filament-headless-starter)
[![PHP Version](https://img.shields.io/badge/PHP-8.4%2B-blue.svg?style=flat-square)](https://php.net)
[![Laravel Version](https://img.shields.io/badge/Laravel-13.x-red.svg?style=flat-square)](https://laravel.com)
[![Filament Version](https://img.shields.io/badge/Filament-5.x-amber.svg?style=flat-square)](https://filamentphp.com)
[![Inertia React](https://img.shields.io/badge/Inertia%20React-v3%20%2B%20React%2019-61dafb.svg?style=flat-square)](https://inertiajs.com)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

An opinionated, production-ready enterprise starter template pairing **Filament v5 as a decoupled Headless CMS** with a modern **Inertia.js v3 + React 19 Bento SPA** frontend styled with **Tailwind CSS v4** and typed with **Laravel Wayfinder**. Includes an ultra-flexible **CSS Theme Engine** that allows you to change fonts, colors, and border radii by editing a single CSS file.

---

## 🎨 Switchable CSS Theme Engine

The starter features a centralized CSS variable theme system defined in [`resources/css/theme.css`](resources/css/theme.css) and wired into Tailwind CSS v4's `@theme` directive.

### 5 Built-in Presets
Switch the color palette across the entire application instantly with one environment variable:

```env
APP_THEME=indigo    # Modern tech / cloud platform (default)
APP_THEME=emerald   # Clean fintech & sustainability
APP_THEME=violet    # Deep AI & creative tools
APP_THEME=amber     # Warm enterprise & editorial
APP_THEME=slate     # Minimalist monochrome
```

*(Theme is bound to `<html data-theme="{{ config('app.theme', 'indigo') }}">` in `resources/views/app.blade.php`)*.

### Effortless Customization
To build your own brand theme, **you only ever touch [`resources/css/theme.css`](resources/css/theme.css)**:

```css
[data-theme='my-brand'],
:root {
    --theme-font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
    --theme-font-mono: 'JetBrains Mono', monospace;

    /* Primary Accents */
    --theme-primary: #2563eb;
    --theme-primary-hover: #1d4ed8;
    --theme-primary-subtle: #eff6ff;
    --theme-primary-foreground: #ffffff;

    /* Surfaces & Borders */
    --theme-bg: #ffffff;
    --theme-surface: #f8fafc;
    --theme-border: #e2e8f0;

    /* Card & Button Radii */
    --theme-radius-card: 1.25rem;
    --theme-radius-btn: 0.75rem;
}
```

Every Tailwind utility (`bg-primary`, `border-border`, `text-heading`, `bento-card`, etc.) updates automatically without touching React components or JSX classes.

---

## 📦 Installation & Creation

You can create new applications using this starter kit through the **Laravel Installer**, **Composer**, or **Git**:

### Option 1: Via Laravel Installer (Recommended)

Once published on Packagist:
```bash
laravel new my-app --using=shabeer-dev/filament-headless-starter
```

Or directly using the GitHub repository:
```bash
laravel new my-app --using="https://github.com/shabeer-dev/filament-headless-starter"
```

### Option 2: Via Composer `create-project`
```bash
composer create-project shabeer-dev/filament-headless-starter my-app --stability=dev
```

### Option 3: Via Git Clone
```bash
git clone https://github.com/shabeer-dev/filament-headless-starter.git my-app
cd my-app
composer run setup
composer run dev
```

---

## 🚀 Quick Start & Admin Access

### 1. Automated Setup
Running `composer run setup` handles the entire bootstrap process:
- Copies `.env.example` to `.env` (with SQLite driver pre-configured)
- Generates `APP_KEY`
- Creates SQLite database file
- Migrates and seeds initial multi-lingual content (`en`, `ar`, `es`)
- Builds frontend Vite assets

### 2. Launch Development
```bash
composer run dev
```
*Runs Laravel server, Queue worker, and Vite dev server concurrently with a single command.*

### 3. Default Admin CMS Access
- **URL:** `http://localhost:8000/admin` (or `http://my-app.test/admin` on Laragon / Herd)
- **Email:** `admin@example.com`
- **Password:** `password`

---

## 🎯 Architectural Highlights

- **The Singleton Resource Pattern:** Eliminates awkward 1-row data tables for landing pages (Home, About, Contact). Admins clicking a page in the sidebar jump straight into editing record ID 1.
- **Universal Multi-Lingual Architecture:** Content is stored as JSON in the database with Spatie Translatable. Filament forms feature an inline locale switcher, while Eloquent models automatically serialize into flat localized strings for the active locale.
- **Perpetual Caching with Instant Invalidation:** Frontend page requests are cached indefinitely (`Cache::rememberForever()`) across all locales. Eloquent `ContentObserver` hooks instantly purge cached variants on admin saves.
- **Modern Bento SaaS Layout:** Clean floating glass navbar, radial gradient hero, 6-card bento grid showcase, and modernized legal/compliance pages.
- **Media Library Integration:** Powered by `spatie/laravel-medialibrary` with dedicated collections (`hero`, `overview`, `media`) rather than fragile static file paths.
- **Autonomous CLI Scaffolding:** Custom Artisan generators (`make:headless-page` and `make:headless-collection`) create complete end-to-end features in seconds.
- **Preconfigured Anti-Spam & Security:** Spatie Honeypot + Cloudflare Turnstile captcha + rate limiting pre-wired for inquiry forms.

---

## 🛠️ CLI Scaffolding Commands

### 1. Generate a Singleton Page (Marketing / Landing Page)
```bash
php artisan make:headless-page Services
```
**Generates:**
- `database/migrations/*_create_page_services_table.php` (with translatable JSON and SEO fields)
- `app/Models/PageServices.php` (translatable model with cache invalidation)
- `database/seeders/PageServicesSeeder.php` (seeds row 1 with EN, AR, ES copy)
- `app/Filament/Resources/PageServicesResource.php` (direct-edit singleton view)
- `app/Http/Controllers/Page/ServicesController.php` (Inertia controller)
- `resources/js/pages/Services.tsx` (React 19 bento template)
- `resources/js/types/content.ts` (adds `PageServices` TypeScript interface)
- `routes/web.php` (registers route under `{locale}` prefix)

### 2. Generate a Multi-Record Collection (Blog, Projects, Catalog)
```bash
php artisan make:headless-collection Project
```
**Generates:**
- `database/migrations/*_create_projects_table.php` (with status, publishing date, translatable content)
- `app/Models/Project.php`
- `database/seeders/ProjectSeeder.php`
- `app/Filament/Resources/ProjectResource.php` (full CRUD with List, Create, Edit)
- `app/Http/Controllers/ProjectController.php` (index & show actions)
- `resources/js/pages/Projects/Index.tsx` & `Show.tsx`
- `resources/js/types/content.ts` (adds `Project` interface)
- `routes/web.php` (registers index and show routes)

---

## 🔄 Automatic Package Versioning

Because this repository is a starter template (`"type": "project"`) without a committed `composer.lock` file, Composer resolves all dependencies freshly upon each installation:

- **Laravel Framework:** Specified as `"laravel/framework": "^13.7"`. Composer downloads the newest stable Laravel 13 release.
- **Filament v5:** Specified as `"filament/filament": "^5.0"`.
- **Inertia v3:** Specified as `"inertiajs/inertia-laravel": "^3.0"`.
- **Frontend Dependencies:** `npm install` pulls matching React 19 and Tailwind CSS v4 packages per semantic versioning (`^`).

To update all packages to their latest versions after installation at any time:
```bash
composer update
npm update
```

---

## 🌐 Publishing to Packagist (Step-by-Step)

To make this starter kit publicly installable via `laravel new my-app --using=your-vendor/starter`:

1. **Push your repository to GitHub**:
   ```bash
   git remote add origin https://github.com/shabeer-dev/filament-headless-starter.git
   git branch -M master
   git push -u origin master
   git push --tags
   ```
2. **Submit to Packagist**:
   - Go to [packagist.org](https://packagist.org) and log in.
   - Click **Submit**.
   - Paste repository URL: `https://github.com/shabeer-dev/filament-headless-starter`.
   - Click **Check** and then **Submit**.
3. **Enable Auto-Updates (GitHub Webhook)**:
   - Copy your API token from your Packagist profile.
   - On GitHub, go to **Settings** > **Webhooks** > **Add webhook**.
   - Set Payload URL to: `https://packagist.org/api/github?username=shabeer-dev`
   - Content type: `application/json`
   - Secret: your Packagist API token.

---

## 🤖 AI Agent Guidelines

This boilerplate includes built-in guidelines and skills for **Google Antigravity / Gemini**, **Claude Code**, and **Cursor/Windsurf**:
- `GEMINI.md`: Full architectural context, Filament v5 patterns, and Inertia v3 conventions.
- `.agents/skills/headless-architecture/`: Deep reference on patterns, models, and cache invalidation.
- `.agents/skills/headless-page-scaffolding/`: Step-by-step instructions for AI agents generating new pages.

---

## 🧪 Testing & Code Quality

```bash
# Run Pest test suite (9 tests, 36 assertions)
php artisan test

# Format PHP code to Laravel Pint standard
vendor/bin/pint --format agent

# Typecheck React components
npm run types:check

# Production Vite build
npm run build
```

---

## 📄 License

Open-source software licensed under the [MIT license](LICENSE).
