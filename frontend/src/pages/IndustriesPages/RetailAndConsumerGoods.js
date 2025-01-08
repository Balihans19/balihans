

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

function RetailAndConsumerGoods() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Retail & Consumer Goods Industry Solutions');
  
  // Fetch the retailandconsumergoodspage data using a custom hook
  const { data: retailandconsumergoodspageData, loading, error } = usePageData('retailandconsumergoodspage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no retailandconsumergoodspage data, return null to prevent rendering empty UI
  if (!retailandconsumergoodspageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={retailandconsumergoodspageData.videoData}
            headerTitle={retailandconsumergoodspageData.headerTitle}
            headerDescription={retailandconsumergoodspageData.headerDescription}
            backgroundImageUrl={retailandconsumergoodspageData.backgroundImageUrl}
            knowMoreText={retailandconsumergoodspageData.knowMoreText}
             isSlideshow= {false}
             footerText={retailandconsumergoodspageData.footerText}
            //  footerItalicWords={retailandconsumergoodspageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-32 xl:bottom-10 xl:w-[650px] 2xl:right-32 2xl:bottom-20 2xl:w-[650px]"
          />

          <MemoizedBankingSolutions
             title={retailandconsumergoodspageData.BankingSolutions.title}
             solutionsData={retailandconsumergoodspageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={retailandconsumergoodspageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={retailandconsumergoodspageData.Services.title}
            backgroundImage={retailandconsumergoodspageData.Services.backgroundImage}
            services={retailandconsumergoodspageData.Services.services}
            backgroundType="image"
          />

        
         <MemoizedDuoCarousel
            slides={retailandconsumergoodspageData.transformingEnterprises.carouselSlides}
            title={retailandconsumergoodspageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(RetailAndConsumerGoods);