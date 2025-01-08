

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
const Services = React.lazy(() => import('../../components/Resuable/Services'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));


// Memoized section components to avoid unnecessary re-renders
const MemoizedMainDiv = memo(MainDiv);
const MemoizedBankingSolutions = memo(BankingSolutions);
const MemoizedSpotlight = memo(Spotlight);
const MemoizedServices = memo(Services);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function Energy() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Energy, Resources & Utilities');
  
  // Fetch the energypage data using a custom hook
  const { data: energypageData, loading, error } = usePageData('energypage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no energypage data, return null to prevent rendering empty UI
  if (!energypageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={energypageData.videoData}
            headerTitle={energypageData.headerTitle}
            headerDescription={energypageData.headerDescription}
            backgroundImageUrl={energypageData.backgroundImageUrl}
            knowMoreText={energypageData.knowMoreText}
             isSlideshow= {false}
             footerText={energypageData.footerText}
            //  footerItalicWords={energypageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-24 xl:bottom-16 xl:w-[400px] 2xl:right-32 2xl:bottom-28 2xl:w-[400px]"
          />

          <MemoizedBankingSolutions
             title={energypageData.BankingSolutions.title}
             solutionsData={energypageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={energypageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={energypageData.Services.title}
            backgroundVideo={energypageData.Services.backgroundVideo}
            services={energypageData.Services.services}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={energypageData.transformingEnterprises.carouselSlides}
            title={energypageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(Energy);