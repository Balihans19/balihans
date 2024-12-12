

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

function HomeCaseStudyThree() {

  UsePageTitle('Case study: Balihans Empowers Media Company Through Digital Transformation');

  const { data: homecasestudythreepageData, loading, error } = usePageData('homecasestudythreepage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!homecasestudythreepageData) return null;

  return (
    <PageWrapper>
          <MemoizedCaseStudyMainDiv
            backgroundImageUrl={homecasestudythreepageData.backgroundImageUrl}
            sectionTitle={homecasestudythreepageData.sectionTitle}
            categories={homecasestudythreepageData.categories}
            description={homecasestudythreepageData.description}
          />

          <MemoizedCaseStudySolutions
             title={homecasestudythreepageData.CaseStudySolutions.title}
             solutionsData={homecasestudythreepageData.CaseStudySolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={homecasestudythreepageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={homecasestudythreepageData.AiServices.title}
            backgroundVideo={homecasestudythreepageData.AiServices.backgroundVideo}
            backgroundType="video"
          />
 
        
         <MemoizedDuoCarousel
            slides={homecasestudythreepageData.transformingEnterprises.carouselSlides}
            title={homecasestudythreepageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(HomeCaseStudyThree);