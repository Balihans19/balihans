import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

// Base API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL;

// Creating an authentication context to manage authentication state globally
const AuthContext = createContext(null);

/**
 * AuthProvider - Provides authentication-related state and functions to the entire app.
 * Manages user authentication, login, logout, and session validation.
 *
 * @param {object} props - React component props
 * @param {React.ReactNode} props.children - The child components that need authentication access
 * @returns {JSX.Element} - Authentication provider with context
 */
export const AuthProvider = ({ children }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Configure axios defaults to ensure consistent API requests
  axios.defaults.baseURL = API_URL;
  axios.defaults.withCredentials = true; // Required for sending authentication cookies
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  /**
   * Handles user login by sending credentials to the backend.
   * If successful, updates authentication state and stores user data.
   *
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @returns {Promise<boolean>} - Returns `true` if login is successful, otherwise `false`
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/admin/login', { email, password });

      if (response.data) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      // In a production app, consider logging errors to an external monitoring service
      return false;
    }
  };

  /**
   * Logs out the user by calling the backend logout API.
   * Clears authentication state and removes user data.
   */
  const logout = async () => {
    try {
      await axios.post('/api/admin/logout');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      // Logout failure should not break the user experience
    }
  };

  /**
   * Verifies the user's authentication status by checking their session token.
   * If the session is valid, updates authentication state and stores user data.
   * Runs automatically on component mount.
   */
  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/admin/verify-token');
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false); // Ensure loading state is updated regardless of success or failure
    }
  };

  // Run authentication check once when the component is mounted
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to consume authentication context.
 * Ensures it is used within an AuthProvider to prevent errors.
 *
 * @returns {object} - Authentication state and methods
 * @throws {Error} - If used outside of an AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};



