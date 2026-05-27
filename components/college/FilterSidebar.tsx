'use client';

import { useState } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filters } from '@/types/college';
import { getUniqueLocations, getFeesRange, getCourseTypes } from '@/data/colleges';

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onReset: () => void;
}

export function FilterSidebar({ filters, onFiltersChange, onReset }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locations = getUniqueLocations();
  const [minFees, maxFees] = getFeesRange();
  const courseTypes = getCourseTypes();

  const activeFiltersCount =
    filters.location.length +
    (filters.rating !== null ? 1 : 0) +
    filters.courseType.length +
    (filters.feesRange[0] !== minFees || filters.feesRange[1] !== maxFees ? 1 : 0);

  const handleLocationChange = (location: string, checked: boolean) => {
    const newLocations = checked
      ? [...filters.location, location]
      : filters.location.filter((l) => l !== location);
    onFiltersChange({ ...filters, location: newLocations });
  };

  const handleCourseTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.courseType, type]
      : filters.courseType.filter((t) => t !== type);
    onFiltersChange({ ...filters, courseType: newTypes });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, rating: filters.rating === rating ? null : rating });
  };

  const handleFeesChange = (values: number[]) => {
    onFiltersChange({ ...filters, feesRange: [values[0], values[1]] });
  };

  const FilterContent = () => (
    <div className="space-y-6 scrollbar-thin">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <Filter className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium animate-scale-in">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-sm text-muted-foreground hover:text-destructive transition-colors duration-200">
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Location Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Location</Label>
        <div className="max-h-48 overflow-y-auto space-y-2 scrollbar-thin pr-1">
          {locations.map((location, idx) => (
            <div
              key={location}
              className="flex items-center space-x-2 group py-0.5"
              style={{ animationDelay: `${idx * 0.02}s` }}
            >
              <Checkbox
                id={`location-${location}`}
                checked={filters.location.includes(location)}
                onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                className="transition-all duration-200 group-hover:border-primary"
              />
              <label
                htmlFor={`location-${location}`}
                className="text-sm cursor-pointer group-hover:text-primary transition-colors duration-200"
              >
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Fees Range Filter */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Fees Range (per year)</Label>
        <div className="px-1">
          <Slider
            min={minFees}
            max={maxFees}
            step={10000}
            value={[filters.feesRange[0], filters.feesRange[1]]}
            onValueChange={handleFeesChange}
            className="mt-4"
          />
          <div className="flex justify-between text-xs mt-3">
            <span className="bg-primary/5 px-2 py-1 rounded-md font-medium">
              ₹{(filters.feesRange[0] / 100000).toFixed(1)}L
            </span>
            <span className="bg-primary/5 px-2 py-1 rounded-md font-medium">
              ₹{(filters.feesRange[1] / 100000).toFixed(1)}L
            </span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Minimum Rating</Label>
        <div className="flex flex-wrap gap-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <Button
              key={rating}
              variant={filters.rating === rating ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleRatingChange(rating)}
              className="transition-all duration-200 hover:scale-105"
            >
              {rating}+ &#9733;
            </Button>
          ))}
        </div>
      </div>

      {/* Course Type Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Course Type</Label>
        <div className="space-y-2">
          {courseTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2 group py-0.5">
              <Checkbox
                id={`type-${type}`}
                checked={filters.courseType.includes(type)}
                onCheckedChange={(checked) => handleCourseTypeChange(type, checked as boolean)}
                className="transition-all duration-200 group-hover:border-primary"
              />
              <label
                htmlFor={`type-${type}`}
                className="text-sm cursor-pointer group-hover:text-primary transition-colors duration-200"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Card className="sticky top-20 border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                <Filter className="w-4 h-4 text-primary" />
              </div>
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium animate-scale-in">
                  {activeFiltersCount}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 hover:border-primary hover:text-primary transition-all duration-200">
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium animate-scale-in">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filter Colleges
              </SheetTitle>
              <SheetDescription>
                Refine your search to find the perfect college
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
            <div className="mt-6 space-y-3">
              <Button className="w-full" onClick={() => setIsOpen(false)}>
                Apply Filters
              </Button>
              {activeFiltersCount > 0 && (
                <Button variant="outline" className="w-full" onClick={() => { onReset(); setIsOpen(false); }}>
                  Reset All
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
