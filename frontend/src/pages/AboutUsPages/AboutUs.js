import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization
const AboutUsMainPage = React.lazy(() => import('../../components/Resuable/AboutUsMainPage'));
const ContentSwitcher = React.lazy(() => import('../../components/Resuable/ContentSwitcher'));
const AboutSection = React.lazy(() => import('../../components/Resuable/AboutSection'));
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const TriCarousel = React.lazy(() => import('../../components/Resuable/TriCarousel'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));

// Memoized components to avoid unnecessary re-renders
const MemoizedAboutUsMainPage = memo(AboutUsMainPage);
const MemoizedContentSwitcher = memo(ContentSwitcher);
const MemoizedAboutSection = memo(AboutSection);
const MemoizedTriCarousel = memo(TriCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function AboutUs() {

   // Set the page title for SEO and page rendering
  UsePageTitle('About Us');
  
   // Fetch the aboutuspage data using a custom hook
  const { data: aboutuspageData, loading, error } = usePageData('aboutuspage');

  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

   // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no aboutuspage data, return null to prevent rendering empty UI
  if (!aboutuspageData) return null;

  return (

    // Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
      <MemoizedAboutUsMainPage
        headerText={aboutuspageData.headerText}
        values={aboutuspageData.values}
        description={aboutuspageData.description}
        backgroundImage={aboutuspageData.backgroundImage}
        missionTitle={aboutuspageData.missionTitle}
        missionText={aboutuspageData.missionText}
      />

      <MemoizedContentSwitcher
        title={aboutuspageData.CoreValues.title}
        slides={aboutuspageData.CoreValues.CoreValuesData}
        showButton={true}
      />

      <MemoizedAboutSection
        backgroundImageUrl={aboutuspageData.AboutSection.backgroundImageUrl}
      />

      <MemoizedTriCarousel
        slides={aboutuspageData.Impact.carouselSlides}
        title={aboutuspageData.Impact.title}
      />

      <MemoizedContactCareers variant="light" />
      <ScrollToTop />
    </PageWrapper>
  );
}

export default memo(AboutUs);