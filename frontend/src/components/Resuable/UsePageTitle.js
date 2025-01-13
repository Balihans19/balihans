



import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * UsePageTitle Hook
 * 
 * title - The title segment to append to the base title ("Balihans").
 * description - Optional description for the page (used for SEO).
 */
const UsePageTitle = (title, description) => {
  const location = useLocation(); // Get the current location object from React Router

  useEffect(() => {
    // Update the document's title
    document.title = `Balihans | ${title}`;

    // Update the meta description if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        // Create meta description tag if it doesn't exist
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }
  }, [location.pathname, title, description]); // Dependencies: Run effect whenever pathname, title, or description changes
};

export default UsePageTitle;



// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// /**
//  * UsePageTitle Hook
//  * 
//  *  title - The title segment to append to the base title ("Balihans").
//  */

// const UsePageTitle = (title) => {
//   const location = useLocation(); // Get the current location object from React Router

//   useEffect(() => {
//     // Update the document's title whenever the pathname or title changes
//     document.title = `Balihans | ${title}`;
//   }, [location.pathname, title]); // Dependencies: Run effect whenever the pathname or title changes
// };

// export default UsePageTitle;