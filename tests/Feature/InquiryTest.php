<?php

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Notification;
use romanzipp\Turnstile\Rules\TurnstileCaptcha;

test('contact submission requires name, email, and message', function () {
    $response = $this->post(route('contact.submit'), []);
    $response->assertSessionHasErrors(['name', 'email', 'message']);
});

test('valid contact submission creates database inquiry record', function () {
    Notification::fake();

    app()->bind(TurnstileCaptcha::class, function () {
        return new class implements ValidationRule
        {
            public function validate(string $attribute, mixed $value, Closure $fail): void {}
        };
    });

    $response = $this->post(route('contact.submit'), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'message' => 'Hello, I would like to learn more about your services.',
        'cf-turnstile-response' => 'dummy-token',
    ]);

    $response->assertSessionHasNoErrors();
    $response->assertRedirect();

    $this->assertDatabaseHas('inquiries', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'is_read' => false,
    ]);
});
