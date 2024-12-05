

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

function Communications() {

  UsePageTitle('Communications & Information Services');

  const { data: communicationspageData, loading, error } = usePageData('communicationspage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!communicationspageData) return null;

  return (
    <PageWrapper>
          <MemoizedMainDiv
            videoData={communicationspageData.videoData}
            headerTitle={communicationspageData.headerTitle}
            headerDescription={communicationspageData.headerDescription}
            backgroundImageUrl={communicationspageData.backgroundImageUrl}
            knowMoreText={communicationspageData.knowMoreText}
             isSlideshow= {false}
             footerText={communicationspageData.footerText}
            //  footerItalicWords={communicationspageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={communicationspageData.BankingSolutions.title}
             solutionsData={communicationspageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={communicationspageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={communicationspageData.Services.title}
            backgroundImage={communicationspageData.Services.backgroundImage}
            services={communicationspageData.Services.services}
            backgroundType="image"
          />

        
         <MemoizedDuoCarousel
            slides={communicationspageData.transformingEnterprises.carouselSlides}
            title={communicationspageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(Communications);