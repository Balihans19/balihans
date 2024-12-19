

import React, { memo } from 'react';
import UsePageTitle from '../../components/Resuable/UsePageTitle';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';


// Lazy load components

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const PrivacyPolicyMainDiv = React.lazy(() => import('../../components/PrivacyPolicyComponents/PrivacyPolicyMainDiv'));
const PersonalInformation = React.lazy(() => import('../../components/PrivacyPolicyComponents/PersonalInformation'));




// Memoized section components
const MemoizedPrivacyPolicyMainDiv = memo(PrivacyPolicyMainDiv);
const MemoizedPersonalInformation = memo(PersonalInformation);

function PrivacyPolicy() {

  UsePageTitle('Privacy Policy');

const { data: privacypolicypageData, loading, error } = usePageData('privacypolicypage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!privacypolicypageData) return null;

  return (
   <PageWrapper>
          <MemoizedPrivacyPolicyMainDiv
          backgroundImage={privacypolicypageData.backgroundImage}
          categories={privacypolicypageData.categories}
          description={privacypolicypageData.description}
          />

       <MemoizedPersonalInformation
       sections={privacypolicypageData.sections}
          />

        
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(PrivacyPolicy);