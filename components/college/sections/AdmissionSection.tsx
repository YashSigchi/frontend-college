'use client';

import { CheckCircle2, FileText, ArrowRight, ClipboardList } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/shared';

interface AdmissionSectionProps {
  admissionProcess: string[];
  collegeName: string;
}

export function AdmissionSection({ admissionProcess, collegeName }: AdmissionSectionProps) {
  return (
    <div>
      <SectionHeader
        title="Admission Process"
        subtitle="Step-by-step admission procedure"
      />

      <Card className="hover:shadow-md transition-shadow duration-300 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="relative">
            {admissionProcess.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 mb-8 last:mb-0 group opacity-0 animate-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step number and connector */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  {index < admissionProcess.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/30 to-primary/5 my-2 group-hover:from-primary/50 transition-colors duration-300" />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">{step}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 bg-primary/5 border-primary/10">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Important Note</p>
              <p>
                Admission process may vary each year. Please visit the official website of {collegeName}
                for the most up-to-date admission guidelines and deadlines.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
