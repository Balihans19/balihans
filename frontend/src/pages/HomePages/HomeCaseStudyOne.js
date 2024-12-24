

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


// Memoized section components to avoid unnecessary re-renders
const MemoizedCaseStudyMainDiv = memo(CaseStudyMainDiv);
const MemoizedCaseStudySolutions = memo(CaseStudySolutions);
const MemoizedSpotlight = memo(Spotlight);
const MemoizedAiServices = memo(AiServices);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function HomeCaseStudyOne() {

// Set the page title for SEO and page rendering
  UsePageTitle('Case study: Balihans Helps US Based Manufacturing Company Modernize Shop Floor');

   // Fetch the homecasestudyonepage data using a custom hook
  const { data: homecasestudyonepageData, loading, error } = usePageData('homecasestudyonepage');

// Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

   // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no homecasestudyonepage data, return null to prevent rendering empty UI
  if (!homecasestudyonepageData) return null;

  return (
    // Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
        
          <MemoizedCaseStudyMainDiv
            backgroundImageUrl={homecasestudyonepageData.backgroundImageUrl}
            categories={homecasestudyonepageData.categories}
            heading={homecasestudyonepageData.heading}
            description={homecasestudyonepageData.description}
            contentWidth="max-w-xl"
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

          
          {/* Scroll to Top button to improve user experience */}
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(HomeCaseStudyOne);