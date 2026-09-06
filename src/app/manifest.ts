import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amity Coding Club',
    short_name: 'ACC',
    description: 'A community of builders, problem solvers, and engineers creating real-world impact through code at Amity University.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0D14',
    theme_color: '#0A0D14',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
