'use client';

import { TrendingUp, Award, Building2, Users, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/shared';
import { Placement } from '@/types/college';

interface PlacementsSectionProps {
  placements: Placement[];
}

export function PlacementsSection({ placements }: PlacementsSectionProps) {
  if (placements.length === 0) {
    return (
      <div>
        <SectionHeader title="Placements" />
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No placement data available
          </CardContent>
        </Card>
      </div>
    );
  }

  const latestPlacement = placements[0];

  return (
    <div>
      <SectionHeader title="Placements" subtitle={`Statistics from ${latestPlacement.year}`} />

      {/* Key Stats with animated cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: TrendingUp, label: 'Average Package', value: `₹${latestPlacement.averagePackage}L`, color: 'primary' },
          { icon: Award, label: 'Highest Package', value: `₹${latestPlacement.highestPackage}L`, color: 'emerald' },
          { icon: Users, label: 'Placement Rate', value: `${latestPlacement.percentage}%`, color: 'chart-4' },
          { icon: Building2, label: 'Top Recruiters', value: `${latestPlacement.topRecruiters.length}+`, color: 'warning' },
        ].map((stat, idx) => (
          <Card
            key={idx}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm opacity-0 animate-reveal"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <CardContent className="p-4">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-5 h-5 text-${stat.color === 'emerald' ? 'emerald-600 dark:text-emerald-400' : stat.color === 'chart-4' ? 'chart-4' : stat.color === 'warning' ? 'warning' : 'primary'}`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Recruiters */}
      <Card className="mb-6 hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Top Recruiters
          </h3>
          <div className="flex flex-wrap gap-2">
            {latestPlacement.topRecruiters.map((recruiter, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-sm py-1.5 px-3 hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-default"
              >
                {recruiter}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Data */}
      {placements.length > 1 && (
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Placement Trends
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-3 text-sm font-medium text-muted-foreground">Year</th>
                    <th className="text-right py-3 px-3 text-sm font-medium text-muted-foreground">Avg Package</th>
                    <th className="text-right py-3 px-3 text-sm font-medium text-muted-foreground">Highest</th>
                    <th className="text-right py-3 px-3 text-sm font-medium text-muted-foreground">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {placements.map((placement, idx) => (
                    <tr key={placement.year} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors duration-200">
                      <td className="py-3 px-3 font-medium">{placement.year}</td>
                      <td className="text-right py-3 px-3">
                        <span className="font-semibold">₹{placement.averagePackage}L</span>
                      </td>
                      <td className="text-right py-3 px-3">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">₹{placement.highestPackage}L</span>
                      </td>
                      <td className="text-right py-3 px-3">
                        <Badge variant={placement.percentage >= 95 ? 'default' : 'secondary'} className={placement.percentage >= 95 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : ''}>
                          {placement.percentage}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
