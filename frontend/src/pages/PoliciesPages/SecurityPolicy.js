

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

function SecurityPolicy() {
  // Set the page title for SEO and page rendering
  UsePageTitle('Security Policy');

  // Fetch the securitypolicypage data using a custom hook
  const { data: securitypolicypageData, loading, error } = usePageData('securitypolicypage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no securitypolicypage data, return null to prevent rendering empty UI
  if (!securitypolicypageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
   <PageWrapper>
          <MemoizedPoliciesMainDiv
          backgroundImage={securitypolicypageData.backgroundImage}
          categories={securitypolicypageData.categories}
          content={securitypolicypageData.content}
          />

       <MemoizedPoliciesInfoDiv
       sections={securitypolicypageData.sections}
          />

        
          <ScrollToTop />
          </PageWrapper> 
  );
}

export default memo(SecurityPolicy);