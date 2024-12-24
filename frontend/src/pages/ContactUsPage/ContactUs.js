

import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import UsePageTitle from '../../components/Resuable/UsePageTitle';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';


// Lazy load components for performance optimization

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const ContactUsMainDiv = React.lazy(() => import('../../components/ContactUsComponents/ContactUsMainDiv'));
const ContactUsVideoDiv = React.lazy(() => import('../../components/ContactUsComponents/ContactUsVideoDiv'));




// Memoized section components to avoid unnecessary re-renders
const MemoizedContactUsMainDiv = memo(ContactUsMainDiv);
const MemoizedContactUsVideoDiv = memo(ContactUsVideoDiv);




function ContactUs() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Contact Us');
    
    // Fetch the contactuspage data using a custom hook  
    const { data: contactuspageData, loading, error } = usePageData('contactuspage');
    
    // Show loading spinner while fetching data
    if (loading) return <LoadingSpinner />;

    // Show error fallback UI if there is an error
    if (error) return <ErrorFallback error={{ message: error }} />;
    
    // If there's no contactuspage data, return null to prevent rendering empty UI
    if (!contactuspageData) return null;
  

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
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