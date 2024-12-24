

import React, { memo } from 'react';
import UsePageTitle from '../../components/Resuable/UsePageTitle';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';


// Lazy load components for performance optimization

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const PoliciesMainDiv = React.lazy(() => import('../../components/PoliciesComponents/PoliciesMainDiv'));
const PoliciesInfoDiv = React.lazy(() => import('../../components/PoliciesComponents/PoliciesInfoDiv'));




// Memoized section components to avoid unnecessary re-renders
const MemoizedPoliciesMainDiv = memo(PoliciesMainDiv);
const MemoizedPoliciesInfoDiv = memo(PoliciesInfoDiv);

function Disclaimer() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Disclaimer');

  // Fetch the disclaimerpage data using a custom hook
  const { data: disclaimerpageData, loading, error } = usePageData('disclaimerpage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no disclaimerpage data, return null to prevent rendering empty UI
  if (!disclaimerpageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
   <PageWrapper>
          <MemoizedPoliciesMainDiv
          backgroundImage={disclaimerpageData.backgroundImage}
          categories={disclaimerpageData.categories}
          content={disclaimerpageData.content}
          />

       <MemoizedPoliciesInfoDiv
       sections={disclaimerpageData.sections}
          />

        
          <ScrollToTop />
          </PageWrapper> 
  );
}

export default memo(Disclaimer);