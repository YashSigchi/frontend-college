'use client';

import { IndianRupee, Home, Info, TrendingDown, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/shared';
import { College } from '@/types/college';

interface FeesSectionProps {
  college: College;
}

export function FeesSection({ college }: FeesSectionProps) {
  const avgFees = (college.fees.min + college.fees.max) / 2;

  return (
    <div>
      <SectionHeader title="Fees Structure" subtitle="Annual tuition and expenses" />

      <div className="grid gap-4">
        {/* Overview Card */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tuition Fees Range</p>
                <p className="text-3xl font-bold gradient-text-warm">
                  ₹{(college.fees.min / 100000).toFixed(1)}L - ₹{(college.fees.max / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <IndianRupee className="w-7 h-7 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wallet className="w-4 h-4" />
              <span>Average: <span className="font-semibold text-foreground">₹{(avgFees / 100000).toFixed(1)}L</span>/year</span>
            </div>
          </CardContent>
        </Card>

        {/* Hostel Fees */}
        {college.hostelAvailable && (
          <Card className="group hover:shadow-md transition-shadow duration-300 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Home className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Hostel Fees</h3>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    ₹{((college.hostelFees || 0) / 100000).toFixed(1)}L/year
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Includes accommodation, mess, and basic amenities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Course-wise Fees */}
        <Card className="hover:shadow-md transition-shadow duration-300 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Course-wise Breakdown
            </h3>
            <div className="space-y-0">
              {college.courses.map((course, idx) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-muted/30 transition-colors duration-200 rounded-lg px-2 -mx-2"
                >
                  <div>
                    <p className="font-medium text-sm">{course.name}</p>
                    <p className="text-xs text-muted-foreground">{course.eligibility} | {course.duration}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-bold text-primary">₹{(course.fees / 100000).toFixed(2)}L</p>
                    <p className="text-xs text-muted-foreground">per year</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Note:</span> Fees mentioned are indicative and may vary. Additional charges may apply for library, laboratory, sports, and other facilities. Contact the institution for exact fees.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
