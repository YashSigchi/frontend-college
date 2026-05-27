'use client';

import { Check, X, Building, Dumbbell, BookOpen, Waves, Wifi, Stethoscope, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/shared';
import { Facility } from '@/types/college';

interface FacilitiesSectionProps {
  facilities: Facility[];
}

const facilityIcons: Record<string, React.ElementType> = {
  library: BookOpen,
  sport: Dumbbell,
  gym: Dumbbell,
  pool: Waves,
  swimming: Waves,
  beach: Waves,
  lab: Lightbulb,
  research: Lightbulb,
  incubat: Lightbulb,
  innovation: Lightbulb,
  wifi: Wifi,
  medical: Stethoscope,
  hospital: Stethoscope,
  airport: Building,
  cultural: Building,
  boat: Waves,
};

function getFacilityIcon(name: string): React.ElementType {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(facilityIcons)) {
    if (lower.includes(key)) return icon;
  }
  return Building;
}

export function FacilitiesSection({ facilities }: FacilitiesSectionProps) {
  const availableFacilities = facilities.filter((f) => f.available);

  return (
    <div>
      <SectionHeader
        title="Facilities"
        subtitle={`${availableFacilities.length} facilities available`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {facilities.map((facility, idx) => {
          const Icon = getFacilityIcon(facility.name);
          return (
            <Card
              key={idx}
              className={`group hover:shadow-md transition-all duration-300 ${
                facility.available
                  ? 'border-0 shadow-sm hover:-translate-y-0.5'
                  : 'border-dashed opacity-50'
              } opacity-0 animate-reveal`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    facility.available ? 'bg-emerald-500/5' : 'bg-muted'
                  }`}>
                    <Icon className={`w-5 h-5 ${facility.available ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{facility.name}</p>
                      {facility.available ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                          <X className="w-3 h-3 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    {facility.description && (
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {facility.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
