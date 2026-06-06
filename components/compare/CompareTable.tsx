'use client';

import { MapPin, IndianRupee, Briefcase, Home, GraduationCap, Star, Building, Calendar, Award, Trophy, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RatingBadge } from '@/components/shared';
import { College } from '@/types/college';
import Image from 'next/image';
import Link from 'next/link';

interface CompareTableProps {
  colleges: College[];
  onRemove: (collegeId: string) => void;
}

export function CompareTable({ colleges, onRemove }: CompareTableProps) {
  if (colleges.length === 0) return null;

  const getBestValue = (field: 'rating' | 'fees' | 'placement', getMin = false) => {
    const values = colleges.map((c) => {
      if (field === 'rating') return c.rating;
      if (field === 'fees') return c.fees.min;
      return c.placements[0]?.averagePackage || 0;
    });
    return getMin ? Math.min(...values) : Math.max(...values);
  };

  const isBestRating = (rating: number) => rating === getBestValue('rating');
  const isLowestFees = (fees: number) => fees === getBestValue('fees', true);
  const isBestPlacement = (pkg: number) => pkg === getBestValue('placement');

  const CompareRow = ({
    icon: Icon,
    label,
    values,
  }: {
    icon: React.ElementType;
    label: string;
    values: React.ReactNode[];
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-5 border-b last:border-b-0 hover:bg-muted/30 transition-colors duration-200 px-2 rounded-lg">
      <div className="flex items-center gap-2.5 font-medium text-sm">
        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        {label}
      </div>
      {values.map((value, idx) => (
        <div key={idx} className="text-sm flex items-center">
          {value}
        </div>
      ))}
    </div>
  );

  const BestBadge = () => (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
      <Trophy className="w-3 h-3" />
      Best
    </span>
  );

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-[800px]">
          {/* College Headers */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {colleges.map((college, idx) => (
              <div
                key={college.id}
                className="space-y-3 opacity-0 animate-reveal"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-muted group">
                  <Image
                    src={college.image}
                    alt={college.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {college.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{college.shortName}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/colleges/${college.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-1 hover:border-primary hover:text-primary transition-all duration-200">
                      <ExternalLink className="w-3 h-3" />
                      Details
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemove(college.id)}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {[...Array(3 - colleges.length)].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="aspect-video rounded-xl border-2 border-dashed flex items-center justify-center text-muted-foreground opacity-0 animate-reveal"
                style={{ animationDelay: `${(colleges.length + i) * 0.1}s` }}
              >
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <p className="text-sm">Add another college</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Card */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <CompareRow
                icon={MapPin}
                label="Location"
                values={colleges.map((c) => (
                  <span key={c.id} className="font-medium">
                    {c.location.city}, {c.location.state}
                  </span>
                ))}
              />
              <CompareRow
                icon={Star}
                label="Rating"
                values={colleges.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <RatingBadge rating={c.rating} reviews={c.totalReviews} size="sm" />
                    {isBestRating(c.rating) && <BestBadge />}
                  </div>
                ))}
              />
              <CompareRow
                icon={IndianRupee}
                label="Annual Fees"
                values={colleges.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <span
                      className={
                        isLowestFees(c.fees.min)
                          ? 'font-bold text-emerald-600 dark:text-emerald-400'
                          : 'font-medium'
                      }
                    >
                      ₹{(c.fees.min / 100000).toFixed(1)}L - ₹{(c.fees.max / 100000).toFixed(1)}L
                    </span>
                    {isLowestFees(c.fees.min) && <BestBadge />}
                  </div>
                ))}
              />
              <CompareRow
                icon={Briefcase}
                label="Average Package"
                values={colleges.map((c) => {
                  const pkg = c.placements[0]?.averagePackage || 0;
                  return (
                    <div key={c.id} className="flex items-center gap-2">
                      <span
                        className={
                          isBestPlacement(pkg)
                            ? 'font-bold text-emerald-600 dark:text-emerald-400'
                            : 'font-medium'
                        }
                      >
                        ₹{pkg} LPA
                      </span>
                      {isBestPlacement(pkg) && <BestBadge />}
                    </div>
                  );
                })}
              />
              <CompareRow
                icon={Trophy}
                label="Highest Package"
                values={colleges.map((c) => (
                  <span key={c.id} className="font-medium">₹{c.placements[0]?.highestPackage || 'N/A'} LPA</span>
                ))}
              />
              <CompareRow
                icon={Award}
                label="Placement Rate"
                values={colleges.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <span className="font-medium">{c.placements[0]?.percentage || 'N/A'}%</span>
                    {c.placements[0]?.percentage && c.placements[0].percentage >= 95 && (
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs">
                        Excellent
                      </Badge>
                    )}
                  </div>
                ))}
              />
              <CompareRow
                icon={Home}
                label="Hostel"
                values={colleges.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <Badge variant={c.hostelAvailable ? 'default' : 'secondary'} className={c.hostelAvailable ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : ''}>
                      {c.hostelAvailable ? 'Available' : 'Not Available'}
                    </Badge>
                    {c.hostelAvailable && c.hostelFees && (
                      <span className="text-xs text-muted-foreground">
                        ₹{(c.hostelFees / 1000).toFixed(0)}K/yr
                      </span>
                    )}
                  </div>
                ))}
              />
              <CompareRow
                icon={Calendar}
                label="Established"
                values={colleges.map((c) => (
                  <span key={c.id} className="font-medium">{c.established}</span>
                ))}
              />
              <CompareRow
                icon={Building}
                label="Campus Size"
                values={colleges.map((c) => (
                  <span key={c.id} className="font-medium">{c.campusSize}</span>
                ))}
              />
              <CompareRow
                icon={GraduationCap}
                label="Courses"
                values={colleges.map((c) => (
                  <div key={c.id} className="space-y-1.5">
                    {c.courses.slice(0, 3).map((course) => (
                      <Badge key={course.id} variant="outline" className="mr-1 text-xs font-normal">
                        {course.name.split('(')[0].trim()}
                      </Badge>
                    ))}
                    {c.courses.length > 3 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        +{c.courses.length - 3} more
                      </p>
                    )}
                  </div>
                ))}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-6">
        {colleges.map((college, idx) => (
          <Card
            key={college.id}
            className="border-0 shadow-md opacity-0 animate-reveal"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <div className="relative aspect-video rounded-t-xl overflow-hidden bg-muted">
              <Image src={college.image} alt={college.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-3 right-3">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemove(college.id)}
                  className="shadow-lg"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-1">{college.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{college.shortName}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Location
                  </p>
                  <p className="text-sm font-medium">
                    {college.location.city}, {college.location.state}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Rating
                  </p>
                  <div className="flex items-center gap-2">
                    <RatingBadge rating={college.rating} size="sm" showCount={false} />
                    {isBestRating(college.rating) && <BestBadge />}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    Fees
                  </p>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${isLowestFees(college.fees.min) ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                      ₹{(college.fees.min / 100000).toFixed(1)}L - ₹{(college.fees.max / 100000).toFixed(1)}L
                    </p>
                    {isLowestFees(college.fees.min) && <BestBadge />}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    Avg CTC
                  </p>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${isBestPlacement(college.placements[0]?.averagePackage || 0) ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                      ₹{college.placements[0]?.averagePackage || 'N/A'} LPA
                    </p>
                    {isBestPlacement(college.placements[0]?.averagePackage || 0) && <BestBadge />}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Placed
                  </p>
                  <p className="text-sm font-medium">
                    {college.placements[0]?.percentage || 'N/A'}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Home className="w-3 h-3" />
                    Hostel
                  </p>
                  <Badge variant={college.hostelAvailable ? 'default' : 'secondary'} className={college.hostelAvailable ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : ''}>
                    {college.hostelAvailable ? 'Available' : 'No'}
                  </Badge>
                </div>
              </div>

              <Link href={`/colleges/${college.id}`}>
                <Button variant="outline" className="w-full mt-4 hover:border-primary hover:text-primary transition-all duration-200">
                  View Full Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}