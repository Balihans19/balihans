

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

function PrivacyPolicy() {

  UsePageTitle('Privacy Policy');

const { data: privacypolicypageData, loading, error } = usePageData('privacypolicypage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!privacypolicypageData) return null;

  return (
   <PageWrapper>
          <MemoizedPoliciesMainDiv
          backgroundImage={privacypolicypageData.backgroundImage}
          categories={privacypolicypageData.categories}
          description={privacypolicypageData.description}
          sectionType="privacy"
          />

       <MemoizedPoliciesInfoDiv
       sections={privacypolicypageData.sections}
          />

        
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(PrivacyPolicy);