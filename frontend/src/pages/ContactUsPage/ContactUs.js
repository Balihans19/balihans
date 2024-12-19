

import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import UsePageTitle from '../../components/Resuable/UsePageTitle';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';


// Lazy load components

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const ContactUsMainDiv = React.lazy(() => import('../../components/ContactUsComponents/ContactUsMainDiv'));
const ContactUsVideoDiv = React.lazy(() => import('../../components/ContactUsComponents/ContactUsVideoDiv'));




// Memoized section components
const MemoizedContactUsMainDiv = memo(ContactUsMainDiv);
const MemoizedContactUsVideoDiv = memo(ContactUsVideoDiv);




function ContactUs() {

  UsePageTitle('Contact Us');

    const { data: contactuspageData, loading, error } = usePageData('contactuspage');
  
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorFallback error={{ message: error }} />;
    if (!contactuspageData) return null;
  

  return (
   <PageWrapper>
    
          <MemoizedContactUsMainDiv
          />

        <MemoizedContactUsVideoDiv
        bgVideo={contactuspageData.bgVideo}
        mainTitle={contactuspageData.mainTitle}
        subTitle={contactuspageData.subTitle}
        officeData={contactuspageData.officeData}
          /> 

        
          <ScrollToTop />
          </PageWrapper> 
  );
}

export default memo(ContactUs);