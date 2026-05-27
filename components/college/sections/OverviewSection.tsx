'use client';

import { MapPin, Calendar, Building, Award, Globe, Phone, Mail, TrendingUp, IndianRupee, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RatingBadge } from '@/components/shared';
import { College } from '@/types/college';

interface OverviewSectionProps {
  college: College;
}

export function OverviewSection({ college }: OverviewSectionProps) {
  const latestPlacement = college.placements[0];

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group">
              <p className="text-sm text-muted-foreground mb-1.5">Rating</p>
              <RatingBadge rating={college.rating} reviews={college.totalReviews} size="md" />
            </div>
            <div className="group">
              <p className="text-sm text-muted-foreground mb-1.5">Type</p>
              <Badge variant={college.type === 'public' ? 'default' : 'secondary'} className="group-hover:scale-105 transition-transform duration-200">
                {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
              </Badge>
            </div>
            <div className="group">
              <p className="text-sm text-muted-foreground mb-1.5">Established</p>
              <p className="font-bold text-lg">{college.established}</p>
            </div>
            <div className="group">
              <p className="text-sm text-muted-foreground mb-1.5">Campus Size</p>
              <p className="font-bold text-lg">{college.campusSize}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            About {college.name}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {college.name} ({college.shortName}), established in {college.established}, is a
            prestigious {college.type} institution located in {college.location.city}, {college.location.state}.
            The institution offers {college.courses.length} programs across various disciplines with
            state-of-the-art facilities and excellent placement opportunities.
          </p>
        </CardContent>
      </Card>

      {/* Key Highlights */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Key Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/0 group hover:from-primary/10 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Average Package</p>
              </div>
              <p className="text-2xl font-bold gradient-text-warm">₹{latestPlacement?.averagePackage || 'N/A'}L</p>
              <p className="text-xs text-muted-foreground mt-1">
                Highest: ₹{latestPlacement?.highestPackage || 'N/A'}L
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/0 group hover:from-emerald-500/10 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <IndianRupee className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-xs text-muted-foreground">Annual Fees</p>
              </div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                ₹{(college.fees.min / 100000).toFixed(1)}L - ₹{(college.fees.max / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-chart-4/5 to-chart-4/0 group hover:from-chart-4/10 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-chart-4" />
                </div>
                <p className="text-xs text-muted-foreground">Placement Rate</p>
              </div>
              <p className="text-2xl font-bold text-chart-4">{latestPlacement?.percentage || 'N/A'}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accreditation */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Accreditations & Approvals
          </h2>
          <div className="flex flex-wrap gap-2">
            {college.accreditation.map((acc, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-sm py-1.5 px-3 hover:bg-primary/5 hover:border-primary/20 transition-all duration-200"
              >
                <Award className="w-3 h-3 mr-1.5" />
                {acc}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location & Contact */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Location & Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-200">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">
                  {college.location.city}, {college.location.state}
                </p>
                <p className="text-sm text-muted-foreground">{college.location.country}</p>
              </div>
            </div>
            <div className="space-y-2">
              <a href={`tel:${college.contact.phone}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 group">
                <Phone className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm group-hover:text-primary transition-colors">{college.contact.phone}</span>
              </a>
              <a href={`mailto:${college.contact.email}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 group">
                <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm group-hover:text-primary transition-colors">{college.contact.email}</span>
              </a>
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 group">
                <Globe className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm group-hover:text-primary transition-colors">Visit Website</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
