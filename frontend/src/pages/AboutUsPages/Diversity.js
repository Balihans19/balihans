


import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization
const AboutUsMainPage = React.lazy(() => import('../../components/Resuable/AboutUsMainPage'));
const DiversitySlides = React.lazy(() => import('../../components/DiversityComponents/DiversitySlides'))
const ContentSwitcher = React.lazy(() => import('../../components/Resuable/ContentSwitcher'))
const AboutSection = React.lazy(() => import('../../components/Resuable/AboutSection'));
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const TriCarousel = React.lazy(() => import('../../components/Resuable/TriCarousel'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));


// Memoized components to avoid unnecessary re-renders
const MemoizedAboutUsMainPage = memo(AboutUsMainPage);
const MemoizedDiversitySlides = memo(DiversitySlides);
const MemoizedContentSwitcher = memo(ContentSwitcher);
const MemoizedAboutSection = memo(AboutSection);
const MemoizedTriCarousel = memo(TriCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function Diversity() {

  // Set the page title for SEO and page rendering
  UsePageTitle('Diversity, Equity, & Inclusion');
  
  // Fetch the diversitypage data using a custom hook
  const { data: diversitypageData, loading, error } = usePageData('diversitypage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no diversitypage data, return null to prevent rendering empty UI
  if (!diversitypageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
      <MemoizedAboutUsMainPage
        headerText={diversitypageData.headerText}
        values={diversitypageData.values}
        description={diversitypageData.description}
        backgroundImage={diversitypageData.backgroundImage}
        missionTitle={diversitypageData.missionTitle}
        missionText={diversitypageData.missionText}
      />
    
    <MemoizedDiversitySlides
         diversitySlides={diversitypageData.diversity.diversitySlides}
      />

<MemoizedContentSwitcher
        title={diversitypageData.DeiInitiatives.title}
        slides={diversitypageData.DeiInitiatives.DeiInitiativesData}
        showButton={false}
      />
      

      <MemoizedAboutSection
        backgroundImageUrl={diversitypageData.AboutSection.backgroundImageUrl}
      />

      <MemoizedTriCarousel
        slides={diversitypageData.Impact.carouselSlides}
        title={diversitypageData.Impact.title}
      />

      <MemoizedContactCareers variant="light" />

      <ScrollToTop />
    </PageWrapper>
  );
}

export default memo(Diversity);