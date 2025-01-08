

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

function IOT() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Internet of Things (IoT)');
  
  // Fetch the iotpage data using a custom hook
  const { data: iotpageData, loading, error } = usePageData('iotpage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no iotpage data, return null to prevent rendering empty UI
  if (!iotpageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={iotpageData.videoData}
            headerTitle={iotpageData.headerTitle}
            headerDescription={iotpageData.headerDescription}
            backgroundImageUrl={iotpageData.backgroundImageUrl}
            knowMoreText={iotpageData.knowMoreText}
             isSlideshow= {false}
             footerText={iotpageData.footerText}
            //  footerItalicWords={iotpageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-24 xl:bottom-16 xl:w-[500px] 2xl:right-24 2xl:bottom-28 2xl:w-[500px]"
          />

          <MemoizedBankingSolutions
             title={iotpageData.BankingSolutions.title}
             solutionsData={iotpageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={iotpageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={iotpageData.AiServices.title}
            backgroundImage={iotpageData.AiServices.backgroundImage}
            backgroundType="image"
          />

        
         <MemoizedDuoCarousel
            slides={iotpageData.transformingEnterprises.carouselSlides}
            title={iotpageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(IOT);