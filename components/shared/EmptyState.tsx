'use client';

import { SearchX, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: 'search' | 'question';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon = 'search', action }: EmptyStateProps) {
  const IconComponent = icon === 'search' ? SearchX : HelpCircle;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="rounded-2xl bg-muted p-6">
          <IconComponent className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="absolute -inset-2 bg-primary/5 rounded-3xl blur-xl -z-10" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">{description}</p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          variant="default"
          className="hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
