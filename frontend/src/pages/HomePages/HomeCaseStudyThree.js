

import React, { memo } from 'react';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const CaseStudyMainDiv = React.lazy(() => import('../../components/CaseStudyComponents/CaseStudyMainDiv'));
const CaseStudySolutions = React.lazy(() => import('../../components/CaseStudyComponents/CaseStudySolutions'));
const Spotlight = React.lazy(() => import('../../components/BSFIComponents/Spotlight'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const AiServices = React.lazy(() => import('../../components/AIComponents/AiServices'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));


// Memoized section components  to avoid unnecessary re-renders
const MemoizedCaseStudyMainDiv = memo(CaseStudyMainDiv);
const MemoizedCaseStudySolutions = memo(CaseStudySolutions);
const MemoizedSpotlight = memo(Spotlight);
const MemoizedAiServices = memo(AiServices);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function HomeCaseStudyThree() {

 // Set the page title for SEO and page rendering
  UsePageTitle('Case study: Balihans Empowers Media Company Through Digital Transformation');

 // Fetch the homecasestudythreepage data using a custom hook
  const { data: homecasestudythreepageData, loading, error } = usePageData('homecasestudythreepage');

  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

   // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no homecasestudythreepage data, return null to prevent rendering empty UI
  if (!homecasestudythreepageData) return null;

  return (
     // Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedCaseStudyMainDiv
            backgroundImageUrl={homecasestudythreepageData.backgroundImageUrl}
            categories={homecasestudythreepageData.categories}
            heading={homecasestudythreepageData.heading}
            description={homecasestudythreepageData.description}
            contentWidth="max-w-4xl"
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

          {/* Scroll to Top button to improve user experience */}
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(HomeCaseStudyThree);