'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, RefreshCw, AlertTriangle, XCircle } from 'lucide-react';

type ErrorSeverity = 'error' | 'warning' | 'info';

interface ErrorStateProps {
  title?: string;
  message?: string;
  severity?: ErrorSeverity;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
  fullPage?: boolean;
}

const severityConfig = {
  error: {
    icon: XCircle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  info: {
    icon: AlertCircle,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
};

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  severity = 'error',
  onRetry,
  retryLabel = 'Try again',
  className,
  fullPage = false,
}: ErrorStateProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  const content = (
    <div className={cn('text-center', className)}>
      <div
        className={cn(
          'mx-auto w-16 h-16 rounded-full flex items-center justify-center',
          config.bgColor
        )}
      >
        <Icon className={cn('h-8 w-8', config.iconColor)} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          {retryLabel}
        </button>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-lg border p-8',
        config.borderColor,
        config.bgColor
      )}
    >
      {content}
    </div>
  );
}

// Inline error message
interface InlineErrorProps {
  message: string;
  className?: string;
}

export function InlineError({ message, className }: InlineErrorProps) {
  return (
    <div className={cn('flex items-center gap-2 text-red-500 text-sm', className)}>
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

// Error boundary fallback
interface ErrorBoundaryFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: ErrorBoundaryFallbackProps) {
  return (
    <ErrorState
      title="Application Error"
      message={error.message || 'An unexpected error occurred'}
      severity="error"
      onRetry={resetErrorBoundary}
      retryLabel="Reload"
      fullPage
    />
  );
}

// Network error state
interface NetworkErrorProps {
  onRetry?: () => void;
  className?: string;
}

export function NetworkError({ onRetry, className }: NetworkErrorProps) {
  return (
    <ErrorState
      title="Connection Error"
      message="Unable to connect to the server. Please check your network connection and try again."
      severity="warning"
      onRetry={onRetry}
      className={className}
    />
  );
}

// Permission error state
interface PermissionErrorProps {
  resource?: string;
  className?: string;
}

export function PermissionError({ resource = 'this resource', className }: PermissionErrorProps) {
  return (
    <ErrorState
      title="Access Denied"
      message={`You don't have permission to access ${resource}. Please contact your administrator.`}
      severity="warning"
      className={className}
    />
  );
}

// Not found state
interface NotFoundErrorProps {
  resource?: string;
  onGoBack?: () => void;
  className?: string;
}

export function NotFoundError({
  resource = 'Resource',
  onGoBack,
  className,
}: NotFoundErrorProps) {
  return (
    <ErrorState
      title={`${resource} Not Found`}
      message={`The ${resource.toLowerCase()} you're looking for doesn't exist or has been removed.`}
      severity="info"
      onRetry={onGoBack}
      retryLabel="Go Back"
      className={className}
    />
  );
}
