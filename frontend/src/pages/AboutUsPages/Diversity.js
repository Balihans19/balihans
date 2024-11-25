


import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components
const AboutUsMainPage = React.lazy(() => import('../../components/Resuable/AboutUsMainPage'));
const DiversitySlides = React.lazy(() => import('../../components/DiversityComponents/DiversitySlides'))
const ContentSwitcher = React.lazy(() => import('../../components/Resuable/ContentSwitcher'))
const AboutSection = React.lazy(() => import('../../components/Resuable/AboutSection'));
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const TriCarousel = React.lazy(() => import('../../components/Resuable/TriCarousel'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));


// Memoized components
const MemoizedAboutUsMainPage = memo(AboutUsMainPage);
const MemoizedDiversitySlides = memo(DiversitySlides);
const MemoizedContentSwitcher = memo(ContentSwitcher);
const MemoizedAboutSection = memo(AboutSection);
const MemoizedTriCarousel = memo(TriCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function Diversity() {
  UsePageTitle('Diversity, Equity, & Inclusion');
  
  const { data: diversitypageData, loading, error } = usePageData('diversitypage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!diversitypageData) return null;

  return (
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