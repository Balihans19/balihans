

import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import UsePageTitle from '../../components/Resuable/UsePageTitle';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';



// Lazy load components for performance optimization

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const JoinUsMainDiv = React.lazy(() => import('../../components/JoinUsComponents/JoinUsMainDiv'));
const JobGrid = React.lazy(() => import('../../components/JoinUsComponents/JobGrid'));
const ResumeUploader = React.lazy(() => import('../../components/JoinUsComponents/ResumeUploader'));





// Memoized section components to avoid unnecessary re-renders
const MemoizedJoinUsMainDiv = memo(JoinUsMainDiv);
const MemoizedJobGrid = memo(JobGrid);
const MemoizedResumeUploader = memo(ResumeUploader);




function JoinUs() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Join Us');
    
    // // Fetch the joinuspage data using a custom hook  
    const { data: joinuspageData, loading, error } = usePageData('joinuspage');
    
    // // Show loading spinner while fetching data
    if (loading) return <LoadingSpinner />;

    // // Show error fallback UI if there is an error
    if (error) return <ErrorFallback error={{ message: error }} />;
    
    // // If there's no joinuspage data, return null to prevent rendering empty UI
    if (!joinuspageData) return null;
  

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
   <PageWrapper>
     
          <MemoizedJoinUsMainDiv
          backgroundImageUrl={joinuspageData.backgroundImageUrl}
          heading={joinuspageData.heading}
          description={joinuspageData.description}
          values={joinuspageData.values}
          />
          <MemoizedJobGrid
          jobOpenings={joinuspageData.JobGrid.jobOpenings}
          />
         
         <MemoizedResumeUploader
          />
          

        
          <ScrollToTop />
          </PageWrapper> 
  );
}

export default memo(JoinUs);