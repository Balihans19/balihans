
import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization
const SustainabilityMainDiv = React.lazy(() => import('../../components/SustainabilityComponents/SustainabilityMainDiv'));
const SustainabilityGoals = React.lazy(() => import('../../components/SustainabilityComponents/SustainabilityGoals'))
const SustainCarousel = React.lazy(() => import('../../components/SustainabilityComponents/SustainCarousel'))
const AboutSection = React.lazy(() => import('../../components/Resuable/AboutSection'));
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const TriCarousel = React.lazy(() => import('../../components/Resuable/TriCarousel'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));


// Memoized components to avoid unnecessary re-renders
const MemoizedSustainabilityMainDiv  = memo(SustainabilityMainDiv );
const MemoizedSustainabilityGoals = memo(SustainabilityGoals);
const MemoizedSustainCarousel = memo(SustainCarousel);
const MemoizedAboutSection = memo(AboutSection);
const MemoizedTriCarousel = memo(TriCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function Sustainability() {

  // Set the page title for SEO and page rendering
  UsePageTitle('Corporate Sustainability');
  
  // Fetch the sustainabilitypage data using a custom hook
  const { data: sustainabilitypageData, loading, error } = usePageData('sustainabilitypage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no sustainabilitypage data, return null to prevent rendering empty UI
  if (!sustainabilitypageData) return null;

  return (
    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
      <MemoizedSustainabilityMainDiv 
        title={sustainabilitypageData.title}
        subtitle={sustainabilitypageData.subtitle}
        description={sustainabilitypageData.description}
        backgroundImage={sustainabilitypageData.backgroundImage}
        imageSrc={sustainabilitypageData.imageSrc}
      />
    
    <MemoizedSustainabilityGoals
         title={sustainabilitypageData.SustainabilityGoals.title}
         description={sustainabilitypageData.SustainabilityGoals.description}
         backgroundImage={sustainabilitypageData.SustainabilityGoals.backgroundImage}
         goals={sustainabilitypageData.SustainabilityGoals.GoalsData}
         
      />
 
<MemoizedSustainCarousel
        slidesdata={sustainabilitypageData.SustainCarousel.slidesdata}
      />
      

      <MemoizedAboutSection
        backgroundImageUrl={sustainabilitypageData.AboutSection.backgroundImageUrl}
      />

      <MemoizedTriCarousel
        slides={sustainabilitypageData.Impact.carouselSlides}
        title={sustainabilitypageData.Impact.title}
      />

      <MemoizedContactCareers variant="light" />

      <ScrollToTop />
    </PageWrapper>
  );
}

export default memo(Sustainability);