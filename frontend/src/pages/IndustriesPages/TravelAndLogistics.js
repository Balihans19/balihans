

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

function TravelAndLogistics() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Travel & Logistics Industry Solutions');
  
  // Fetch the travelandlogisticspage data using a custom hook
  const { data: travelandlogisticspageData, loading, error } = usePageData('travelandlogisticspage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no travelandlogisticspage data, return null to prevent rendering empty UI
  if (!travelandlogisticspageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={travelandlogisticspageData.videoData}
            headerTitle={travelandlogisticspageData.headerTitle}
            headerDescription={travelandlogisticspageData.headerDescription}
            backgroundImageUrl={travelandlogisticspageData.backgroundImageUrl}
            knowMoreText={travelandlogisticspageData.knowMoreText}
             isSlideshow= {false}
             footerText={travelandlogisticspageData.footerText}
            //  footerItalicWords={travelandlogisticspageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-24 xl:bottom-16 xl:w-[500px] 2xl:right-36 2xl:bottom-16 2xl:w-[700px]"
          />

          <MemoizedBankingSolutions
             title={travelandlogisticspageData.BankingSolutions.title}
             solutionsData={travelandlogisticspageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={travelandlogisticspageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={travelandlogisticspageData.Services.title}
            backgroundImage={travelandlogisticspageData.Services.backgroundImage}
            services={travelandlogisticspageData.Services.services}
            backgroundType="image"
          />

        
         <MemoizedDuoCarousel
            slides={travelandlogisticspageData.transformingEnterprises.carouselSlides}
            title={travelandlogisticspageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(TravelAndLogistics);