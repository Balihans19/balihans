

import React, { memo } from 'react';
import UsePageTitle from '../../components/Resuable/UsePageTitle';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';


// Lazy load components

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const PoliciesMainDiv = React.lazy(() => import('../../components/PoliciesComponents/PoliciesMainDiv'));
const PoliciesInfoDiv = React.lazy(() => import('../../components/PoliciesComponents/PoliciesInfoDiv'));




// Memoized section components
const MemoizedPoliciesMainDiv = memo(PoliciesMainDiv);
const MemoizedPoliciesInfoDiv = memo(PoliciesInfoDiv);

function SecurityPolicy() {

  UsePageTitle('Security Policy');
const { data: securitypolicypageData, loading, error } = usePageData('securitypolicypage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!securitypolicypageData) return null;

  return (
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