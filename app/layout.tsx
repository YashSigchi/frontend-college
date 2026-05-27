import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CompareProvider } from '@/lib/CompareContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import { ErrorBoundary } from '@/components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'College Discovery Platform - Find Your Dream College',
  description: 'Discover, compare, and choose the best colleges in India. Browse detailed information about top universities, courses, placements, and fees.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider>
            <CompareProvider>{children}</CompareProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
