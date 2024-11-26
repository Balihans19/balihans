import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll to Top Component
const PageTopNavigator = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' for performance
    });
  }, [pathname]);

  return null;
};

export default PageTopNavigator;