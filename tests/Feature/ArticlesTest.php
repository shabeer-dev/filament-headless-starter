<?php

use App\Models\Article;
use Illuminate\Support\Facades\Cache;

beforeEach(function () {
    Cache::flush();
});

test('articles index resolves with 200 ok', function () {
    Article::create([
        'title' => ['en' => 'Test Article', 'ar' => 'مقال تجريبي'],
        'slug' => 'test-article',
        'excerpt' => ['en' => 'Test excerpt'],
        'content' => ['en' => '<p>Test content</p>'],
        'status' => 'published',
        'published_at' => now(),
    ]);

    $response = $this->get(route('articles.index', ['locale' => 'en']));
    $response->assertOk();
});

test('article show resolves with published slug', function () {
    Article::create([
        'title' => ['en' => 'Detailed Article', 'ar' => 'مقال مفصل'],
        'slug' => 'detailed-article',
        'content' => ['en' => '<p>Deep dive content</p>'],
        'status' => 'published',
        'published_at' => now(),
    ]);

    $response = $this->get(route('articles.show', ['locale' => 'en', 'slug' => 'detailed-article']));
    $response->assertOk();
});
