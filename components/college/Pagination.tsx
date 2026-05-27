'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const showPages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);

  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 w-9 transition-all duration-200 hover:border-primary hover:text-primary disabled:opacity-40"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {startPage > 1 && (
        <>
          <Button
            variant={1 === currentPage ? 'default' : 'outline'}
            size="icon"
            onClick={() => onPageChange(1)}
            className={`h-9 w-9 transition-all duration-200 ${1 === currentPage ? 'shadow-md shadow-primary/20' : 'hover:border-primary hover:text-primary'}`}
          >
            1
          </Button>
          {startPage > 2 && (
            <span className="px-1 text-muted-foreground text-sm">...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          size="icon"
          onClick={() => onPageChange(page)}
          className={`h-9 w-9 transition-all duration-200 ${
            page === currentPage
              ? 'shadow-md shadow-primary/20 scale-105'
              : 'hover:border-primary hover:text-primary'
          }`}
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-1 text-muted-foreground text-sm">...</span>
          )}
          <Button
            variant={totalPages === currentPage ? 'default' : 'outline'}
            size="icon"
            onClick={() => onPageChange(totalPages)}
            className={`h-9 w-9 transition-all duration-200 ${totalPages === currentPage ? 'shadow-md shadow-primary/20' : 'hover:border-primary hover:text-primary'}`}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 w-9 transition-all duration-200 hover:border-primary hover:text-primary disabled:opacity-40"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
