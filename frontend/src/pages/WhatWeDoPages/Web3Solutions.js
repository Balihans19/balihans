

import React, { memo } from 'react';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const MainDiv = React.lazy(() => import('../../components/Resuable/MainDiv'));
const BankingSolutions = React.lazy(() => import('../../components/BSFIComponents/BankingSolutions'));
const Spotlight = React.lazy(() => import('../../components/BSFIComponents/Spotlight'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const AiServices = React.lazy(() => import('../../components/AIComponents/AiServices'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));


// Memoized section components to avoid unnecessary re-renders
const MemoizedMainDiv = memo(MainDiv);
const MemoizedBankingSolutions = memo(BankingSolutions);
const MemoizedSpotlight = memo(Spotlight);
const MemoizedAiServices = memo(AiServices);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function Web3Solutions() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Web3 Solutions');
  
  // Fetch the web3solutionspage data using a custom hook
  const { data: web3solutionspageData, loading, error } = usePageData('web3solutionspage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no web3solutionspage data, return null to prevent rendering empty UI
  if (!web3solutionspageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={web3solutionspageData.videoData}
            headerTitle={web3solutionspageData.headerTitle}
            headerDescription={web3solutionspageData.headerDescription}
            backgroundImageUrl={web3solutionspageData.backgroundImageUrl}
            knowMoreText={web3solutionspageData.knowMoreText}
             isSlideshow= {false}
             footerText={web3solutionspageData.footerText}
            //  footerItalicWords={web3solutionspageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-24 xl:bottom-16 xl:w-[500px] 2xl:right-28 2xl:bottom-28 2xl:w-[700px]"
          />

          <MemoizedBankingSolutions
             title={web3solutionspageData.BankingSolutions.title}
             solutionsData={web3solutionspageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={web3solutionspageData.Spotlight.spotlightItems}
          />

          <MemoizedAiServices
            title={web3solutionspageData.AiServices.title}
            backgroundVideo={web3solutionspageData.AiServices.backgroundVideo}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={web3solutionspageData.transformingEnterprises.carouselSlides}
            title={web3solutionspageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(Web3Solutions);