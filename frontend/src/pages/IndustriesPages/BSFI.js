

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

function BSFI() {

  UsePageTitle('BSFI');

  const { data: bsfipageData, loading, error } = usePageData('bsfipage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!bsfipageData) return null;

  return (
    <PageWrapper>
          <MemoizedMainDiv
            videoData={bsfipageData.videoData}
            headerTitle={bsfipageData.headerTitle}
            headerDescription={bsfipageData.headerDescription}
            backgroundImageUrl={bsfipageData.backgroundImageUrl}
            knowMoreText={bsfipageData.knowMoreText}
             isSlideshow= {false}
             footerText={bsfipageData.footerText}
            //  footerItalicWords={bsfipageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={bsfipageData.BankingSolutions.title}
             solutionsData={bsfipageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={bsfipageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={bsfipageData.Services.title}
            backgroundImage={bsfipageData.Services.backgroundImage}
            services={bsfipageData.Services.services}
            backgroundType="image"
          />

        
<MemoizedDuoCarousel
            slides={bsfipageData.transformingBusinesses.carouselSlides}
            title={bsfipageData.transformingBusinesses.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(BSFI);

