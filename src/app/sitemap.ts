import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amitycodingclub.tech';
  const lastModified = new Date();

  const routes = [
    { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/events', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/team', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/join', changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
