<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\ContentPageController;
use App\Models\Content\PageAbout;

class AboutController extends ContentPageController
{
    protected function model(): string
    {
        return PageAbout::class;
    }

    protected function component(): string
    {
        return 'About';
    }
}
