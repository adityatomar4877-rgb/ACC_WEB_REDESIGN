import type { Metadata, Viewport } from 'next';
import './globals.css';
import StyledJsxRegistry from './registry';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

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
  themeColor: '#FFFFFF'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledJsxRegistry>
          <CustomCursor />
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
