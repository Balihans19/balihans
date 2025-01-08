

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
const Services = React.lazy(() => import('../../components/Resuable/Services'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));


// Memoized section components to avoid unnecessary re-renders
const MemoizedMainDiv = memo(MainDiv);
const MemoizedBankingSolutions = memo(BankingSolutions);
const MemoizedSpotlight = memo(Spotlight);
const MemoizedServices = memo(Services);
const MemoizedDuoCarousel = memo(DuoCarousel);
const MemoizedContactCareers = memo(ContactCareers);

function ProfessionalServices() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Professional Services Industry Solutions');
  
  // Fetch the professionalservicespage data using a custom hook
  const { data: professionalservicespageData, loading, error } = usePageData('professionalservicespage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

  // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no professionalservicespage data, return null to prevent rendering empty UI
  if (!professionalservicespageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedMainDiv
            videoData={professionalservicespageData.videoData}
            headerTitle={professionalservicespageData.headerTitle}
            headerDescription={professionalservicespageData.headerDescription}
            backgroundImageUrl={professionalservicespageData.backgroundImageUrl}
            knowMoreText={professionalservicespageData.knowMoreText}
             isSlideshow= {false}
             footerText={professionalservicespageData.footerText}
            //  footerItalicWords={professionalservicespageData.footerItalicWords}
             showLetsTalkButton={true}
             singleVideoPosition="xl:right-32 xl:bottom-16 xl:w-[550px] 2xl:right-36 2xl:bottom-28 2xl:w-[550px]"
          />

          <MemoizedBankingSolutions
             title={professionalservicespageData.BankingSolutions.title}
             solutionsData={professionalservicespageData.BankingSolutions.solutionData}
          />

          <MemoizedSpotlight
            spotlightItems={professionalservicespageData.Spotlight.spotlightItems}
          />

          <MemoizedServices
            title={professionalservicespageData.Services.title}
            backgroundVideo={professionalservicespageData.Services.backgroundVideo}
            services={professionalservicespageData.Services.services}
            backgroundType="video"
          />

        
         <MemoizedDuoCarousel
            slides={professionalservicespageData.transformingEnterprises.carouselSlides}
            title={professionalservicespageData.transformingEnterprises.title}
          />

          <MemoizedContactCareers 
          variant="dark" 
          />
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(ProfessionalServices);