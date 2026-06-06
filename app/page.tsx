'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Scale, GraduationCap, Building2, MapPin, ArrowRight, Sparkles, Zap, Globe, Users, TrendingUp, Search as SearchIcon, Filter as FilterIcon, BarChart3, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header, Footer } from '@/components/layout';
import { SearchBar, FilterSidebar, CollegeCard, SortDropdown, Pagination } from '@/components/college';
import { CollegeListSkeleton, EmptyState } from '@/components/shared';
import { useCompare } from '@/lib/CompareContext';
import { colleges, getFeesRange } from '@/data/colleges';
import { Filters, SortOption, College } from '@/types/college';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 6;

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            setCount(current);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const feesRange = getFeesRange();
  const [filters, setFilters] = useState<Filters>({
    location: [],
    feesRange: feesRange,
    rating: null,
    courseType: [],
  });
  const [sort, setSort] = useState<SortOption>('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { selectedColleges, addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort colleges
  const filteredColleges = useMemo(() => {
    let result = [...colleges];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (college) =>
          college.name.toLowerCase().includes(query) ||
          college.shortName.toLowerCase().includes(query) ||
          college.location.city.toLowerCase().includes(query) ||
          college.location.state.toLowerCase().includes(query)
      );
    }

    if (filters.location.length > 0) {
      result = result.filter((college) =>
        filters.location.some(
          (loc) =>
            college.location.city === loc.split(',')[0].trim() ||
            `${college.location.city}, ${college.location.state}` === loc
        )
      );
    }

    if (filters.feesRange[0] !== feesRange[0] || filters.feesRange[1] !== feesRange[1]) {
      result = result.filter(
        (college) =>
          college.fees.min >= filters.feesRange[0] &&
          college.fees.max <= filters.feesRange[1]
      );
    }

    if (filters.rating !== null) {
      result = result.filter((college) => college.rating >= filters.rating!);
    }

    if (filters.courseType.length > 0) {
      const typeMap: Record<string, string> = {
        Undergraduate: 'ug',
        Postgraduate: 'pg',
        Diploma: 'diploma',
        PhD: 'phd',
      };
      result = result.filter((college) =>
        college.courses.some((course) =>
          filters.courseType.some((type) => course.type === typeMap[type])
        )
      );
    }

    switch (sort) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'fees-low':
        result.sort((a, b) => a.fees.min - b.fees.min);
        break;
      case 'fees-high':
        result.sort((a, b) => b.fees.max - a.fees.max);
        break;
      case 'placements':
        result.sort(
          (a, b) =>
            (b.placements[0]?.averagePackage || 0) - (a.placements[0]?.averagePackage || 0)
        );
        break;
    }

    return result;
  }, [searchQuery, filters, sort, feesRange]);

  const totalPages = Math.ceil(filteredColleges.length / ITEMS_PER_PAGE);
  const paginatedColleges = filteredColleges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sort]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      location: [],
      feesRange: feesRange,
      rating: null,
      courseType: [],
    });
  };

  const handleCompare = (college: College) => {
    if (isInCompare(college.id)) {
      removeFromCompare(college.id);
      toast({
        title: 'Removed from comparison',
        description: `${college.shortName} has been removed.`,
        variant: 'default',
      });
    } else {
      if (canAddMore) {
        addToCompare(college);
        toast({
          title: 'Added to comparison',
          description: `${college.shortName} added. ${3 - selectedColleges.length - 1} slot(s) remaining.`,
        });
      } else {
        toast({
          title: 'Comparison limit reached',
          description: 'You can compare up to 3 colleges. Remove one to add another.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b">
          {/* Animated gradient background */}
          <div className="absolute inset-0 hero-gradient animate-gradient bg-[length:200%_200%]" />

          {/* Floating decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 right-[15%] w-48 h-48 bg-chart-4/5 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute top-40 right-[30%] w-32 h-32 bg-primary/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center mb-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6 animate-slide-up">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Discover 20+ top colleges across India</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold mb-5 animate-slide-up stagger-2 text-shadow" style={{ animationDelay: '0.1s' }}>
                Find Your
                <span className="gradient-text"> Dream College</span>
              </h1>

              {/* Subtitle */}
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Compare fees, placements, and courses to make the right choice for your future
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <SearchBar onSearch={handleSearch} variant="hero" />
            </div>

            {/* Stats with animated counters */}
            <div className="flex justify-center gap-12 md:gap-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center group">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">
                  <AnimatedCounter target={colleges.length} />
                </p>
                <p className="text-sm text-muted-foreground">Colleges</p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 rounded-xl bg-chart-4/5 flex items-center justify-center mx-auto mb-2 group-hover:bg-chart-4/10 group-hover:scale-110 transition-all duration-300">
                  <Building2 className="w-6 h-6 text-chart-4" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">
                  <AnimatedCounter target={colleges.reduce((sum, c) => sum + c.courses.length, 0)} />
                </p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/5 flex items-center justify-center mx-auto mb-2 group-hover:bg-emerald-500/10 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">
                  <AnimatedCounter target={Array.from(new Set(colleges.map((c) => c.location.state))).length} />
                </p>
                <p className="text-sm text-muted-foreground">States</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 mb-6 lg:mb-0 animate-slide-in-left">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
              />
            </div>

            {/* College List */}
            <div className="lg:col-span-3 animate-slide-in-right">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Showing{' '}
                    <span className="font-semibold text-foreground">
                      {paginatedColleges.length}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-foreground">
                      {filteredColleges.length}
                    </span>{' '}
                    colleges
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <SortDropdown value={sort} onChange={setSort} />
                  {selectedColleges.length > 0 && (
                    <Link href="/compare" className="flex-shrink-0">
                      <Button
                        variant="default"
                        className="gap-2 animate-scale-in hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                      >
                        <Scale className="w-4 h-4" />
                        Compare ({selectedColleges.length})
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <CollegeListSkeleton count={6} />
              ) : paginatedColleges.length === 0 ? (
                <EmptyState
                  title="No colleges found"
                  description={searchQuery || filters.location.length > 0 || filters.rating !== null
                    ? "Try adjusting your search or filters"
                    : "Unable to load colleges"}
                  icon="search"
                  action={
                    searchQuery || filters.location.length > 0 || filters.rating !== null
                      ? {
                          label: 'Clear all filters',
                          onClick: () => {
                            setSearchQuery('');
                            handleResetFilters();
                          },
                        }
                      : undefined
                  }
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedColleges.map((college, idx) => (
                      <CollegeCard
                        key={college.id}
                        college={college}
                        onCompare={handleCompare}
                        isComparing={isInCompare(college.id)}
                        index={idx}
                      />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
