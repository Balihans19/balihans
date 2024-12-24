import { useState, useEffect } from 'react'; 
import axios from 'axios'; 

// Factory function to create an API utility object for interacting with a specific endpoint
const createAPI = (endpoint) => ({
  baseUrl: process.env.REACT_APP_API_URL, // Base URL for the API, sourced from environment variables for flexibility
  
  // Method to fetch data from the specified endpoint
  async fetchData() {
    try {
      // Sending a GET request to the API
      const response = await axios.get(`${this.baseUrl}/api/${endpoint}`, {
        headers: {
          'Cache-Control': 'public, max-age=3600', // Enables client-side caching for one hour
        },
        timeout: 5000, // Sets a timeout of 5 seconds for the request
      });
      return response.data; // Returns the response data if the request is successful
    } catch (error) {
      // Handling different types of errors that may occur during the request
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        throw new Error(`Server Error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response was received
        throw new Error('Network Error: Unable to reach the server');
      } else {
        // Any other errors (e.g., issues with setting up the request)
        throw new Error(`Error: ${error.message}`);
      }
    }
  },
});

// Custom React hook for managing API data fetching and related states
export const usePageData = (endpoint) => {
  const [data, setData] = useState(null); // Holds the fetched data
  const [loading, setLoading] = useState(true); // Indicates whether the data is still loading
  const [error, setError] = useState(null); // Stores any error messages from the API call

  useEffect(() => {
    let isMounted = true; // Tracks whether the component is still mounted to avoid state updates on unmounted components
    const api = createAPI(endpoint); // Creates an API utility for the specified endpoint

    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        setLoading(true); // Sets loading state to true before fetching data
        const response = await api.fetchData(); // Fetches data using the API utility
        
        if (isMounted) {
          setData(response); // Updates state with the fetched data if the component is still mounted
          setError(null); // Clears any previous errors
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || `Failed to fetch ${endpoint} data`); // Sets an error message if the request fails
        }
      } finally {
        if (isMounted) {
          setLoading(false); // Resets the loading state after the request completes
        }
      }
    };

    fetchData(); // Initiates data fetching

    return () => {
      isMounted = false; // Ensures no state updates occur if the component unmounts
    };
  }, [endpoint]); // Re-runs the effect when the `endpoint` changes

  // Returns an object containing the fetched data, loading status, and error message
  return { data, loading, error };
};




