import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

/**
 * PrivateRoute - A Higher-Order Component (HOC) that restricts access to authenticated users only.
 * It checks authentication status via a backend API before rendering the protected route.
 * If the user is not authenticated, they are redirected to the login page.
 *
 * @param {object} props - React component props
 * @param {React.ReactNode} props.children - The child components (protected routes)
 * @returns {JSX.Element} - Protected route or redirection to login page
 */
const PrivateRoute = ({ children }) => {
  // State to track authentication status: `null` means check is in progress
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Get the current route location

  /**
   * Runs once on component mount to verify authentication status.
   */
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Verifies the user's authentication status by calling the backend API.
   * If the token is valid, grants access; otherwise, denies access.
   */
  const checkAuthStatus = async () => {
    try {
      // API request to verify the authentication token (JWT)
      await axios.get('/api/admin/verify-token', {
        withCredentials: true, // Ensures cookies (including auth tokens) are sent
      });

      // If the request is successful, mark user as authenticated
      setIsAuthenticated(true);
    } catch (error) {
      // If an error occurs, assume authentication failed
      setIsAuthenticated(false);
    } finally {
      // Mark the loading state as complete
      setIsLoading(false);
    }
  };

  // Show a loading spinner while authentication check is in progress
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  // Render the protected route if authentication is successful
  return children;
};

export default PrivateRoute;

