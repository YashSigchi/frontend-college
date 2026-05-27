'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Menu, X, Scale, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCompare } from '@/lib/CompareContext';
import { useTheme } from '@/lib/ThemeContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { selectedColleges } = useCompare();
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass border-b shadow-sm'
          : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <GraduationCap className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-bold text-xl hidden sm:inline gradient-text">
              College Discovery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" className="text-sm font-medium hover:bg-primary/5 transition-all duration-200">
                Colleges
              </Button>
            </Link>
            <Link href="/compare">
              <Button variant="ghost" className="text-sm font-medium hover:bg-primary/5 transition-all duration-200 gap-2">
                <Scale className="w-4 h-4" />
                Compare
                {selectedColleges.length > 0 && (
                  <Badge
                    variant="default"
                    className="ml-1 animate-scale-in bg-primary text-primary-foreground"
                  >
                    {selectedColleges.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <div className="w-px h-6 bg-border mx-2" />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden hover:bg-primary/5 transition-all duration-300"
            >
              {themeMounted ? (
                <>
                  <Sun className={`h-5 w-5 absolute transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
                  <Moon className={`h-5 w-5 absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`} />
                </>
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden"
            >
              {themeMounted ? (
                <>
                  <Sun className={`h-5 w-5 absolute transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
                  <Moon className={`h-5 w-5 absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`} />
                </>
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Link href="/compare">
              <Button variant="ghost" size="icon" className="relative">
                <Scale className="w-5 h-5" />
                {selectedColleges.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center animate-scale-in">
                    {selectedColleges.length}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="transition-transform duration-200"
            >
              <div className="relative w-5 h-5">
                <span className={`absolute left-0 top-1 h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2.5' : ''}`} />
                <span className={`absolute left-0 top-2.5 h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 top-4 h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2.5' : ''}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-smooth ${
            isMenuOpen ? 'max-h-48 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Colleges
            </Link>
            <Link
              href="/compare"
              className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/5 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Compare Colleges
              {selectedColleges.length > 0 && (
                <Badge variant="default" className="animate-scale-in">
                  {selectedColleges.length}
                </Badge>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
