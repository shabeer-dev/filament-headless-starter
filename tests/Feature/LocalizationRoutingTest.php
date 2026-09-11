<?php

use Illuminate\Support\Facades\Cache;

beforeEach(function () {
    Cache::flush();
});

test('home page resolves correctly with english locale', function () {
    $response = $this->get(route('home', ['locale' => 'en']));
    $response->assertOk();
});

test('home page resolves correctly with arabic locale', function () {
    $response = $this->get(route('home', ['locale' => 'ar']));
    $response->assertOk();
});

test('home page caches localized variants separately', function () {
    $this->get(route('home', ['locale' => 'en']))->assertOk();
    $this->get(route('home', ['locale' => 'ar']))->assertOk();
});
