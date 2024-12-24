/**
 * PageTopNavigator Component
 * ------------------------
 * Purpose: Automatically scrolls the window to the top when navigation occurs between routes.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Component that handles automatic scroll-to-top functionality
const PageTopNavigator = () => {

  // This pathname updates whenever the current route changes
  const { pathname } = useLocation();

  useEffect(() => {
    // Effect hook that runs whenever the pathname changes
    // This ensures the scroll reset occurs on every route change
    window.scrollTo({
      top: 0,      // Scroll to the very top of the page
      left: 0,     // Ensure there's no horizontal scroll
      behavior: 'instant'  // 'instant' provides better performance than 'smooth'
                          // as it doesn't trigger animation frames
    });
  }, [pathname]); // Dependency array with pathname ensures effect runs on route changes

 
  return null;
};

export default PageTopNavigator;

