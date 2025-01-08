

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

function MediaAndEntertainment() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Media & Entertainment Industry Solutions');
  
  // Fetch the mediaandentertainmentpage data using a custom hook
  const { data: mediaandentertainmentpageData, loading, error } = usePageData('mediaandentertainmentpage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no mediaandentertainmentpage data, return null to prevent rendering empty UI
  if (!mediaandentertainmentpageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={mediaandentertainmentpageData.videoData}
            headerTitle={mediaandentertainmentpageData.headerTitle}
            headerDescription={mediaandentertainmentpageData.headerDescription}
            backgroundImageUrl={mediaandentertainmentpageData.backgroundImageUrl}
            knowMoreText={mediaandentertainmentpageData.knowMoreText}
             isSlideshow= {false}
             footerText={mediaandentertainmentpageData.footerText}
            //  footerItalicWords={mediaandentertainmentpageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-24 xl:bottom-16 xl:w-[500px] 2xl:right-36 2xl:bottom-20 2xl:w-[670px]"
          />

          <MemoizedBankingSolutions
             title={mediaandentertainmentpageData.BankingSolutions.title}
             solutionsData={mediaandentertainmentpageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={mediaandentertainmentpageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={mediaandentertainmentpageData.Services.title}
            backgroundImage={mediaandentertainmentpageData.Services.backgroundImage}
            services={mediaandentertainmentpageData.Services.services}
            backgroundType="image"
          />

        
         <MemoizedDuoCarousel
            slides={mediaandentertainmentpageData.transformingEnterprises.carouselSlides}
            title={mediaandentertainmentpageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(MediaAndEntertainment);