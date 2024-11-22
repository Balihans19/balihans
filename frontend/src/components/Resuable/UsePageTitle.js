import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UsePageTitle = (title) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `Balihans | ${title}`;
  }, [location.pathname, title]);
};

export default UsePageTitle;