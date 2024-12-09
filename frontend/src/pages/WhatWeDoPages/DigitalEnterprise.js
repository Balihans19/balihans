

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

function DigitalEnterprise() {

  UsePageTitle('Digital Enterprise Services');

  const { data: digitalenterprisepageData, loading, error } = usePageData('digitalenterprisepage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!digitalenterprisepageData) return null;

  return (
    <PageWrapper>
          <MemoizedMainDiv
            videoData={digitalenterprisepageData.videoData}
            headerTitle={digitalenterprisepageData.headerTitle}
            headerDescription={digitalenterprisepageData.headerDescription}
            backgroundImageUrl={digitalenterprisepageData.backgroundImageUrl}
            knowMoreText={digitalenterprisepageData.knowMoreText}
             isSlideshow= {false}
             footerText={digitalenterprisepageData.footerText}
            //  footerItalicWords={digitalenterprisepageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={digitalenterprisepageData.BankingSolutions.title}
             solutionsData={digitalenterprisepageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={digitalenterprisepageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={digitalenterprisepageData.AiServices.title}
            backgroundVideo={digitalenterprisepageData.AiServices.backgroundVideo}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={digitalenterprisepageData.transformingEnterprises.carouselSlides}
            title={digitalenterprisepageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(DigitalEnterprise);