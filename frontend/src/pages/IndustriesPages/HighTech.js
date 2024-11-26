

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
const Services = React.lazy(() => import('../../components/Resuable/Services'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));


// Memoized section components
const MemoizedMainDiv = memo(MainDiv);
const MemoizedBankingSolutions = memo(BankingSolutions);
const MemoizedSpotlight = memo(Spotlight);
const MemoizedServices = memo(Services);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function HighTech() {

  UsePageTitle('High-Tech');

  const { data: hightechpageData, loading, error } = usePageData('hightechpage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!hightechpageData) return null;

  return (
    <PageWrapper>
          <MemoizedMainDiv
            videoData={hightechpageData.videoData}
            headerTitle={hightechpageData.headerTitle}
            headerDescription={hightechpageData.headerDescription}
            backgroundImageUrl={hightechpageData.backgroundImageUrl}
            knowMoreText={hightechpageData.knowMoreText}
             isSlideshow= "true"
             footerText={hightechpageData.footerText}
             footerItalicWords={hightechpageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={hightechpageData.BankingSolutions.title}
             solutionsData={hightechpageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={hightechpageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={hightechpageData.Services.title}
            backgroundVideo={hightechpageData.Services.backgroundVideo}
            services={hightechpageData.Services.services}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={hightechpageData.transformingEnterprises.carouselSlides}
            title={hightechpageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(HighTech);