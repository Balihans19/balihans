

import React, { memo } from 'react';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const MainDiv = React.lazy(() => import('../../components/Resuable/MainDiv'));
const BankingSolutions = React.lazy(() => import('../../components/BSFIComponents/BankingSolutions'));
const Spotlight = React.lazy(() => import('../../components/BSFIComponents/Spotlight'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const AiServices = React.lazy(() => import('../../components/AIComponents/AiServices'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));


// Memoized section components to avoid unnecessary re-renders
const MemoizedMainDiv = memo(MainDiv);
const MemoizedBankingSolutions = memo(BankingSolutions);
const MemoizedSpotlight = memo(Spotlight);
const MemoizedAiServices = memo(AiServices);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function TestingServices() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Testing Services');
  
  // Fetch the testingservicespage data using a custom hook
  const { data: testingservicespageData, loading, error } = usePageData('testingservicespage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no testingservicespage data, return null to prevent rendering empty UI
  if (!testingservicespageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={testingservicespageData.videoData}
            headerTitle={testingservicespageData.headerTitle}
            headerDescription={testingservicespageData.headerDescription}
            backgroundImageUrl={testingservicespageData.backgroundImageUrl}
            knowMoreText={testingservicespageData.knowMoreText}
             isSlideshow= {false}
             footerText={testingservicespageData.footerText}
            //  footerItalicWords={testingservicespageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-12 xl:bottom-16 xl:w-[500px] 2xl:right-36 2xl:bottom-28 2xl:w-[570px]"
          />

          <MemoizedBankingSolutions
             title={testingservicespageData.BankingSolutions.title}
             solutionsData={testingservicespageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={testingservicespageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={testingservicespageData.AiServices.title}
            backgroundVideo={testingservicespageData.AiServices.backgroundVideo}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={testingservicespageData.transformingEnterprises.carouselSlides}
            title={testingservicespageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(TestingServices);