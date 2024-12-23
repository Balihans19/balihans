

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

function CookiePolicy() {

  UsePageTitle('Cookie Policy');
const { data: cookiepolicypageData, loading, error } = usePageData('cookiepolicypage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!cookiepolicypageData) return null;

  return (
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