




import React, { memo } from 'react';
import { usePageData} from '../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../components/common/PageWrapper';
import UsePageTitle from '../components/Resuable/UsePageTitle';

// Lazy load components
const Cards = React.lazy(() => import('../components/HomeComponents/Cards'));
const ScrollToTop = React.lazy(() => import('../components/Resuable/ScrollToTop'));
const MainDiv = React.lazy(() => import('../components/Resuable/MainDiv'));
const IndustriesCards = React.lazy(() => import('../components/HomeComponents/IndustriesCards'));
const DuoCarousel = React.lazy(() => import('../components/Resuable/DuoCarousel'));
const ContactCareers = React.lazy(() => import('../components/Resuable/ContactCareers'));
const ExpandableMenu = React.lazy(() => import('../components/HomeComponents/ExpandableMenu'));


// Memoized section components
const MemoizedMainDiv = memo(MainDiv);
const MemoizedCards = memo(Cards);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedIndustriesCards = memo(IndustriesCards);
const MemoizedExpandableMenu = memo(ExpandableMenu);
const MemoizedContactCareers = memo(ContactCareers);

function Home() {

  UsePageTitle('Home');

  const { data: homepageData, loading, error } = usePageData('homepage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!homepageData) return null;

  return (
    <PageWrapper>
          <MemoizedMainDiv
            videoData={homepageData.slidesData}
            headerTitle={homepageData.headerTitle}
            headerDescription={homepageData.headerDescription}
            backgroundImageUrl={homepageData.backgroundImageUrl}
            knowMoreText={homepageData.knowMoreText}
             isSlideshow={true}
             footerText={homepageData.footerText}
            //  footerItalicWords={homepageData.footerItalicWords}
             showLetsTalkButton={true}
          />

          <MemoizedCards
            primaryHeading={homepageData.capabilities.primaryHeading}
            paragraph={homepageData.capabilities.paragraph}
            cardsData={homepageData.capabilities.cardsData}
          />

          <MemoizedDuoCarousel
            slides={homepageData.transformingBusinesses.carouselSlides}
            title={homepageData.transformingBusinesses.title}
          />

          <MemoizedIndustriesCards
            title={homepageData.industries.title}
            description={homepageData.industries.description}
            industriesData={homepageData.industries.industriesData}
          />

          <MemoizedExpandableMenu
            title={homepageData.expandableMenu.title}
            videoUrl={homepageData.expandableMenu.videoUrl}
            sections={homepageData.expandableMenu.sectionsData}
          />

          <MemoizedContactCareers 
          variant="light" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(Home);


