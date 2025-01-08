

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

function StrategyAndConsulting() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Strategy And Consulting');
  
  // Fetch the strategyandconsultingpage data using a custom hook
  const { data: strategyandconsultingpageData, loading, error } = usePageData('strategyandconsultingpage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no strategyandconsultingpage data, return null to prevent rendering empty UI
  if (!strategyandconsultingpageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={strategyandconsultingpageData.videoData}
            headerTitle={strategyandconsultingpageData.headerTitle}
            headerDescription={strategyandconsultingpageData.headerDescription}
            backgroundImageUrl={strategyandconsultingpageData.backgroundImageUrl}
            knowMoreText={strategyandconsultingpageData.knowMoreText}
             isSlideshow= {false}
             footerText={strategyandconsultingpageData.footerText}
            //  footerItalicWords={strategyandconsultingpageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-24 xl:bottom-16 xl:w-[500px] 2xl:right-36 2xl:bottom-24 2xl:w-[550px]"
          />

          <MemoizedBankingSolutions
             title={strategyandconsultingpageData.BankingSolutions.title}
             solutionsData={strategyandconsultingpageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={strategyandconsultingpageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={strategyandconsultingpageData.AiServices.title}
            backgroundVideo={strategyandconsultingpageData.AiServices.backgroundVideo}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={strategyandconsultingpageData.transformingEnterprises.carouselSlides}
            title={strategyandconsultingpageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(StrategyAndConsulting);