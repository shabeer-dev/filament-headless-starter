<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Content\PageAbout;
use App\Models\Content\PageContact;
use App\Models\Content\PageHome;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Home Page Singleton
        PageHome::updateOrCreate(
            ['id' => 1],
            [
                'hero_label' => ['en' => 'Next-Gen Architecture', 'ar' => 'هندسة الجيل القادم', 'es' => 'Arquitectura de Próxima Generación'],
                'hero_title' => ['en' => 'Headless CMS Meets Modern Web Speed', 'ar' => 'نظام إدارة المحتوى يقابل سرعة الويب الحديثة', 'es' => 'El CMS Headless se Une a la Velocidad Web'],
                'hero_highlighted' => ['en' => 'Modern Web Speed', 'ar' => 'سرعة الويب الحديثة', 'es' => 'Velocidad Web'],
                'hero_description' => [
                    'en' => 'Manage your content seamlessly through an intuitive Filament v5 admin panel while serving lightning-fast SPAs powered by Inertia.js v3, React 19, and Tailwind CSS v4.',
                    'ar' => 'قم بإدارة المحتوى الخاص بك بسلاسة عبر لوحة تحكم Filament v5 مع تقديم صفحات سريعة للغاية مدعومة بـ Inertia.js v3 و React 19 و Tailwind CSS v4.',
                    'es' => 'Administre su contenido sin problemas a través de Filament v5 mientras ofrece SPA ultrarrápidas con Inertia.js v3, React 19 y Tailwind CSS v4.',
                ],
                'hero_cta_primary' => ['en' => 'Explore Articles', 'ar' => 'استكشف المقالات', 'es' => 'Explorar Artículos'],
                'hero_cta_primary_route' => ['en' => 'articles.index', 'ar' => 'articles.index', 'es' => 'articles.index'],
                'hero_cta_secondary' => ['en' => 'Contact Us', 'ar' => 'اتصل بنا', 'es' => 'Contáctenos'],
                'hero_cta_secondary_route' => ['en' => 'contact', 'ar' => 'contact', 'es' => 'contact'],
                'stats' => [
                    ['label' => 'Sub-second Load Times', 'value' => '99', 'suffix' => '%'],
                    ['label' => 'Lighthouse Performance', 'value' => '100', 'suffix' => '/100'],
                    ['label' => 'Multi-Language Ready', 'value' => '3', 'suffix' => ' Locales'],
                    ['label' => 'Zero List Bloat', 'value' => '100', 'suffix' => '% Singleton'],
                ],
                'features' => [
                    [
                        'title' => 'Singleton CMS Paradigm',
                        'description' => 'Eliminates confusing CRUD data tables for standard pages. Admins jump directly into editing the page content.',
                    ],
                    [
                        'title' => 'Infinite Cache Invalidation',
                        'description' => 'Content queries are cached forever and instantly invalidated across all locales on model save via Eloquent Observers.',
                    ],
                    [
                        'title' => 'Native React 19 & Tailwind v4',
                        'description' => 'Built with the latest front-end standards including React compiler optimization and CSS variable-driven theming.',
                    ],
                ],
                'footer_cta_title' => ['en' => 'Ready to build your next application?', 'ar' => 'هل أنت مستعد لبناء مشروعك القادم؟', 'es' => '¿Listo para construir su próxima aplicación?'],
                'footer_cta_button' => ['en' => 'Get in Touch', 'ar' => 'تواصل معنا', 'es' => 'Póngase en Contacto'],
                'footer_cta_route' => ['en' => 'contact', 'ar' => 'contact', 'es' => 'contact'],
            ]
        );

        // 2. About Page Singleton
        PageAbout::updateOrCreate(
            ['id' => 1],
            [
                'hero_label' => ['en' => 'About The Platform', 'ar' => 'عن المنصة', 'es' => 'Acerca de la Plataforma'],
                'hero_title' => ['en' => 'Engineered for Developers & Content Teams', 'ar' => 'مصمم للمطورين وفرق إدارة المحتوى', 'es' => 'Diseñado para Desarrolladores'],
                'hero_highlighted' => ['en' => 'Content Teams', 'ar' => 'فرق إدارة المحتوى', 'es' => 'Equipos de Contenido'],
                'hero_description' => [
                    'en' => 'We bridged the gap between developer happiness and non-technical client autonomy using Laravel and React.',
                    'ar' => 'قمنا بردم الفجوة بين راحة المطورين واستقلالية العملاء باستخدام Laravel و React.',
                    'es' => 'Cerramos la brecha entre el desarrollo ágil y la autonomía del cliente utilizando Laravel y React.',
                ],
                'story_title' => ['en' => 'Our Core Mission', 'ar' => 'مهمتنا الأساسية', 'es' => 'Nuestra Misión Principal'],
                'story_description' => [
                    'en' => "Traditional CMS platforms often force compromises between rigid templates and developer agility.\n\nThis starter architecture provides absolute frontend design freedom while delivering a polished, foolproof administration panel where clients cannot accidentally break routes or delete critical pages.",
                    'ar' => 'توفر هذه البنية حرية كاملة في تصميم الواجهة الأمامية مع تقديم لوحة تحكم سهلة وآمنة للعملاء.',
                    'es' => 'Esta arquitectura inicial proporciona total libertad de diseño frontend a la vez que ofrece un panel de administración seguro y pulido.',
                ],
                'core_values' => [
                    ['title' => 'Performance First', 'description' => 'Optimized media delivery, automatic format conversion, and perpetual localized caching.'],
                    ['title' => 'Total Type Safety', 'description' => 'Full TypeScript contracts and auto-generated route helpers via Laravel Wayfinder.'],
                    ['title' => 'Seamless Multilingualism', 'description' => 'Universal JSON translations with automatic fallback to English whenever translations are pending.'],
                ],
                'milestones' => [
                    ['year' => 'v1.0', 'title' => 'Foundational Release', 'description' => 'Initial headless singleton architecture with Filament and Inertia.'],
                    ['year' => 'v2.0', 'title' => 'Tailwind v4 & React 19', 'description' => 'Upgraded frontend compiler pipeline with zero-runtime CSS variables.'],
                    ['year' => 'v3.0', 'title' => 'Autonomous AI Scaffolding', 'description' => 'Embedded Artisan commands and deep Antigravity agent integration.'],
                ],
                'footer_cta_title' => ['en' => 'Have questions or feedback?', 'ar' => 'هل لديك أسئلة أو اقتراحات؟', 'es' => '¿Tiene preguntas o sugerencias?'],
                'footer_cta_button' => ['en' => 'Contact Support', 'ar' => 'الدعم الفني', 'es' => 'Contactar Soporte'],
                'footer_cta_route' => ['en' => 'contact', 'ar' => 'contact', 'es' => 'contact'],
            ]
        );

        // 3. Contact Page Singleton
        PageContact::updateOrCreate(
            ['id' => 1],
            [
                'hero_label' => ['en' => 'Reach Out', 'ar' => 'تواصل معنا', 'es' => 'Contacto'],
                'hero_title' => ['en' => 'We’d Love to Hear From You', 'ar' => 'يسعدنا دائماً الاستماع إليك', 'es' => 'Nos Encantaría Saber de Usted'],
                'hero_highlighted' => ['en' => 'Hear From You', 'ar' => 'الاستماع إليك', 'es' => 'Saber de Usted'],
                'hero_description' => [
                    'en' => 'Have an inquiry, project proposal, or need technical support? Send us a message and our team will get back to you promptly.',
                    'ar' => 'هل لديك استفسار أو اقتراح مشروع؟ أرسل لنا رسالة وسيقوم فريقنا بالرد عليك سريعًا.',
                    'es' => '¿Tiene una consulta o propuesta de proyecto? Envíenos un mensaje y responderemos a la brevedad.',
                ],
                'form_headline' => ['en' => 'Send Us a Direct Message', 'ar' => 'أرسل لنا رسالة مباشرة', 'es' => 'Envíenos un Mensaje Directo'],
                'contact_email' => ['en' => 'hello@example.com', 'ar' => 'hello@example.com', 'es' => 'hello@example.com'],
                'contact_phone' => ['en' => '+1 (555) 234-5678', 'ar' => '+1 (555) 234-5678', 'es' => '+1 (555) 234-5678'],
                'contact_address' => ['en' => '100 Innovation Way, Suite 400, Tech Valley, CA', 'ar' => '100 Innovation Way, Suite 400, Tech Valley, CA', 'es' => '100 Innovation Way, Suite 400, Tech Valley, CA'],
                'business_hours' => ['en' => 'Monday - Friday: 9:00 AM - 6:00 PM', 'ar' => 'الإثنين - الجمعة: 9:00 صباحًا - 6:00 مساءً', 'es' => 'Lunes - Viernes: 9:00 AM - 6:00 PM'],
            ]
        );

        // 4. Sample Articles
        $articles = [
            [
                'title' => [
                    'en' => 'Demystifying the Headless Filament Architecture',
                    'ar' => 'شرح بنية فيلامينت المنفصلة (Headless Filament)',
                    'es' => 'Desmitificando la Arquitectura Headless con Filament',
                ],
                'slug' => 'demystifying-the-headless-filament-architecture',
                'excerpt' => [
                    'en' => 'How treating Filament as a decoupled CMS for Inertia.js SPAs produces ultra-fast, client-proof web applications.',
                    'ar' => 'كيف يؤدي استخدام فيلامينت كإدارة محتوى منفصلة لـ Inertia.js إلى بناء تطبيقات فائقة السرعة.',
                    'es' => 'Cómo el uso de Filament como CMS desacoplado para SPA con Inertia.js produce aplicaciones ultrarrápidas.',
                ],
                'content' => [
                    'en' => '<p>Traditional content management systems blur the line between content storage and frontend rendering. By implementing the <strong>Singleton Resource pattern</strong> in Filament v5 and streaming data through Inertia v3 to React 19, we achieve absolute design fidelity without compromising CMS ergonomics.</p><p>Key benefits include zero-list navigation for fixed pages, instant multi-locale switching, and automated perpetual caching.</p>',
                    'ar' => '<p>تجمع هذه البنية بين أفضل ما في العالمين: واجهة أمامية حديثة وسريعة عبر React، ولوحة تحكم قوية وسهلة عبر Filament.</p>',
                    'es' => '<p>Esta arquitectura combina lo mejor de ambos mundos: un frontend moderno y veloz mediante React y un panel administrativo robusto y accesible con Filament.</p>',
                ],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => [
                    'en' => 'High-Speed Multilingual Caching Strategies with Laravel & Redis',
                    'ar' => 'استراتيجيات التخزين المؤقت متعدد اللغات مع Laravel و Redis',
                    'es' => 'Estrategias de Caché Multilingüe de Alta Velocidad con Laravel',
                ],
                'slug' => 'high-speed-multilingual-caching-strategies',
                'excerpt' => [
                    'en' => 'Learn how our ContentObserver automatically handles infinite cache lifetimes and instantaneous cache flushes upon administrative saves.',
                    'ar' => 'تعرف على كيفية قيام المراقب (Observer) بإدارة دورة حياة التخزين المؤقت وتحديثه فوريًا عند الحفظ.',
                    'es' => 'Aprenda cómo nuestro Observer maneja automáticamente la vida útil del caché y su invalidación instantánea.',
                ],
                'content' => [
                    'en' => '<p>Serving localized content at sub-50ms response times requires avoiding repeated database deserialization. Using <code>Cache::rememberForever()</code> in <code>ContentPageController</code> alongside <code>ContentObserver</code> provides the optimal balance of read performance and write safety.</p>',
                    'ar' => '<p>يسمح التخزين الدائم للبيانات المترجمة بالوصول إلى سرعات استجابة قياسية دون استهلاك موارد قاعدة البيانات.</p>',
                    'es' => '<p>El almacenamiento en caché persistente de datos traducidos permite alcanzar tiempos de respuesta récord sin sobrecargar la base de datos.</p>',
                ],
                'status' => 'published',
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => [
                    'en' => 'Next Steps: Generating Custom Pages with Artisan CLI',
                    'ar' => 'الخطوات التالية: إنشاء صفحات مخصصة عبر سطر الأوامر',
                    'es' => 'Próximos Pasos: Generación de Páginas con Artisan CLI',
                ],
                'slug' => 'generating-custom-pages-with-artisan-cli',
                'excerpt' => [
                    'en' => 'Discover how `make:headless-page` and `make:headless-collection` scaffold full vertical slices in seconds.',
                    'ar' => 'اكتشف كيف تقوم الأوامر المخصصة بإنشاء الشرائح الكاملة في ثوانٍ معدودة.',
                    'es' => 'Descubra cómo los comandos Artisan generan slices verticales completas en cuestión de segundos.',
                ],
                'content' => [
                    'en' => '<p>Developers and AI agents can execute <code>php artisan make:headless-page Services</code> to generate the migration, seeder, model, Filament resource, controller, React page, and TypeScript interfaces in one step.</p>',
                    'ar' => '<p>يمكن للمطورين والوكلاء الذكيين تشغيل أمر واحد لبناء الصفحة بالكامل عبر جميع الطبقات البرمجية.</p>',
                    'es' => '<p>Los desarrolladores y agentes de IA pueden ejecutar un solo comando para construir la página completa a través de todas las capas.</p>',
                ],
                'status' => 'published',
                'published_at' => now()->subDays(5),
            ],
        ];

        foreach ($articles as $article) {
            Article::updateOrCreate(['slug' => $article['slug']], $article);
        }
    }
}
