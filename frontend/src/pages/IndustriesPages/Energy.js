

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

function Energy() {

  UsePageTitle('Energy, Resources & Utilities');

  const { data: energypageData, loading, error } = usePageData('energypage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!energypageData) return null;

  return (
    <PageWrapper>
          <MemoizedMainDiv
            videoData={energypageData.videoData}
            headerTitle={energypageData.headerTitle}
            headerDescription={energypageData.headerDescription}
            backgroundImageUrl={energypageData.backgroundImageUrl}
            knowMoreText={energypageData.knowMoreText}
             isSlideshow= {false}
             footerText={energypageData.footerText}
             footerItalicWords={energypageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={energypageData.BankingSolutions.title}
             solutionsData={energypageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={energypageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={energypageData.Services.title}
            backgroundVideo={energypageData.Services.backgroundVideo}
            services={energypageData.Services.services}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={energypageData.transformingEnterprises.carouselSlides}
            title={energypageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(Energy);