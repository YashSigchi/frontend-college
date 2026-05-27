'use client';

export function CollegeCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="aspect-[16/10] bg-muted animate-shimmer" />
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-muted rounded-lg w-3/4 animate-shimmer" />
          <div className="h-5 w-16 bg-muted rounded-full animate-shimmer" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded-full w-20 animate-shimmer" />
          <div className="h-6 bg-muted rounded-full w-20 animate-shimmer" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-12 bg-muted rounded-lg animate-shimmer" />
          <div className="h-12 bg-muted rounded-lg animate-shimmer" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-muted rounded-lg flex-1 animate-shimmer" />
          <div className="h-10 w-24 bg-muted rounded-lg animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function CollegeListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <CollegeCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CollegeDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-96 bg-muted rounded-xl" />
      <div className="grid grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-muted rounded-lg" />
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-32 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
        <div className="h-96 bg-muted rounded" />
      </div>
    </div>
  );
}
