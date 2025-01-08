

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

function BSFI() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('BSFI');
 
  
 // Fetch the bsfipage data using a custom hook
  const { data: bsfipageData, loading, error } = usePageData('bsfipage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no bsfipage data, return null to prevent rendering empty UI
  if (!bsfipageData) return null;

  return (
    
    // Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={bsfipageData.videoData}
            headerTitle={bsfipageData.headerTitle}
            headerDescription={bsfipageData.headerDescription}
            backgroundImageUrl={bsfipageData.backgroundImageUrl}
            knowMoreText={bsfipageData.knowMoreText}
             isSlideshow= {false}
             footerText={bsfipageData.footerText}
            //  footerItalicWords={bsfipageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-32 xl:bottom-16 xl:w-[500px] 2xl:right-36 2xl:bottom-28 2xl:w-[500px]"
          />
        
          <MemoizedBankingSolutions
             title={bsfipageData.BankingSolutions.title}
             solutionsData={bsfipageData.BankingSolutions.solutionData}
          />
       

          <MemoizedSpotlight
            spotlightItems={bsfipageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={bsfipageData.Services.title}
            backgroundImage={bsfipageData.Services.backgroundImage}
            services={bsfipageData.Services.services}
            backgroundType="image"
          />

        
<MemoizedDuoCarousel
            slides={bsfipageData.transformingBusinesses.carouselSlides}
            title={bsfipageData.transformingBusinesses.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(BSFI);

