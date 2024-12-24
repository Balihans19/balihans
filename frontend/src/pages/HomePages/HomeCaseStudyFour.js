

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

function HomeCaseStudyFour() {
// Set the page title for SEO and page rendering
  UsePageTitle('Case study: Optimizing E-commerce Payments for Seamless Checkout');
 // Fetch the homecasestudyfourpage data using a custom hook
  const { data: homecasestudyfourpageData, loading, error } = usePageData('homecasestudyfourpage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;
   // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;
  // If there's no homecasestudyfourpage data, return null to prevent rendering empty UI
  if (!homecasestudyfourpageData) return null;

  return (
     // Wrapping the page in a PageWrapper for error handling and lazy loading
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
          {/* Scroll to Top button to improve user experience */}
          <ScrollToTop />
          </PageWrapper>
  );
}
// Memoizing the entire Home component to prevent unnecessary re-renders
export default memo(HomeCaseStudyFour);