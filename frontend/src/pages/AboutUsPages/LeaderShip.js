import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization
const AboutUsMainPage = React.lazy(() => import('../../components/Resuable/AboutUsMainPage'));
const LeaderShipRole = React.lazy(() => import('../../components/LeaderShipComponents/LeaderShipRole'))
const InvestorSection = React.lazy(() => import('../../components/LeaderShipComponents/InvestorSection'))
const AboutSection = React.lazy(() => import('../../components/Resuable/AboutSection'));
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const TriCarousel = React.lazy(() => import('../../components/Resuable/TriCarousel'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));


// Memoized components to avoid unnecessary re-renders
const MemoizedAboutUsMainPage = memo(AboutUsMainPage);
const MemoizedLeaderShipRole = memo(LeaderShipRole);
const MemoizedInvestorSection = memo(InvestorSection);
const MemoizedAboutSection = memo(AboutSection);
const MemoizedTriCarousel = memo(TriCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function LeaderShip() {

  // Set the page title for SEO and page rendering
  UsePageTitle('Leadership');
  
  // Fetch the leadershippage data using a custom hook
  const { data: leadershippageData, loading, error } = usePageData('leadershippage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no leadershippage data, return null to prevent rendering empty UI
  if (!leadershippageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
      <MemoizedAboutUsMainPage
        headerText={leadershippageData.headerText}
        values={leadershippageData.values}
        description={leadershippageData.description}
        backgroundImage={leadershippageData.backgroundImage}
        missionTitle={leadershippageData.missionTitle}
        missionText={leadershippageData.missionText}
      />
    
    <MemoizedLeaderShipRole
        leadershipData={leadershippageData.leadership.leadershipData}
      />

    <MemoizedInvestorSection
        backgroundImageUrl={leadershippageData.InvestorSection.backgroundImageUrl}
      />
      

      <MemoizedAboutSection
        backgroundImageUrl={leadershippageData.AboutSection.backgroundImageUrl}
      />

      <MemoizedTriCarousel
        slides={leadershippageData.Impact.carouselSlides}
        title={leadershippageData.Impact.title}
      />

      <MemoizedContactCareers variant="light" />

      <ScrollToTop />
    </PageWrapper>
  );
}

export default memo(LeaderShip);