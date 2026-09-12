<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Process;

class InstallStarterCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'starter:install
                            {--skip-npm : Skip installing and building NPM packages}
                            {--skip-seed : Skip seeding database content}
                            {--fresh : Run migrate:fresh instead of migrate}
                            {--force : Force the operation without confirmation}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fully configure and initialize the Filament Headless Starter Kit';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('');
        $this->info('⚡ Initializing Filament v5 Headless Starter Kit...');
        $this->info('');

        // 1. Environment file (.env)
        $this->ensureEnvironmentFile();

        // 2. Application key
        $this->ensureApplicationKey();

        // 3. Database initialization (SQLite support)
        $this->ensureDatabaseExists();

        // 4. Migrations & Seeders
        $this->runDatabaseMigrations();

        // 5. Storage Symlink
        $this->ensureStorageLink();

        // 6. Node dependencies & Build
        if (! $this->option('skip-npm') && ! env('LARAVEL_INSTALLER_NO_NODE')) {
            $this->buildFrontendAssets();
        }

        $this->showSuccessBanner();

        return self::SUCCESS;
    }

    protected function ensureEnvironmentFile(): void
    {
        $envPath = base_path('.env');
        $examplePath = base_path('.env.example');

        if (! File::exists($envPath) && File::exists($examplePath)) {
            File::copy($examplePath, $envPath);
            $this->line(' <info>✓</info> Environment file copied (.env)');
        }
    }

    protected function ensureApplicationKey(): void
    {
        if (empty(config('app.key'))) {
            Artisan::call('key:generate', ['--force' => true]);
            $this->line(' <info>✓</info> Application key generated');
        }
    }

    protected function ensureDatabaseExists(): void
    {
        $connection = config('database.default', 'sqlite');

        if ($connection === 'sqlite') {
            $dbPath = config('database.connections.sqlite.database', database_path('database.sqlite'));

            if ($dbPath !== ':memory:' && ! File::exists($dbPath)) {
                File::ensureDirectoryExists(dirname($dbPath));
                File::put($dbPath, '');
                $this->line(' <info>✓</info> SQLite database created: '.basename($dbPath));
            }
        }
    }

    protected function runDatabaseMigrations(): void
    {
        $command = $this->option('fresh') ? 'migrate:fresh' : 'migrate';

        $this->line(' <comment>→</comment> Running database migrations...');
        Artisan::call($command, ['--force' => true]);
        $this->line(' <info>✓</info> Database tables migrated');

        if (! $this->option('skip-seed')) {
            $this->line(' <comment>→</comment> Seeding placeholder multilingual content and admin user...');
            Artisan::call('db:seed', ['--force' => true]);
            $this->line(' <info>✓</info> Database seeded with initial pages, articles, and admin account');
        }
    }

    protected function ensureStorageLink(): void
    {
        $publicStorage = public_path('storage');

        if (! File::exists($publicStorage)) {
            Artisan::call('storage:link');
            $this->line(' <info>✓</info> Public storage symlink created');
        }
    }

    protected function buildFrontendAssets(): void
    {
        $nodePackageManager = $this->detectPackageManager();

        $this->line(" <comment>→</comment> Installing frontend packages with {$nodePackageManager}...");

        $installResult = Process::timeout(300)->run("{$nodePackageManager} install");

        if ($installResult->successful()) {
            $this->line(' <info>✓</info> Node packages installed');

            $this->line(' <comment>→</comment> Compiling production assets with Vite...');
            $buildResult = Process::timeout(300)->run("{$nodePackageManager} run build");

            if ($buildResult->successful()) {
                $this->line(' <info>✓</info> Vite production build compiled');
            } else {
                $this->warn(' ⚠ Vite build failed. You can run "npm run build" manually later.');
            }
        } else {
            $this->warn(' ⚠ Node package installation skipped or failed. Run "npm install" manually.');
        }
    }

    protected function detectPackageManager(): string
    {
        if (File::exists(base_path('pnpm-lock.yaml'))) {
            return 'pnpm';
        }

        if (File::exists(base_path('yarn.lock'))) {
            return 'yarn';
        }

        if (File::exists(base_path('bun.lockb')) || File::exists(base_path('bun.lock'))) {
            return 'bun';
        }

        return 'npm';
    }

    protected function showSuccessBanner(): void
    {
        $this->info('');
        $this->info('===========================================================');
        $this->info(' 🚀 Headless Starter Kit installed successfully! ');
        $this->info('===========================================================');
        $this->line('');
        $this->line(' <options=bold>Admin Panel:</>  '.url('/admin'));
        $this->line(' <options=bold>Email:</>        admin@example.com');
        $this->line(' <options=bold>Password:</>     password');
        $this->line('');
        $this->line(' <options=bold>Quick Start Development Server:</>');
        $this->line('   <comment>composer run dev</comment>');
        $this->line('');
        $this->line(' <options=bold>Scaffold New Pages & Collections:</>');
        $this->line('   <comment>php artisan make:headless-page {PageName}</comment>');
        $this->line('   <comment>php artisan make:headless-collection {CollectionName}</comment>');
        $this->info('===========================================================');
        $this->info('');
    }
}
