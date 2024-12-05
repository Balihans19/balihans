

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

function DataAndAnalytics() {

  UsePageTitle('Data And Analytics');

  const { data: dataandanalyticspageData, loading, error } = usePageData('dataandanalyticspage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!dataandanalyticspageData) return null;

  return (
    <PageWrapper>
          <MemoizedMainDiv
            videoData={dataandanalyticspageData.videoData}
            headerTitle={dataandanalyticspageData.headerTitle}
            headerDescription={dataandanalyticspageData.headerDescription}
            backgroundImageUrl={dataandanalyticspageData.backgroundImageUrl}
            knowMoreText={dataandanalyticspageData.knowMoreText}
             isSlideshow= {false}
             footerText={dataandanalyticspageData.footerText}
            //  footerItalicWords={dataandanalyticspageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={dataandanalyticspageData.BankingSolutions.title}
             solutionsData={dataandanalyticspageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={dataandanalyticspageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={dataandanalyticspageData.AiServices.title}
            backgroundVideo={dataandanalyticspageData.AiServices.backgroundVideo}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={dataandanalyticspageData.transformingEnterprises.carouselSlides}
            title={dataandanalyticspageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(DataAndAnalytics);