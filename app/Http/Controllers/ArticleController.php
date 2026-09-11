<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(): Response
    {
        $articles = Article::published()
            ->with(['media', 'seo'])
            ->latest('published_at')
            ->paginate(9);

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
        ]);
    }

    public function show(Request $request, string $locale, string $slug): Response
    {
        $article = Article::where('slug', $slug)
            ->with(['media', 'seo'])
            ->firstOrFail();

        return Inertia::render('Articles/Show', [
            'article' => $article,
        ]);
    }
}
