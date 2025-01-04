

import React, { memo } from 'react';
import UsePageTitle from '../../components/Resuable/UsePageTitle';
import {  PageWrapper } from '../../components/common/PageWrapper';



// Lazy load components for performance optimization

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const SubmitResume = React.lazy(() => import('../../components/SubmitResumeComponents/SubmitResume'));






// Memoized section components to avoid unnecessary re-renders
const MemoizedSubmitResume = memo(SubmitResume);




function SubmitResumePage() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Submit Resume');
    
    
  

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
   <PageWrapper>
     
          <MemoizedSubmitResume
          />
         
          <ScrollToTop />
          </PageWrapper> 
  );
}

export default memo(SubmitResumePage);