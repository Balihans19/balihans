import React, { Suspense, memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

/**
 * LoadingSpinner Component
 * A functional component that renders a spinning loader while content is being fetched or loaded.
 * This is memoized to prevent unnecessary re-renders when the component's props remain the same.
 */
export const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    {/* A simple spinner animation with a border-top and border-bottom in blue color */}
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
));

/**
 * ErrorFallback Component
 * A fallback UI displayed when an error is encountered in the wrapped component.
 * This component shows a message and a button to attempt to reset the error boundary.
 *
 * @param {Object} error - The error object that contains the error information.
 * @param {Function} resetErrorBoundary - A function to reset the error boundary and attempt a re-render.
 */
export const ErrorFallback = memo(({ error, resetErrorBoundary }) => (
  <div className="text-center p-4">
    <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
    {/* Display the error message */}
    <p className="text-gray-600 mt-2">{error.message}</p>
    <button 
      onClick={resetErrorBoundary}  // Reset error boundary on button click
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Try again
    </button>
  </div>
));

/**
 * PageWrapper Component
 * A wrapper component that combines error handling and suspense-based loading for child components.
 * It uses both ErrorBoundary for catching errors and Suspense for handling lazy-loaded components.
 *
 * @param {ReactNode} children - The content to be rendered inside the wrapper.
 */
export const PageWrapper = memo(({ children }) => (
  <ErrorBoundary 
    FallbackComponent={ErrorFallback}  // Displays the ErrorFallback component when an error occurs
    onReset={() => window.location.reload()}  // Refresh the page when the error boundary is reset
  >
    {/* Suspense is used for components that load asynchronously. It shows a fallback (loading spinner) until the component is ready */}
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen">
        {children}
      </div>
    </Suspense>
  </ErrorBoundary>
));


