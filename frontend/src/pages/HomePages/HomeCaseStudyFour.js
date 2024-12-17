

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

function HomeCaseStudyFour() {

  UsePageTitle('Case study: Optimizing E-commerce Payments for Seamless Checkout');

  const { data: homecasestudyfourpageData, loading, error } = usePageData('homecasestudyfourpage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!homecasestudyfourpageData) return null;

  return (
    <PageWrapper>
          <MemoizedCaseStudyMainDiv
            backgroundImageUrl={homecasestudyfourpageData.backgroundImageUrl}
            sectionTitle={homecasestudyfourpageData.sectionTitle}
            categories={homecasestudyfourpageData.categories}
            heading={homecasestudyfourpageData.heading}
            description={homecasestudyfourpageData.description}
            contentWidth="max-w-4xl"
          />

          <MemoizedCaseStudySolutions
             title={homecasestudyfourpageData.CaseStudySolutions.title}
             solutionsData={homecasestudyfourpageData.CaseStudySolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={homecasestudyfourpageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={homecasestudyfourpageData.AiServices.title}
            backgroundVideo={homecasestudyfourpageData.AiServices.backgroundVideo}
            backgroundType="video"
          />
 
        
         <MemoizedDuoCarousel
            slides={homecasestudyfourpageData.transformingEnterprises.carouselSlides}
            title={homecasestudyfourpageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(HomeCaseStudyFour);