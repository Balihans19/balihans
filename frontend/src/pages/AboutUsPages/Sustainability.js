
import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components
const SustainabilityMainDiv = React.lazy(() => import('../../components/SustainabilityComponents/SustainabilityMainDiv'));
const SustainabilityGoals = React.lazy(() => import('../../components/SustainabilityComponents/SustainabilityGoals'))
const SustainCarousel = React.lazy(() => import('../../components/SustainabilityComponents/SustainCarousel'))
const AboutSection = React.lazy(() => import('../../components/Resuable/AboutSection'));
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const TriCarousel = React.lazy(() => import('../../components/Resuable/TriCarousel'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));


// Memoized components
const MemoizedSustainabilityMainDiv  = memo(SustainabilityMainDiv );
const MemoizedSustainabilityGoals = memo(SustainabilityGoals);
const MemoizedSustainCarousel = memo(SustainCarousel);
const MemoizedAboutSection = memo(AboutSection);
const MemoizedTriCarousel = memo(TriCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function Sustainability() {
  UsePageTitle('Sustainability');
  
  const { data: sustainabilitypageData, loading, error } = usePageData('sustainabilitypage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!sustainabilitypageData) return null;

  return (
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