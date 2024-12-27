

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

function Insurance() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Insurance Industry Solutions');
  
  // Fetch the insurancepage data using a custom hook
  const { data: insurancepageData, loading, error } = usePageData('insurancepage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no insurancepage data, return null to prevent rendering empty UI
  if (!insurancepageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={insurancepageData.videoData}
            headerTitle={insurancepageData.headerTitle}
            headerDescription={insurancepageData.headerDescription}
            backgroundImageUrl={insurancepageData.backgroundImageUrl}
            knowMoreText={insurancepageData.knowMoreText}
             isSlideshow= {false}
             footerText={insurancepageData.footerText}
            //  footerItalicWords={insurancepageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={insurancepageData.BankingSolutions.title}
             solutionsData={insurancepageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={insurancepageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={insurancepageData.Services.title}
            backgroundVideo={insurancepageData.Services.backgroundVideo}
            services={insurancepageData.Services.services}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={insurancepageData.transformingEnterprises.carouselSlides}
            title={insurancepageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(Insurance);