'use client';

import { GraduationCap, Clock, IndianRupee, Users, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/shared';
import { Course } from '@/types/college';

interface CoursesSectionProps {
  courses: Course[];
}

export function CoursesSection({ courses }: CoursesSectionProps) {
  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.type]) acc[course.type] = [];
    acc[course.type].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const typeLabels: Record<string, string> = {
    ug: 'Undergraduate Programs',
    pg: 'Postgraduate Programs',
    diploma: 'Diploma Programs',
    phd: 'Doctoral Programs',
  };

  const typeColors: Record<string, string> = {
    ug: 'primary',
    pg: 'emerald',
    diploma: 'warning',
    phd: 'chart-4',
  };

  const typeOrder = ['ug', 'pg', 'diploma', 'phd'];

  return (
    <div>
      <SectionHeader title="Courses Offered" subtitle={`${courses.length} programs available`} />

      {typeOrder.map((type) => {
        const coursesOfType = groupedCourses[type];
        if (!coursesOfType || coursesOfType.length === 0) return null;

        return (
          <div key={type} className="mb-8 last:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">{typeLabels[type]}</h3>
              <Badge variant="secondary" className="text-xs">{coursesOfType.length}</Badge>
            </div>
            <div className="grid gap-3">
              {coursesOfType.map((course, idx) => (
                <Card
                  key={course.id}
                  className="group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border-0 shadow-sm opacity-0 animate-reveal"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-200">{course.name}</h4>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            {course.seats} seats
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <Badge variant="secondary" className="whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                          {course.eligibility}
                        </Badge>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Annual Fees</p>
                          <p className="font-bold text-lg text-primary">
                            ₹{(course.fees / 100000).toFixed(2)}L
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
