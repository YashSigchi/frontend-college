'use client';

import { User, Calendar, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RatingBadge, SectionHeader, EmptyState } from '@/components/shared';
import { Review } from '@/types/college';

interface ReviewsSectionProps {
  reviews: Review[];
  collegeName: string;
}

export function ReviewsSection({ reviews, collegeName }: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return (
      <div>
        <SectionHeader title="Reviews" />
        <EmptyState
          title="No reviews yet"
          description={`Be the first to share your experience at ${collegeName}`}
          icon="question"
        />
      </div>
    );
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div>
      <SectionHeader
        title="Reviews"
        subtitle={`${reviews.length} student reviews`}
      />

      {/* Average Rating Card */}
      <Card className="mb-6 group hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Overall Rating</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold gradient-text-warm">{avgRating.toFixed(1)}</span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-amber-500" />
            </div>
          </div>
          <div className="mt-4">
            <RatingBadge rating={avgRating} size="lg" showCount={false} />
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <Card
            key={review.id}
            className="hover:shadow-md transition-all duration-300 border-0 shadow-sm opacity-0 animate-reveal"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-chart-4/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{review.studentName}</p>
                    <p className="text-sm text-muted-foreground">{review.batch}</p>
                  </div>
                </div>
                <RatingBadge rating={review.rating} size="sm" showCount={false} />
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">{review.comment}</p>

              {review.pros.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                    <ThumbsUp className="w-4 h-4" />
                    Pros
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {review.pros.map((pro, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors">
                        {pro}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {review.cons.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-red-500 dark:text-red-400 mb-2">
                    <ThumbsDown className="w-4 h-4" />
                    Cons
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {review.cons.map((con, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-red-500/5 text-red-500 dark:text-red-400 hover:bg-red-500/10 transition-colors">
                        {con}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-4 pt-3 border-t border-border/50">
                <Calendar className="w-3 h-3" />
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
