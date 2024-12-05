import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components
const MainDiv = React.lazy(() => import('../../components/Resuable/MainDiv'));
const BusinessServices = React.lazy(() => import('../../components/WhatWeDoComponents/BusinessServices'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const IndustriesCards = React.lazy(() => import('../../components/HomeComponents/IndustriesCards'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));

// Memoized components
const MemoizedMainDiv = memo(MainDiv);
const MemoizedBusinessServices = memo(BusinessServices);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedIndustriesCards = memo(IndustriesCards);
const MemoizedContactCareers = memo(ContactCareers);

function  WhatWeDo() {
  UsePageTitle('WhatWeDo');
  
  const { data: whatwedopageData, loading, error } = usePageData('whatwedopage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!whatwedopageData) return null;

  return (
    <PageWrapper>
       <MemoizedMainDiv
            videoData={whatwedopageData.videoData}
            headerTitle={whatwedopageData.headerTitle}
            headerDescription={whatwedopageData.headerDescription}
            backgroundImageUrl={whatwedopageData.backgroundImageUrl}
            knowMoreText={whatwedopageData.knowMoreText}
             isSlideshow= {false}
             footerText={whatwedopageData.footerText}
            //  footerItalicWords={whatwedopageData.footerItalicWords}
          />

      <MemoizedBusinessServices
        title={whatwedopageData.BusinessServices.title}
        description={whatwedopageData.BusinessServices.description}
        heroImage={whatwedopageData.BusinessServices.heroImage}
        services={whatwedopageData.BusinessServices.servicesData}
        showButton={true}
      />


          <MemoizedIndustriesCards
            title={whatwedopageData.industries.title}
            titleWidth="lg:w-2/3"
            showDescription={false}
            industriesData={whatwedopageData.industries.industriesData}
          />

        <MemoizedDuoCarousel
            slides={whatwedopageData.transformingBusinesses.carouselSlides}
            title={whatwedopageData.transformingBusinesses.title}
          />

      <MemoizedContactCareers variant="dark" />
      <ScrollToTop />
    </PageWrapper>
  );
}

export default memo(WhatWeDo);