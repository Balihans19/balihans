

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

function Cybersecurity() {

  UsePageTitle('Cybersecurity');

  const { data: cybersecuritypageData, loading, error } = usePageData('cybersecuritypage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!cybersecuritypageData) return null;

  return (
    <PageWrapper>
          <MemoizedMainDiv
            videoData={cybersecuritypageData.videoData}
            headerTitle={cybersecuritypageData.headerTitle}
            headerDescription={cybersecuritypageData.headerDescription}
            backgroundImageUrl={cybersecuritypageData.backgroundImageUrl}
            knowMoreText={cybersecuritypageData.knowMoreText}
             isSlideshow= {false}
             footerText={cybersecuritypageData.footerText}
            //  footerItalicWords={cybersecuritypageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={cybersecuritypageData.BankingSolutions.title}
             solutionsData={cybersecuritypageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={cybersecuritypageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={cybersecuritypageData.AiServices.title}
            backgroundVideo={cybersecuritypageData.AiServices.backgroundVideo}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={cybersecuritypageData.transformingEnterprises.carouselSlides}
            title={cybersecuritypageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(Cybersecurity);