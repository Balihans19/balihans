

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

function CloudAndInfrastructure() {

  UsePageTitle('Cloud And Infrastructure');

  const { data: cloudandinfrastructurepageData, loading, error } = usePageData('cloudandinfrastructurepage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!cloudandinfrastructurepageData) return null;

  return (
    <PageWrapper>
          <MemoizedMainDiv
            videoData={cloudandinfrastructurepageData.videoData}
            headerTitle={cloudandinfrastructurepageData.headerTitle}
            headerDescription={cloudandinfrastructurepageData.headerDescription}
            backgroundImageUrl={cloudandinfrastructurepageData.backgroundImageUrl}
            knowMoreText={cloudandinfrastructurepageData.knowMoreText}
             isSlideshow= {false}
             footerText={cloudandinfrastructurepageData.footerText}
             footerItalicWords={cloudandinfrastructurepageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={cloudandinfrastructurepageData.BankingSolutions.title}
             solutionsData={cloudandinfrastructurepageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={cloudandinfrastructurepageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={cloudandinfrastructurepageData.AiServices.title}
            backgroundVideo={cloudandinfrastructurepageData.AiServices.backgroundVideo}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={cloudandinfrastructurepageData.transformingEnterprises.carouselSlides}
            title={cloudandinfrastructurepageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(CloudAndInfrastructure);