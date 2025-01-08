

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

function CloudAndInfrastructure() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Cloud And Infrastructure');
  
  // Fetch the cloudandinfrasturcturepage data using a custom hook
  const { data: cloudandinfrastructurepageData, loading, error } = usePageData('cloudandinfrastructurepage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no cloudandinfrastructurepage data, return null to prevent rendering empty UI
  if (!cloudandinfrastructurepageData) return null;

  return (
    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={cloudandinfrastructurepageData.videoData}
            headerTitle={cloudandinfrastructurepageData.headerTitle}
            headerDescription={cloudandinfrastructurepageData.headerDescription}
            backgroundImageUrl={cloudandinfrastructurepageData.backgroundImageUrl}
            knowMoreText={cloudandinfrastructurepageData.knowMoreText}
             isSlideshow= {false}
             footerText={cloudandinfrastructurepageData.footerText}
            //  footerItalicWords={cloudandinfrastructurepageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-24 xl:bottom-16 xl:w-[500px] 2xl:right-32 2xl:bottom-24 2xl:w-[500px]"
          />

          <MemoizedBankingSolutions
             title={cloudandinfrastructurepageData.BankingSolutions.title}
             solutionsData={cloudandinfrastructurepageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={cloudandinfrastructurepageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={cloudandinfrastructurepageData.AiServices.title}
            backgroundVideo={cloudandinfrastructurepageData.AiServices.backgroundVideo}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={cloudandinfrastructurepageData.transformingEnterprises.carouselSlides}
            title={cloudandinfrastructurepageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(CloudAndInfrastructure);