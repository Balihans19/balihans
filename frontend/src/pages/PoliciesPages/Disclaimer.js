

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

function Disclaimer() {

  UsePageTitle('Disclaimer');
const { data: disclaimerpageData, loading, error } = usePageData('disclaimerpage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!disclaimerpageData) return null;

  return (
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