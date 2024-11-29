

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
const AiFuture = React.lazy(() => import('../../components/AIComponents/AiFuture'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));


// Memoized section components
const MemoizedMainDiv = memo(MainDiv);
const MemoizedBankingSolutions = memo(BankingSolutions);
const MemoizedSpotlight = memo(Spotlight);
const MemoizedAiServices = memo(AiServices);
const MemoizedAiFuture = memo(AiFuture);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function AI() {

  UsePageTitle('AI Consulting Services');

  const { data: aipageData, loading, error } = usePageData('aipage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!aipageData) return null;

  return (
    <PageWrapper>
          <MemoizedMainDiv
            videoData={aipageData.videoData}
            headerTitle={aipageData.headerTitle}
            headerDescription={aipageData.headerDescription}
            backgroundImageUrl={aipageData.backgroundImageUrl}
            knowMoreText={aipageData.knowMoreText}
             isSlideshow= {false}
             footerText={aipageData.footerText}
             footerItalicWords={aipageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedBankingSolutions
             title={aipageData.BankingSolutions.title}
             solutionsData={aipageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={aipageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={aipageData.AiServices.title}
            backgroundVideo={aipageData.AiServices.backgroundVideo}
            backgroundType="video"
          />
 
       <MemoizedAiFuture
            imageUrl={aipageData.AiFuture.imageUrl}
            quoteImageUrl={aipageData.AiFuture.quoteImageUrl}
            
          />
        
         <MemoizedDuoCarousel
            slides={aipageData.transformingEnterprises.carouselSlides}
            title={aipageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(AI);