'use client';

import { MapPin, IndianRupee, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { RatingBadge } from '@/components/shared';
import { College } from '@/types/college';
import Link from 'next/link';
import Image from 'next/image';

interface CollegeCardProps {
  college: College;
  onCompare: (college: College) => void;
  isComparing: boolean;
  index?: number;
}

export function CollegeCard({ college, onCompare, isComparing, index = 0 }: CollegeCardProps) {
  const latestPlacement = college.placements[0];

  return (
    <Card className="group overflow-hidden card-hover card-shine border-0 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 opacity-0 animate-reveal">
      {/* Image Section */}
      <div className="relative aspect-[16/10] bg-muted overflow-hidden">
        <Image
          src={college.image}
          alt={college.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge
            variant={college.type === 'public' ? 'default' : 'secondary'}
            className="backdrop-blur-sm bg-white/90 dark:bg-black/60 text-foreground shadow-sm"
          >
            {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="bg-white/90 dark:bg-black/60 backdrop-blur-sm text-foreground border-0">
            Est. {college.established}
          </Badge>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-lg text-white line-clamp-1 drop-shadow-lg">
            {college.name}
          </h3>
          <div className="flex items-center gap-1.5 text-white/90 text-sm mt-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{college.location.city}, {college.location.state}</span>
          </div>
        </div>

        {/* Hover compare button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            <Link href={`/colleges/${college.id}`}>
              <Button size="sm" className="shadow-lg backdrop-blur-sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Rating */}
        <div className="flex items-center justify-between">
          <RatingBadge rating={college.rating} reviews={college.totalReviews} size="sm" />
          {latestPlacement && (
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="font-medium">{latestPlacement.percentage}% placed</span>
            </div>
          )}
        </div>

        {/* Courses */}
        <div className="flex flex-wrap gap-1.5">
          {college.courses.slice(0, 2).map((course) => (
            <Badge key={course.id} variant="secondary" className="text-xs font-normal hover:bg-primary/10 transition-colors duration-200">
              <GraduationCap className="w-3 h-3 mr-1" />
              {course.name.replace(/B\.Tech|B\.E\.|M\.Tech|M\.E\.|M\.Sc|MBA|M\.S\./g, (m) => m).split('(')[0].trim()}
            </Badge>
          ))}
          {college.courses.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{college.courses.length - 2}
            </Badge>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2 group/stat">
            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover/stat:bg-primary/10 transition-colors duration-200">
              <IndianRupee className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground leading-none">Fees/yr</p>
              <p className="text-sm font-semibold leading-tight mt-0.5">
                ₹{(college.fees.min / 100000).toFixed(1)}L - ₹{(college.fees.max / 100000).toFixed(1)}L
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 group/stat">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/5 flex items-center justify-center group-hover/stat:bg-emerald-500/10 transition-colors duration-200">
              <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground leading-none">Avg CTC</p>
              <p className="text-sm font-semibold leading-tight mt-0.5">
                ₹{latestPlacement?.averagePackage || 'N/A'} LPA
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <Link href={`/colleges/${college.id}`} className="flex-1">
            <Button variant="default" className="w-full group/btn transition-all duration-200 hover:shadow-md hover:shadow-primary/20">
              <span>View Details</span>
              <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Button>
          </Link>
          <Button
            variant={isComparing ? 'destructive' : 'outline'}
            onClick={() => onCompare(college)}
            className={`flex-shrink-0 transition-all duration-200 ${isComparing ? 'animate-scale-in' : 'hover:border-primary hover:text-primary'}`}
          >
            {isComparing ? (
              <span className="flex items-center gap-1">
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Remove</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Scale className="w-4 h-4" />
                <span className="hidden sm:inline">Compare</span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function Scale({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
