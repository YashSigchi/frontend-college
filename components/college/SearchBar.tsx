'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  variant?: 'default' | 'hero';
}

export function SearchBar({ onSearch, placeholder = 'Search colleges...', debounceMs = 300, variant = 'default' }: SearchBarProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = useCallback(
    (query: string) => {
      const timer = setTimeout(() => {
        onSearch(query);
      }, debounceMs);
      return () => clearTimeout(timer);
    },
    [onSearch, debounceMs]
  );

  useEffect(() => {
    const cleanup = debouncedSearch(value);
    return cleanup;
  }, [value, debouncedSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  const isHero = variant === 'hero';

  return (
    <div className={`relative w-full ${isHero ? 'max-w-2xl' : 'max-w-xl'} group`}>
      {/* Animated glow backdrop */}
      <div className={`absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-chart-4/20 to-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isFocused ? '!opacity-100' : ''}`} />

      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pl-11 pr-11 transition-all duration-300 ${
            isHero
              ? 'h-14 text-lg rounded-xl bg-background/80 backdrop-blur-sm border-2 focus:border-primary'
              : 'rounded-lg'
          } ${isFocused ? 'shadow-lg ring-2 ring-primary/20' : ''}`}
        />
        {value ? (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-primary/10 transition-all duration-200"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
        )}
      </div>
    </div>
  );
}
