import type { Metadata, Viewport } from 'next';
import './globals.css';
import StyledJsxRegistry from './registry';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'Amity Coding Club • Build. Learn. Ship.',
  description: 'A community of builders, problem solvers, and engineers creating real-world impact through code at Amity University.',
  keywords: ['Amity Coding Club', 'ACC', 'developer community', 'hackathons', 'AI/ML', 'Next.js', 'open source'],
  authors: [{ name: 'Amity Coding Club' }]
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0D14'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('acc-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored ? stored : (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <StyledJsxRegistry>
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </StyledJsxRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}

