

import React, { memo } from 'react';
import UsePageTitle from '../../components/Resuable/UsePageTitle';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';


// Lazy load components

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const CookieMainDiv = React.lazy(() => import('../../components/CookiePolicyComponents/CookieMainDiv'));
const CookieInfo = React.lazy(() => import('../../components/CookiePolicyComponents/CookieInfo'));




// Memoized section components
const MemoizedCookieMainDiv = memo(CookieMainDiv);
const MemoizedCookieInfo = memo(CookieInfo);

function CookiePolicy() {

  UsePageTitle('Cookie Policy');
const { data: cookiepolicypageData, loading, error } = usePageData('cookiepolicypage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!cookiepolicypageData) return null;

  return (
   <PageWrapper>
          <MemoizedCookieMainDiv
          backgroundImage={cookiepolicypageData.backgroundImage}
          categories={cookiepolicypageData.categories}
          content={cookiepolicypageData.content}
          />

       <MemoizedCookieInfo
       sections={cookiepolicypageData.sections}
          />

        
          <ScrollToTop />
          </PageWrapper> 
  );
}

export default memo(CookiePolicy);