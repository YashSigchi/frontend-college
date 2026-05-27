'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header, Footer } from '@/components/layout';
import { CompareTable } from '@/components/compare';
import { EmptyState } from '@/components/shared';
import { useCompare } from '@/lib/CompareContext';

export default function ComparePage() {
  const { selectedColleges, removeFromCompare, clearAll } = useCompare();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="glass border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4 animate-slide-up">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold">Compare Colleges</h1>
                </div>
                <p className="text-sm text-muted-foreground ml-[68px]">
                  Select up to 3 colleges and compare them side-by-side
                </p>
              </div>
              {selectedColleges.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearAll}
                  className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {selectedColleges.length === 0 ? (
            <div className="animate-fade-in">
              <Card className="border-dashed border-2">
                <CardContent className="p-0">
                  <EmptyState
                    title="No colleges selected"
                    description="Head back to the colleges page and select up to 3 colleges to compare them side by side"
                    icon="question"
                    action={{
                      label: 'Browse Colleges',
                      onClick: () => window.location.href = '/',
                    }}
                  />
                </CardContent>
              </Card>

              {/* Quick Add Suggestions */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-lg">Popular Comparisons</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['IIT Delhi vs IIT Bombay', 'NIT Trichy vs NITK Surathkal', 'BITS Pilani vs VIT Vellore'].map((comparison, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-all duration-200 cursor-pointer group">
                      <CardContent className="p-4 flex items-center justify-between">
                        <span className="text-sm font-medium">{comparison}</span>
                        <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Tip Card */}
              <div className="mb-6 animate-slide-up">
                <Card className="bg-primary/5 border-primary/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Tip:</span> Values highlighted in{' '}
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">green</span>{' '}
                        represent the best option for that category.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="animate-fade-in">
                <CompareTable colleges={selectedColleges} onRemove={removeFromCompare} />
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
