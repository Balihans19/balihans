import { useState, useEffect } from 'react';
import axios from 'axios';

const createAPI = (endpoint) => ({
  baseUrl: process.env.REACT_APP_API_URL,
  
  async fetchData() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/${endpoint}`, {
        headers: {
          'Cache-Control': 'public, max-age=3600',
        },
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Server Error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('Network Error: Unable to reach the server');
      } else {
        throw new Error(`Error: ${error.message}`);
      }
    }
  },
});

export const usePageData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    const api = createAPI(endpoint);

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.fetchData();
        
        if (isMounted) {
          setData(response);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || `Failed to fetch ${endpoint} data`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
};
