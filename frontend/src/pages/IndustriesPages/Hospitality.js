

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

function Hospitality() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Hospitality');
  
  // Fetch the hospitalitypage data using a custom hook
  const { data: hospitalitypageData, loading, error } = usePageData('hospitalitypage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no hospitalitypage data, return null to prevent rendering empty UI
  if (!hospitalitypageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={hospitalitypageData.videoData}
            headerTitle={hospitalitypageData.headerTitle}
            headerDescription={hospitalitypageData.headerDescription}
            backgroundImageUrl={hospitalitypageData.backgroundImageUrl}
            knowMoreText={hospitalitypageData.knowMoreText}
             isSlideshow= {false}
             footerText={hospitalitypageData.footerText}
            //  footerItalicWords={hospitalitypageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-28 xl:bottom-16 xl:w-[550px] 2xl:right-36 2xl:bottom-28 2xl:w-[550px]"
          />

          <MemoizedBankingSolutions
             title={hospitalitypageData.BankingSolutions.title}
             solutionsData={hospitalitypageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={hospitalitypageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={hospitalitypageData.Services.title}
            backgroundVideo={hospitalitypageData.Services.backgroundVideo}
            services={hospitalitypageData.Services.services}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={hospitalitypageData.transformingEnterprises.carouselSlides}
            title={hospitalitypageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(Hospitality);