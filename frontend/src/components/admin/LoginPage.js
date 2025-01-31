import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Loader2, LogOut } from "lucide-react";

const LoginPage = () => {
  // State variables for handling form input, errors, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // React Router hooks for navigation and retrieving location state
  const navigate = useNavigate();
  const location = useLocation();
  
  // Authentication hook providing login and logout functionality
  const { login, logout } = useAuth();
  
  // Determine the redirect path after successful login
  const from = location.state?.from || "/admin/case-studies";

  /**
   * Handles form submission for login.
   * Prevents default form submission behavior, clears previous errors,
   * sets loading state, and attempts authentication.
   * On success, navigates to the intended page; on failure, displays an error message.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setLoading(true); // Indicate that login is in progress

    const success = await login(email, password);
    setLoading(false); // Reset loading state after login attempt

    if (success) {
      navigate(from, { replace: true }); // Redirect to the intended page on success
    } else {
      setError("Invalid credentials"); // Display error message on failure
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md space-y-6">
        {/* Page title */}
        <h2 className="text-3xl font-bold text-center text-gray-900">Admin Login</h2>

        {/* Error message display */}
        {error && (
          <div className="flex justify-between items-center bg-red-100 text-red-700 px-4 py-2 rounded-md">
            <span>{error}</span>
            <button onClick={() => setError("")} className="text-lg font-bold">&times;</button>
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Password input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Submit button with loading indicator */}
          <button
            type="submit"
            className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 font-medium"
            disabled={loading} // Disable button while loading to prevent multiple submissions
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign in"}
          </button>
        </form>

        {/* Logout button (for convenience) */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 font-medium"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;


