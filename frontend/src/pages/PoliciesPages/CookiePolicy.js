

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

function CookiePolicy() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Cookie Policy');
  
  // Fetch the cookiepolicypage data using a custom hook
  const { data: cookiepolicypageData, loading, error } = usePageData('cookiepolicypage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no cookiepolicypage data, return null to prevent rendering empty UI
  if (!cookiepolicypageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
   <PageWrapper>
          <MemoizedPoliciesMainDiv
          backgroundImage={cookiepolicypageData.backgroundImage}
          categories={cookiepolicypageData.categories}
          content={cookiepolicypageData.content}
          />

       <MemoizedPoliciesInfoDiv
       sections={cookiepolicypageData.sections}
          />

        
          <ScrollToTop />
          </PageWrapper> 
  );
}

export default memo(CookiePolicy);