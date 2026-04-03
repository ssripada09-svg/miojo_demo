'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Inbox, 
  FileQuestion, 
  Search, 
  Filter, 
  Plus,
  Database,
  BarChart3,
  Users,
  Settings,
  Bell,
} from 'lucide-react';

type EmptyStateType = 
  | 'data' 
  | 'search' 
  | 'filter' 
  | 'tools' 
  | 'analytics' 
  | 'users' 
  | 'settings' 
  | 'notifications';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const typeConfig: Record<EmptyStateType, { icon: React.ReactNode; title: string; message: string }> = {
  data: {
    icon: <Database className="h-12 w-12" />,
    title: 'No Data Available',
    message: 'There is no data to display at this time.',
  },
  search: {
    icon: <Search className="h-12 w-12" />,
    title: 'No Results Found',
    message: 'Try adjusting your search terms or filters.',
  },
  filter: {
    icon: <Filter className="h-12 w-12" />,
    title: 'No Matches',
    message: 'No items match your current filters. Try adjusting or clearing filters.',
  },
  tools: {
    icon: <Inbox className="h-12 w-12" />,
    title: 'No Tools Found',
    message: 'Get started by adding your first tool to the inventory.',
  },
  analytics: {
    icon: <BarChart3 className="h-12 w-12" />,
    title: 'No Analytics Data',
    message: 'Analytics data will appear here once tools are configured.',
  },
  users: {
    icon: <Users className="h-12 w-12" />,
    title: 'No Users',
    message: 'No users have been added to this tool yet.',
  },
  settings: {
    icon: <Settings className="h-12 w-12" />,
    title: 'No Configuration',
    message: 'Configure your settings to get started.',
  },
  notifications: {
    icon: <Bell className="h-12 w-12" />,
    title: 'No Notifications',
    message: "You're all caught up! No new notifications.",
  },
};

export function EmptyState({
  type = 'data',
  title,
  message,
  icon,
  action,
  className,
}: EmptyStateProps) {
  const config = typeConfig[type];

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4', className)}>
      <div className="text-muted-foreground/50">
        {icon || config.icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {title || config.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
        {message || config.message}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {action.label}
        </button>
      )}
    </div>
  );
}

// Specific empty states for common use cases

interface TableEmptyStateProps {
  searchTerm?: string;
  onClearSearch?: () => void;
  className?: string;
}

export function TableEmptyState({ searchTerm, onClearSearch, className }: TableEmptyStateProps) {
  if (searchTerm) {
    return (
      <EmptyState
        type="search"
        title="No results found"
        message={`No items match "${searchTerm}". Try a different search term.`}
        action={onClearSearch ? { label: 'Clear Search', onClick: onClearSearch } : undefined}
        className={className}
      />
    );
  }

  return (
    <EmptyState
      type="data"
      className={className}
    />
  );
}

// Dashboard widget empty state
interface WidgetEmptyStateProps {
  title: string;
  message?: string;
  className?: string;
}

export function WidgetEmptyState({ title, message, className }: WidgetEmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center h-full py-8', className)}>
      <FileQuestion className="h-10 w-10 text-muted-foreground/30" />
      <p className="mt-3 text-sm font-medium text-muted-foreground">{title}</p>
      {message && (
        <p className="mt-1 text-xs text-muted-foreground/70 text-center max-w-xs">
          {message}
        </p>
      )}
    </div>
  );
}

// Coming soon placeholder
interface ComingSoonProps {
  feature: string;
  className?: string;
}

export function ComingSoon({ feature, className }: ComingSoonProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4 bg-muted/30 rounded-lg border border-dashed border-border',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Settings className="h-8 w-8 text-primary animate-pulse" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">Coming Soon</h3>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
        {feature} is currently under development and will be available soon.
      </p>
    </div>
  );
}
