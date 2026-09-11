<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\ContentPageController;
use App\Models\Content\PageHome;

class HomeController extends ContentPageController
{
    protected function model(): string
    {
        return PageHome::class;
    }

    protected function component(): string
    {
        return 'Home';
    }
}
