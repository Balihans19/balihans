

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

function DigitalEnterprise() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Digital Enterprise Services');
  
  // Fetch the digitalenterprisepage data using a custom hook
  const { data: digitalenterprisepageData, loading, error } = usePageData('digitalenterprisepage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no digitalenterprisepage data, return null to prevent rendering empty UI
  if (!digitalenterprisepageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={digitalenterprisepageData.videoData}
            headerTitle={digitalenterprisepageData.headerTitle}
            headerDescription={digitalenterprisepageData.headerDescription}
            backgroundImageUrl={digitalenterprisepageData.backgroundImageUrl}
            knowMoreText={digitalenterprisepageData.knowMoreText}
             isSlideshow= {false}
             footerText={digitalenterprisepageData.footerText}
            //  footerItalicWords={digitalenterprisepageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-32 xl:bottom-16 xl:w-[500px] 2xl:right-32 2xl:bottom-28 2xl:w-[500px]"
          />

          <MemoizedBankingSolutions
             title={digitalenterprisepageData.BankingSolutions.title}
             solutionsData={digitalenterprisepageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={digitalenterprisepageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={digitalenterprisepageData.AiServices.title}
            backgroundVideo={digitalenterprisepageData.AiServices.backgroundVideo}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={digitalenterprisepageData.transformingEnterprises.carouselSlides}
            title={digitalenterprisepageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(DigitalEnterprise);