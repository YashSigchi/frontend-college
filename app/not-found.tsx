'use client';

import Link from 'next/link';
import { Home, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center animate-fade-in">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mx-auto">
            <SearchX className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-2xl -z-10" />
        </div>
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-xl font-bold mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button className="gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
