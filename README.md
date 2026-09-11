# ⚡ Filament v5 Headless CMS + Inertia.js v3 + React 19 Starter Kit

[![Latest Version on Packagist](https://img.shields.io/packagist/v/shabeer-dev/filament-headless-starter.svg?style=flat-square)](https://packagist.org/packages/shabeer-dev/filament-headless-starter)
[![PHP Version](https://img.shields.io/badge/PHP-8.4%2B-blue.svg?style=flat-square)](https://php.net)
[![Laravel Version](https://img.shields.io/badge/Laravel-13.x-red.svg?style=flat-square)](https://laravel.com)
[![Filament Version](https://img.shields.io/badge/Filament-5.x-amber.svg?style=flat-square)](https://filamentphp.com)
[![Inertia React](https://img.shields.io/badge/Inertia%20React-v3%20%2B%20React%2019-61dafb.svg?style=flat-square)](https://inertiajs.com)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

An opinionated, production-ready enterprise starter template pairing **Filament v5 as a decoupled Headless CMS** with an **Inertia.js v3 + React 19 SPA** frontend styled with **Tailwind CSS v4** and typed with **Laravel Wayfinder**.

---

## 📦 Installation & Creation

You can create new applications using this starter kit through the **Laravel Installer**, **Composer**, or **Git**:

### Option 1: Via Laravel Installer (Recommended)

Once published to Packagist:
```bash
laravel new my-app --using=shabeer-dev/filament-headless-starter
```

Or directly via your GitHub repository URL (no Packagist required):
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

## 🔄 Automatic Package Versioning

> **Does this install the latest package versions?**
>
> **Yes.** Because this repository is a starter template (`"type": "project"`) without a committed `composer.lock` file, Composer resolves all dependencies freshly upon each installation:
>
> - **Laravel Framework:** Specified as `"laravel/framework": "^13.7"`. Composer automatically downloads the latest stable Laravel 13 release (e.g. 13.8, 13.9, etc.).
> - **Filament v5:** Specified as `"filament/filament": "^5.0"`. Composer pulls the latest Filament 5 release.
> - **Inertia v3:** Specified as `"inertiajs/inertia-laravel": "^3.0"`.
> - **Spatie Packages:** (`medialibrary`, `translatable`) automatically resolve to the newest compatible versions.
> - **Frontend dependencies:** `npm install` installs the latest matching React 19 and Tailwind CSS v4 packages per standard semantic versioning rules (`^`).

To update all packages to their latest versions after installation at any time:
```bash
composer update
npm update
```

---

## 🎯 Architectural Highlights

- **The Singleton Resource Pattern:** Bypasses confusing CRUD data tables for standard marketing pages (Home, About, Contact, Services). Admins clicking a page in the sidebar jump straight into editing record ID 1.
- **Universal Multi-Lingual Architecture:** Text blocks, lists, and repeatable items are stored as JSON in the database. Filament schemas feature an inline locale switcher, while models automatically deserialize into flat strings for the active locale.
- **Perpetual Caching with Auto-Invalidation:** Frontend requests are cached forever (`Cache::rememberForever()`) across every locale. Eloquent `ContentObserver` hooks instantly flush cached variants upon admin saves.
- **Media Management:** Powered by `spatie/laravel-medialibrary`, binding file uploads directly to dedicated collections rather than saving raw paths in table columns.
- **Autonomous AI & CLI Scaffolding:** Custom Artisan commands (`make:headless-page` and `make:headless-collection`) generate complete vertical slices (migration, seeder, model, Filament resource, controller, React page, TypeScript types, and routes) in one command.
- **Preconfigured Anti-Spam & Security:** Spatie Honeypot + Cloudflare Turnstile captcha + rate limiting pre-wired on inquiry submissions.

---

## 🚀 Quick Start & Admin Access

### 1. Prerequisites
- PHP 8.4+
- Composer 2+
- Node.js 20+ & npm

### 2. Initialization
```bash
# 1. Enter project
cd my-app

# 2. Run automated setup (copies .env, generates keys, migrates SQLite, seeds dummy content, builds assets)
composer run setup

# 3. Start development servers (Laravel serve + Queue worker + Vite dev concurrently)
composer run dev
```

### 3. Default Admin Credentials
- **URL:** `http://localhost:8000/admin` (or `http://my-app.test/admin` on Laragon/Valet)
- **Email:** `admin@example.com`
- **Password:** `password`

---

## 🛠️ CLI Scaffolding Commands

### 1. Generate a Singleton Page (Marketing / Landing Page)
```bash
php artisan make:headless-page Services
```
**Generates:**
- `database/migrations/*_create_page_services_table.php` (with translatable JSON content and SEO fields)
- `app/Models/PageServices.php` (with translatable & media traits)
- `database/seeders/PageServicesSeeder.php` (seeds row 1 with EN, AR, ES copy)
- `app/Filament/Resources/PageServicesResource.php` (singleton edit view)
- `app/Http/Controllers/Page/ServicesController.php` (Inertia controller)
- `resources/js/pages/Services.tsx` (React 19 template)
- `resources/js/types/content.ts` (adds `PageServices` TypeScript interface)
- `routes/web.php` (registers route in `{locale}` prefix)

### 2. Generate a Multi-Record Collection (Blog, Portfolio, Catalog)
```bash
php artisan make:headless-collection Project
```
**Generates:**
- `database/migrations/*_create_projects_table.php` (with status, publishing date, translatable content)
- `app/Models/Project.php`
- `database/seeders/ProjectSeeder.php`
- `app/Filament/Resources/ProjectResource.php` (full CRUD with List, Create, Edit)
- `app/Http/Controllers/ProjectController.php` (index & show)
- `resources/js/pages/Projects/Index.tsx` & `Show.tsx`
- `resources/js/types/content.ts` (adds `Project` interface)
- `routes/web.php` (registers index and show routes)

---

## 🌐 Publishing to Packagist (Step-by-Step)

If you wish to make this starter kit publicly installable via `laravel new my-app --using=your-vendor/starter`:

1. **Update `composer.json` metadata**:
   The package name is already set to:
   ```json
   "name": "shabeer-dev/filament-headless-starter",
   "description": "Filament v5 Headless CMS + Inertia v3 React 19 Starter Kit",
   ```
2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/shabeer-dev/filament-headless-starter.git
   git branch -M master
   git push -u origin master
   ```
3. **Submit to Packagist**:
   - Go to [packagist.org](https://packagist.org) and log in.
   - Click **Submit**.
   - Paste your GitHub repository URL: `https://github.com/shabeer-dev/filament-headless-starter`.
   - Click **Check** and then **Submit**.
4. **Enable Auto-Updates (GitHub Webhook)**:
   - On Packagist, copy your API token from your profile settings.
   - On your GitHub repo, go to **Settings** > **Webhooks** > **Add webhook**.
   - Set Payload URL to: `https://packagist.org/api/github?username=shabeer-dev`
   - Content type: `application/json`
   - Secret: your Packagist API token.

Once submitted, any developer can run:
```bash
laravel new my-project --using=shabeer-dev/filament-headless-starter
```

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
```

---

## 📄 License

Open-source software licensed under the [MIT license](LICENSE).
