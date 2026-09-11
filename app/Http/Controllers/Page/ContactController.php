<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\ContentPageController;
use App\Models\Content\PageContact;

class ContactController extends ContentPageController
{
    protected function model(): string
    {
        return PageContact::class;
    }

    protected function component(): string
    {
        return 'Contact';
    }
}
