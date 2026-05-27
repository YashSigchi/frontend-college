'use client';

import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function RatingBadge({ rating, reviews, size = 'md', showCount = true }: RatingBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5',
    lg: 'text-base gap-2',
  };

  const starSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className={`inline-flex items-center ${sizeClasses[size]}`}>
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${starSize[size]} fill-amber-400 text-amber-400 transition-transform duration-200 hover:scale-125`}
            style={{ animationDelay: `${i * 0.05}s` }}
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className={`${starSize[size]} text-gray-200 dark:text-gray-700`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={`${starSize[size]} fill-amber-400 text-amber-400`} />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={`${starSize[size]} text-gray-200 dark:text-gray-700`} />
        ))}
      </div>
      <span className="font-semibold text-foreground ml-1">{rating.toFixed(1)}</span>
      {showCount && reviews !== undefined && (
        <span className="text-muted-foreground ml-1">({reviews.toLocaleString()})</span>
      )}
    </div>
  );
}
