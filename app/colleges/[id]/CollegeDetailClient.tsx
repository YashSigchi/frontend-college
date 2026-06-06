'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, ExternalLink, Globe, Phone, Mail, Building2, GraduationCap, Briefcase, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Header, Footer } from '@/components/layout';
import {
  OverviewSection,
  CoursesSection,
  PlacementsSection,
  FeesSection,
  ReviewsSection,
  FacilitiesSection,
  AdmissionSection,
  QADiscussion,
} from '@/components/college';
import { CollegeDetailSkeleton, RatingBadge } from '@/components/shared';
import { colleges } from '@/data/colleges';
import { College } from '@/types/college';

function AnimatedStat({ icon: Icon, label, value, delay = 0, className }: { icon: React.ElementType; label: string; value: string; delay?: number; className?: string }) {
  return (
    <div
      className={`text-center group opacity-0 animate-reveal ${className || ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-10 h-10 rounded-xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="text-xl md:text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default function CollegeDetailClient() {
  const params = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollY, setScrollY] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundCollege = colleges.find((c) => c.id === params.id);
      setCollege(foundCollege || null);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [params.id]);

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <CollegeDetailSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold mb-4">College Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The college you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/">
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Colleges
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const latestPlacement = college.placements[0];
  const parallaxOffset = scrollY * 0.4;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner with Parallax */}
        <div ref={bannerRef} className="relative h-72 md:h-96 bg-muted overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-100 will-change-transform"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          >
            <Image
              src={college.bannerImage}
              alt={college.name}
              fill
              className="object-cover scale-110"
              priority
            />
          </div>

          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="container mx-auto animate-slide-up">
              <Link
                href="/"
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-all duration-200 hover:gap-3 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Colleges</span>
              </Link>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 text-shadow">
                    {college.name}
                  </h1>
                  <div className="flex items-center gap-4 text-white/90 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{college.location.city}, {college.location.state}</span>
                    </div>
                    <Badge className="bg-white/15 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                      {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                      Est. {college.established}
                    </Badge>
                  </div>
                </div>
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animate-slide-up"
                  style={{ animationDelay: '0.2s' }}
                >
                  <Button variant="secondary" className="gap-2 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats with glass effect */}
        <div className="border-b glass sticky top-16 z-40">
          <div className="container mx-auto px-4 py-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <AnimatedStat icon={Star} label="Rating" value={college.rating.toFixed(1)} delay={0.05} />
              <AnimatedStat icon={Briefcase} label="Avg Package" value={`₹${latestPlacement?.averagePackage || 'N/A'}L`} delay={0.1} />
              <AnimatedStat icon={GraduationCap} label="Courses" value={String(college.courses.length)} delay={0.15} />
              <AnimatedStat icon={Award} label="Placement Rate" value={`${latestPlacement?.percentage || 'N/A'}%`} delay={0.2} />
              <AnimatedStat icon={Building2} label="Campus" value={college.campusSize} delay={0.25} className="hidden md:block" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 mb-8 h-auto p-1 bg-muted/50">
              {[
                { value: 'overview', label: 'Overview' },
                { value: 'courses', label: 'Courses' },
                { value: 'placements', label: 'Placements' },
                { value: 'fees', label: 'Fees' },
                { value: 'facilities', label: 'Facilities' },
                { value: 'admission', label: 'Admission' },
                { value: 'reviews', label: 'Reviews' },
                { value: 'qa', label: 'Q&A' },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`transition-all duration-200 data-[state=active]:shadow-sm ${
                    (tab.value === 'facilities' || tab.value === 'admission' || tab.value === 'qa')
                      ? 'hidden md:flex'
                      : ''
                  }`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="mt-0 animate-fade-in">
              <OverviewSection college={college} />
            </TabsContent>

            <TabsContent value="courses" className="mt-0 animate-fade-in">
              <CoursesSection courses={college.courses} />
            </TabsContent>

            <TabsContent value="placements" className="mt-0 animate-fade-in">
              <PlacementsSection placements={college.placements} />
            </TabsContent>

            <TabsContent value="fees" className="mt-0 animate-fade-in">
              <FeesSection college={college} />
            </TabsContent>

            <TabsContent value="facilities" className="mt-0 animate-fade-in">
              <FacilitiesSection facilities={college.facilities} />
            </TabsContent>

            <TabsContent value="admission" className="mt-0 animate-fade-in">
              <AdmissionSection
                admissionProcess={college.admissionProcess}
                collegeName={college.name}
              />
            </TabsContent>

            <TabsContent value="reviews" className="mt-0 animate-fade-in">
              <ReviewsSection reviews={college.reviews} collegeName={college.name} />
            </TabsContent>

            <TabsContent value="qa" className="mt-0 animate-fade-in">
              <QADiscussion collegeName={college.name} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}