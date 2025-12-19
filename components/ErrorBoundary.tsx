import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-[#0F1113] text-[#E2E2E2] p-8">
          <div className="max-w-md w-full bg-[#1A1D21] border border-[#2A2E35] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-[#E0B945]" />
              <h2 className="text-xl font-serif text-[#E2E2E2]">Something went wrong</h2>
            </div>
            <p className="text-[#999] text-sm mb-4">
              {this.state.error?.message || 'An unexpected error occurred. Please try refreshing the page.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-[#B08D57] text-[#0F1113] font-semibold rounded hover:bg-[#B08D57]/90 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#2A2E35] text-[#E2E2E2] font-semibold rounded hover:bg-[#333] transition-colors"
              >
                Reload Page
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 pt-4 border-t border-[#2A2E35]">
                <summary className="text-xs text-[#666] cursor-pointer mb-2">Error Details (Dev Only)</summary>
                <pre className="text-xs text-[#999] overflow-auto max-h-40 bg-[#0F1113] p-2 rounded">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

