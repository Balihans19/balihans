

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

function Manufacturing() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Manufacturing Industry Solutions');
  
  // Fetch the manufacturingpage data using a custom hook
  const { data: manufacturingpageData, loading, error } = usePageData('manufacturingpage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no manufacturingpage data, return null to prevent rendering empty UI
  if (!manufacturingpageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={manufacturingpageData.videoData}
            headerTitle={manufacturingpageData.headerTitle}
            headerDescription={manufacturingpageData.headerDescription}
            backgroundImageUrl={manufacturingpageData.backgroundImageUrl}
            knowMoreText={manufacturingpageData.knowMoreText}
             isSlideshow= {false}
             footerText={manufacturingpageData.footerText}
            //  footerItalicWords={manufacturingpageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={manufacturingpageData.BankingSolutions.title}
             solutionsData={manufacturingpageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={manufacturingpageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={manufacturingpageData.Services.title}
            backgroundImage={manufacturingpageData.Services.backgroundImage}
            services={manufacturingpageData.Services.services}
            backgroundType="image"
          />

        
         <MemoizedDuoCarousel
            slides={manufacturingpageData.transformingEnterprises.carouselSlides}
            title={manufacturingpageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(Manufacturing);