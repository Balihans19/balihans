

import React, { memo } from 'react';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const CaseStudyMainDiv = React.lazy(() => import('../../components/CaseStudyComponents/CaseStudyMainDiv'));
const CaseStudySolutions = React.lazy(() => import('../../components/CaseStudyComponents/CaseStudySolutions'));
const Spotlight = React.lazy(() => import('../../components/BSFIComponents/Spotlight'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const AiServices = React.lazy(() => import('../../components/AIComponents/AiServices'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));


// Memoized section components
const MemoizedCaseStudyMainDiv = memo(CaseStudyMainDiv);
const MemoizedCaseStudySolutions = memo(CaseStudySolutions);
const MemoizedSpotlight = memo(Spotlight);
const MemoizedAiServices = memo(AiServices);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function HomeCaseStudyTwo() {

  UsePageTitle('Case study: Elevating Security Posture with a 24/7 SOC');

  const { data: homecasestudytwopageData, loading, error } = usePageData('homecasestudytwopage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!homecasestudytwopageData) return null;

  return (
    <PageWrapper>
          <MemoizedCaseStudyMainDiv
            backgroundImageUrl={homecasestudytwopageData.backgroundImageUrl}
            categories={homecasestudytwopageData.categories}
            heading={homecasestudytwopageData.heading}
            description={homecasestudytwopageData.description}
            contentWidth="max-w-xl"
          />

          <MemoizedCaseStudySolutions
             title={homecasestudytwopageData.CaseStudySolutions.title}
             solutionsData={homecasestudytwopageData.CaseStudySolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={homecasestudytwopageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={homecasestudytwopageData.AiServices.title}
            backgroundVideo={homecasestudytwopageData.AiServices.backgroundVideo}
            backgroundType="video"
          />
 
        
         <MemoizedDuoCarousel
            slides={homecasestudytwopageData.transformingEnterprises.carouselSlides}
            title={homecasestudytwopageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(HomeCaseStudyTwo);