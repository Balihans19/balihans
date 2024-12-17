import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components
const AboutUsMainPage = React.lazy(() => import('../../components/Resuable/AboutUsMainPage'));
const ContentSwitcher = React.lazy(() => import('../../components/Resuable/ContentSwitcher'));
const AboutSection = React.lazy(() => import('../../components/Resuable/AboutSection'));
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const TriCarousel = React.lazy(() => import('../../components/Resuable/TriCarousel'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));

// Memoized components
const MemoizedAboutUsMainPage = memo(AboutUsMainPage);
const MemoizedContentSwitcher = memo(ContentSwitcher);
const MemoizedAboutSection = memo(AboutSection);
const MemoizedTriCarousel = memo(TriCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function AboutUs() {
  UsePageTitle('About Us');
  
  const { data: aboutuspageData, loading, error } = usePageData('aboutuspage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!aboutuspageData) return null;

  return (
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