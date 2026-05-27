'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { College } from '@/types/college';

interface CompareContextType {
  selectedColleges: College[];
  maxColleges: number;
  addToCompare: (college: College) => void;
  removeFromCompare: (collegeId: string) => void;
  isInCompare: (collegeId: string) => boolean;
  clearAll: () => void;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const maxColleges = 3;

  const addToCompare = useCallback((college: College) => {
    setSelectedColleges((prev) => {
      if (prev.length >= maxColleges) return prev;
      if (prev.find((c) => c.id === college.id)) return prev;
      return [...prev, college];
    });
  }, []);

  const removeFromCompare = useCallback((collegeId: string) => {
    setSelectedColleges((prev) => prev.filter((c) => c.id !== collegeId));
  }, []);

  const isInCompare = useCallback(
    (collegeId: string) => selectedColleges.some((c) => c.id === collegeId),
    [selectedColleges]
  );

  const clearAll = useCallback(() => {
    setSelectedColleges([]);
  }, []);

  const canAddMore = selectedColleges.length < maxColleges;

  return (
    <CompareContext.Provider
      value={{
        selectedColleges,
        maxColleges,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearAll,
        canAddMore,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
