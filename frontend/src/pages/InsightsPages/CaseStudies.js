

import React, { memo } from 'react';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const CaseStudiesPageMainDiv = React.lazy(() => import('../../components/CaseStudiesPageComponents/CaseStudiesPageMainDiv'));
const CustomerStories = React.lazy(() => import('../../components/CaseStudiesPageComponents/CustomerStories'));
const AiServices = React.lazy(() => import('../../components/AIComponents/AiServices'));



// Memoized section components to avoid unnecessary re-renders
const MemoizedCaseStudiesPageMainDiv = memo(CaseStudiesPageMainDiv);
const MemoizedCustomerStories = memo(CustomerStories);
const MemoizedAiServices = memo(AiServices);


function CaseStudies() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Case Studies');
  
//   // Fetch the casestudiespage data using a custom hook
  const { data: casestudiespageData, loading, error } = usePageData('casestudiespage');
  
//   // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

//   // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

//   // If there's no casestudiespage data, return null to prevent rendering empty UI
  if (!casestudiespageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedCaseStudiesPageMainDiv
            backgroundVideo={casestudiespageData.backgroundVideo}
            categories={casestudiespageData.categories}
            title={casestudiespageData.title}
            description={casestudiespageData.description}
          />

         <MemoizedCustomerStories 
            />

        <MemoizedAiServices
            title={casestudiespageData.AiServices.title}
            backgroundVideo={casestudiespageData.AiServices.backgroundVideo}
            backgroundType="video"
          />
       
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(CaseStudies);