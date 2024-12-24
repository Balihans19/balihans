import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization
const Cards = React.lazy(() => import('../../components/HomeComponents/Cards'));
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const MainDiv = React.lazy(() => import('../../components/Resuable/MainDiv'));
const IndustriesCards = React.lazy(() => import('../../components/HomeComponents/IndustriesCards'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const ExpandableMenu = React.lazy(() => import('../../components/HomeComponents/ExpandableMenu'));

// Memoized section components to avoid unnecessary re-renders
const MemoizedMainDiv = memo(MainDiv);
const MemoizedCards = memo(Cards);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedIndustriesCards = memo(IndustriesCards);
const MemoizedExpandableMenu = memo(ExpandableMenu);
const MemoizedContactCareers = memo(ContactCareers);

function Home() {
  // Set the page title for SEO and page rendering
  UsePageTitle('Home');

  // Fetch the homepage data using a custom hook
  const { data: homepageData, loading, error } = usePageData('homepage');

  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no homepage data, return null to prevent rendering empty UI
  if (!homepageData) return null;

  return (
    // Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
      {/* Main section component */}
      <MemoizedMainDiv
        videoData={homepageData.slidesData}
        headerTitle={homepageData.headerTitle}
        headerDescription={homepageData.headerDescription}
        backgroundImageUrl={homepageData.backgroundImageUrl}
        knowMoreText={homepageData.knowMoreText}
        isSlideshow={true}
        footerText={homepageData.footerText}
        showLetsTalkButton={true}
      />

      {/* Cards section displaying capabilities */}
      <MemoizedCards
        primaryHeading={homepageData.capabilities.primaryHeading}
        paragraph={homepageData.capabilities.paragraph}
        cardsData={homepageData.capabilities.cardsData}
      />

      {/* Duo Carousel component for transforming businesses */}
      <MemoizedDuoCarousel
        slides={homepageData.transformingBusinesses.carouselSlides}
        title={homepageData.transformingBusinesses.title}
      />

      {/* Industries Cards section  */}
      <MemoizedIndustriesCards
        title={homepageData.industries.title}
        description={homepageData.industries.description}
        industriesData={homepageData.industries.industriesData}
      />

      {/* Expandable menu  */}
      <MemoizedExpandableMenu
        title={homepageData.expandableMenu.title}
        videoUrl={homepageData.expandableMenu.videoUrl}
        sections={homepageData.expandableMenu.sectionsData}
      />

      {/* Contact and careers section */}
      <MemoizedContactCareers variant="light" />
      
      {/* Scroll to Top button to improve user experience */}
      <ScrollToTop />
    </PageWrapper>
  );
}

// Memoizing the entire Home component to prevent unnecessary re-renders
export default memo(Home);




