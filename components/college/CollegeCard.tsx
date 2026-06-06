'use client';

import { MapPin, IndianRupee, Briefcase, GraduationCap, TrendingUp, Building2, CheckCircle, Users, Award, ArrowRight } from 'lucide-react';
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
        {/* Header with Rating and Quick Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base line-clamp-2 text-foreground leading-tight">{college.shortName}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{college.location.city}, {college.location.state}</p>
          </div>
          <RatingBadge rating={college.rating} reviews={college.totalReviews} size="sm" />
        </div>

        {/* Placement Highlight */}
        {latestPlacement && (
          <div className="flex items-center gap-2 p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">{latestPlacement.percentage}% placement • ₹{latestPlacement.averagePackage} LPA avg</p>
            </div>
          </div>
        )}

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <div className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <IndianRupee className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground leading-none font-medium">Fees/Year</p>
              <p className="text-xs font-bold mt-0.5 leading-tight">₹{(college.fees.min / 100000).toFixed(1)}L+</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
            <div className="w-7 h-7 rounded-lg bg-chart-4/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-3.5 h-3.5 text-chart-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground leading-none font-medium">Courses</p>
              <p className="text-xs font-bold mt-0.5 leading-tight">{college.courses.length}+ courses</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground leading-none font-medium">Est.</p>
              <p className="text-xs font-bold mt-0.5 leading-tight">{college.established}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
            <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground leading-none font-medium">Type</p>
              <p className="text-xs font-bold mt-0.5 leading-tight capitalize">{college.type}</p>
            </div>
          </div>
        </div>

        {/* Accreditation & Facilities */}
        <div className="flex items-center gap-1.5 text-xs pt-2 border-t border-border/40">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">{college.accreditation.slice(0, 2).join(', ')}</span>
            {college.accreditation.length > 2 && ` +${college.accreditation.length - 2}`}
          </span>
        </div>

        {/* Hostel Info */}
        {college.hostelAvailable && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Hostel available • ₹{(college.hostelFees || 0) / 1000}K/year</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link href={`/colleges/${college.id}`} className="flex-1">
            <Button
              variant="default"
              size="sm"
              className="w-full gap-1.5 group transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Button
            variant={isComparing ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => onCompare(college)}
            className={`transition-all duration-200 ${
              isComparing ? 'animate-scale-in' : 'hover:border-primary hover:text-primary hover:bg-primary/5'
            }`}
            title={isComparing ? 'Remove from comparison' : 'Add to comparison'}
          >
            {isComparing ? (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
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
