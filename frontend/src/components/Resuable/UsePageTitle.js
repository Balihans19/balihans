import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * UsePageTitle Hook
 * 
 *  title - The title segment to append to the base title ("Balihans").
 */

const UsePageTitle = (title) => {
  const location = useLocation(); // Get the current location object from React Router

  useEffect(() => {
    // Update the document's title whenever the pathname or title changes
    document.title = `Balihans | ${title}`;
  }, [location.pathname, title]); // Dependencies: Run effect whenever the pathname or title changes
};

export default UsePageTitle;



