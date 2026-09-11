<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactSubmitRequest;
use App\Models\Inquiry;
use App\Notifications\NewInquiryNotification;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{
    public function submit(ContactSubmitRequest $request)
    {
        $validated = $request->safe()->except(['cf-turnstile-response']);

        $inquiry = Inquiry::create($validated);

        if ($adminEmail = config('mail.admin_address', config('mail.from.address'))) {
            Notification::route('mail', $adminEmail)->notify(new NewInquiryNotification($inquiry));
        }

        return back()->with('success', 'Your inquiry has been submitted successfully.');
    }
}
