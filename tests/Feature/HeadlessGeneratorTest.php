<?php

use Illuminate\Support\Facades\File;

function cleanupGeneratedArtifacts(): void
{
    // Clean up test page files
    $pageMigration = glob(database_path('migrations/*_create_page_sample_test_table.php'));
    foreach ($pageMigration as $file) {
        File::delete($file);
    }
    File::delete(app_path('Models/Content/PageSampleTest.php'));
    File::delete(database_path('seeders/PageSampleTestSeeder.php'));
    File::deleteDirectory(app_path('Filament/Resources/Content/SampleTestPage'));
    File::delete(app_path('Http/Controllers/Page/SampleTestController.php'));
    File::delete(resource_path('js/pages/SampleTest.tsx'));

    // Clean up test collection files
    $collectionMigration = glob(database_path('migrations/*_create_sample_items_table.php'));
    foreach ($collectionMigration as $file) {
        File::delete($file);
    }
    File::delete(app_path('Models/SampleItem.php'));
    File::delete(database_path('seeders/SampleItemsSeeder.php'));
    File::delete(app_path('Filament/Resources/SampleItemResource.php'));
    File::deleteDirectory(app_path('Filament/Resources/SampleItems'));
    File::delete(app_path('Http/Controllers/SampleItemController.php'));
    File::deleteDirectory(resource_path('js/pages/SampleItems'));

    // Clean up routes in web.php
    $webPath = base_path('routes/web.php');
    if (File::exists($webPath)) {
        $web = File::get($webPath);
        $web = preg_replace('/.*sample-test.*\n?/', '', $web);
        $web = preg_replace('/.*sample-items.*\n?/', '', $web);
        File::put($webPath, $web);
    }

    // Clean up content.ts
    $typesPath = resource_path('js/types/content.ts');
    if (File::exists($typesPath)) {
        $types = File::get($typesPath);
        $types = preg_replace('/\n*export interface PageSampleTest[\s\S]*?\n\}/', '', $types);
        $types = preg_replace('/\n*export interface SampleItem[\s\S]*?\n\}/', '', $types);
        File::put($typesPath, $types);
    }
}

beforeEach(function () {
    cleanupGeneratedArtifacts();
});

afterEach(function () {
    cleanupGeneratedArtifacts();
});

test('make:headless-page command generates complete singleton vertical slice', function () {
    $this->artisan('make:headless-page', ['name' => 'SampleTest', '--force' => true])
        ->assertSuccessful();

    // Verify Model
    expect(File::exists(app_path('Models/Content/PageSampleTest.php')))->toBeTrue();
    $modelContent = File::get(app_path('Models/Content/PageSampleTest.php'));
    expect($modelContent)->toContain('class PageSampleTest extends Model implements HasMedia');
    expect($modelContent)->toContain('$table = \'page_sample_test\'');

    // Verify Filament Resource & Page
    expect(File::exists(app_path('Filament/Resources/Content/SampleTestPage/SampleTestPageResource.php')))->toBeTrue();
    expect(File::exists(app_path('Filament/Resources/Content/SampleTestPage/Pages/ManageSampleTestPage.php')))->toBeTrue();

    // Verify Controller
    expect(File::exists(app_path('Http/Controllers/Page/SampleTestController.php')))->toBeTrue();

    // Verify React Page
    expect(File::exists(resource_path('js/pages/SampleTest.tsx')))->toBeTrue();

    // Verify Seeder
    expect(File::exists(database_path('seeders/PageSampleTestSeeder.php')))->toBeTrue();

    // Verify Migration
    $migrations = glob(database_path('migrations/*_create_page_sample_test_table.php'));
    expect($migrations)->not->toBeEmpty();
});

test('make:headless-collection command generates complete collection vertical slice', function () {
    $this->artisan('make:headless-collection', ['name' => 'SampleItem', '--force' => true])
        ->assertSuccessful();

    // Verify Model
    expect(File::exists(app_path('Models/SampleItem.php')))->toBeTrue();
    $modelContent = File::get(app_path('Models/SampleItem.php'));
    expect($modelContent)->toContain('class SampleItem extends Model implements HasMedia');
    expect($modelContent)->toContain('$table = \'sample_items\'');

    // Verify Filament Resource & Pages
    expect(File::exists(app_path('Filament/Resources/SampleItemResource.php')))->toBeTrue();
    expect(File::exists(app_path('Filament/Resources/SampleItems/Pages/ListSampleItems.php')))->toBeTrue();
    expect(File::exists(app_path('Filament/Resources/SampleItems/Pages/CreateSampleItem.php')))->toBeTrue();
    expect(File::exists(app_path('Filament/Resources/SampleItems/Pages/EditSampleItem.php')))->toBeTrue();

    // Verify Controller
    expect(File::exists(app_path('Http/Controllers/SampleItemController.php')))->toBeTrue();

    // Verify React Pages
    expect(File::exists(resource_path('js/pages/SampleItems/Index.tsx')))->toBeTrue();
    expect(File::exists(resource_path('js/pages/SampleItems/Show.tsx')))->toBeTrue();

    // Verify Seeder
    expect(File::exists(database_path('seeders/SampleItemsSeeder.php')))->toBeTrue();

    // Verify Migration
    $migrations = glob(database_path('migrations/*_create_sample_items_table.php'));
    expect($migrations)->not->toBeEmpty();
});
