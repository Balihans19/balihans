import React, { Suspense, memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
));

export const ErrorFallback = memo(({ error, resetErrorBoundary }) => (
  <div className="text-center p-4">
    <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
    <p className="text-gray-600 mt-2">{error.message}</p>
    <button 
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Try again
    </button>
  </div>
));

export const PageWrapper = memo(({ children }) => (
  <ErrorBoundary 
    FallbackComponent={ErrorFallback} 
    onReset={() => window.location.reload()}
  >
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen">
        {children}
      </div>
    </Suspense>
  </ErrorBoundary>
));