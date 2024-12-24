

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

function HealthCare() {
  

  // Set the page title for SEO and page rendering
  UsePageTitle('Healthcare & Life Sciences');
  
  // Fetch the healthcarepage data using a custom hook
  const { data: healthcarepageData, loading, error } = usePageData('healthcarepage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no healthcarepage data, return null to prevent rendering empty UI
  if (!healthcarepageData) return null;

  return (
    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={healthcarepageData.videoData}
            headerTitle={healthcarepageData.headerTitle}
            headerDescription={healthcarepageData.headerDescription}
            backgroundImageUrl={healthcarepageData.backgroundImageUrl}
            knowMoreText={healthcarepageData.knowMoreText}
             isSlideshow= {false}
             footerText={healthcarepageData.footerText}
            //  footerItalicWords={healthcarepageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={healthcarepageData.BankingSolutions.title}
             solutionsData={healthcarepageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={healthcarepageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={healthcarepageData.Services.title}
            backgroundVideo={healthcarepageData.Services.backgroundVideo}
            services={healthcarepageData.Services.services}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={healthcarepageData.transformingEnterprises.carouselSlides}
            title={healthcarepageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(HealthCare);