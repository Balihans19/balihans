

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

function HomeCaseStudyOne() {

  UsePageTitle('Case study: Balihans Helps US Based Manufacturing Company Modernize Shop Floor');

  const { data: homecasestudyonepageData, loading, error } = usePageData('homecasestudyonepage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!homecasestudyonepageData) return null;

  return (
    <PageWrapper>
          <MemoizedCaseStudyMainDiv
            backgroundImageUrl={homecasestudyonepageData.backgroundImageUrl}
            sectionTitle={homecasestudyonepageData.sectionTitle}
            categories={homecasestudyonepageData.categories}
            description={homecasestudyonepageData.description}
          />

          <MemoizedCaseStudySolutions
             title={homecasestudyonepageData.CaseStudySolutions.title}
             solutionsData={homecasestudyonepageData.CaseStudySolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={homecasestudyonepageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={homecasestudyonepageData.AiServices.title}
            backgroundVideo={homecasestudyonepageData.AiServices.backgroundVideo}
            backgroundType="video"
          />
 
        
         <MemoizedDuoCarousel
            slides={homecasestudyonepageData.transformingEnterprises.carouselSlides}
            title={homecasestudyonepageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(HomeCaseStudyOne);