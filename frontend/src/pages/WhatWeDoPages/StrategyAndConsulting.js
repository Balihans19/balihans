

import React, { memo } from 'react';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const MainDiv = React.lazy(() => import('../../components/Resuable/MainDiv'));
const BankingSolutions = React.lazy(() => import('../../components/BSFIComponents/BankingSolutions'));
const Spotlight = React.lazy(() => import('../../components/BSFIComponents/Spotlight'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const AiServices = React.lazy(() => import('../../components/AIComponents/AiServices'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));


// Memoized section components
const MemoizedMainDiv = memo(MainDiv);
const MemoizedBankingSolutions = memo(BankingSolutions);
const MemoizedSpotlight = memo(Spotlight);
const MemoizedAiServices = memo(AiServices);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function StrategyAndConsulting() {

  UsePageTitle('Strategy And Consulting');

  const { data: strategyandconsultingpageData, loading, error } = usePageData('strategyandconsultingpage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!strategyandconsultingpageData) return null;

  return (
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