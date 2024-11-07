import React, { useState, useEffect, Suspense, memo } from 'react';
import axios from 'axios';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy load components
const Cards = React.lazy(() => import('../components/HomeComponents/Cards'));
const ScrollToTop = React.lazy(() => import('../components/Resuable/ScrollToTop'));
const MainDiv = React.lazy(() => import('../components/HomeComponents/MainDiv'));
const IndustriesCards = React.lazy(() => import('../components/HomeComponents/IndustriesCards'));
const Carousel = React.lazy(() => import('../components/HomeComponents/Carousel'));
const ContactCareers = React.lazy(() => import('../components/HomeComponents/ContactCareers'));
const ExpandableMenu = React.lazy(() => import('../components/HomeComponents/ExpandableMenu'));

// Loading fallback component
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
));

// Error fallback component
const ErrorFallback = memo(({ error, resetErrorBoundary }) => (
  <div className="text-center p-4">
    <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
    <p className="text-gray-600 mt-2">{error.message}</p>
    <button 
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Try again
    </button>
  </div>
));

// API service
const api = {
  baseUrl: process.env.REACT_APP_API_URL,

  async fetchHomepageData() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/homepage`, {
        headers: {
          'Cache-Control': 'public, max-age=3600',
        },
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Server Error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('Network Error: Unable to reach the server');
      } else {
        throw new Error(`Error: ${error.message}`);
      }
    }
  },
};

// Memoized section components
const MemoizedMainDiv = memo(MainDiv);
const MemoizedCards = memo(Cards);
const MemoizedNewCarousel = memo(Carousel);
const MemoizedIndustriesCards = memo(IndustriesCards);
const MemoizedExpandableMenu = memo(ExpandableMenu);
const MemoizedContactCareers = memo(ContactCareers);

function Home() {
  const [homepageData, setHomepageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.fetchHomepageData();
        
        if (isMounted) {
          setHomepageData(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch homepage data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} resetErrorBoundary={() => window.location.reload()} />;
  if (!homepageData) return null;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="min-h-screen">
          <MemoizedMainDiv
            slidesData={homepageData.slidesData}
            headerTitle={homepageData.headerTitle}
            headerDescription={homepageData.headerDescription}
            backgroundImageUrl={homepageData.backgroundImageUrl}
            knowMoreText={homepageData.knowMoreText}
          />

          <MemoizedCards
            primaryHeading={homepageData.capabilities.primaryHeading}
            paragraph={homepageData.capabilities.paragraph}
            cardsData={homepageData.capabilities.cardsData}
          />

          <MemoizedNewCarousel
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

          <MemoizedContactCareers />
          <ScrollToTop />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default memo(Home);

