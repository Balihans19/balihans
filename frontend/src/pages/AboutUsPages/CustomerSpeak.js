import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization
const MainDiv = React.lazy(() => import('../../components/Resuable/MainDiv'));
const CustomerSpeakDiv = React.lazy(() => import('../../components/CustomerSpeakComponents/CustomerSpeakDiv'))
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const AiServices = React.lazy(() => import('../../components/AIComponents/AiServices'));

// Memoized components to avoid unnecessary re-renders
const MemoizedMainDiv = memo(MainDiv);
const MemoizedCustomerSpeakDiv = memo(CustomerSpeakDiv);
const MemoizedContactCareers = memo(ContactCareers);
const MemoizedAiServices = memo(AiServices);

function CustomerSpeak() {

   // Set the page title for SEO and page rendering
  UsePageTitle('Customer Speak ');
  
   // Fetch the customerspeakpage data using a custom hook
  const { data: customerspeakpageData, loading, error } = usePageData('customerspeakpage');
  
  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

   // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

  // If there's no customerspeakpage data, return null to prevent rendering empty UI
  if (!customerspeakpageData) return null;

  return (

    // Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>


<MemoizedMainDiv
            videoData={customerspeakpageData.videoData}
            headerTitle={customerspeakpageData.headerTitle}
            headerDescription={customerspeakpageData.headerDescription}
            backgroundImageUrl={customerspeakpageData.backgroundImageUrl}
            knowMoreText={customerspeakpageData.knowMoreText}
             isSlideshow= {false}
             footerText={customerspeakpageData.footerText}
            //  footerItalicWords={customerspeakpageData.footerItalicWords}
             showLetsTalkButton={true}
          />


  <MemoizedCustomerSpeakDiv
        title={customerspeakpageData.AiConsulting.title}
        bgImage={customerspeakpageData.AiConsulting.bgImage}
        cardPosition={customerspeakpageData.AiConsulting.cardposition}
        slides={customerspeakpageData.AiConsulting.aiconsultingSlides}
      />

     
      <MemoizedCustomerSpeakDiv
        title={customerspeakpageData.DigitalTransformation.title}
        bgImage={customerspeakpageData.DigitalTransformation.bgImage}
        cardPosition={customerspeakpageData.DigitalTransformation.cardposition}
        slides={customerspeakpageData.DigitalTransformation.digitaltransformationSlides}
      />

    
      <MemoizedCustomerSpeakDiv
        title={customerspeakpageData.CloudInfrastructure.title}
        bgImage={customerspeakpageData.CloudInfrastructure.bgImage}
        cardPosition={customerspeakpageData.CloudInfrastructure.cardposition}
        slides={customerspeakpageData.CloudInfrastructure.cloudinfrastructureSlides}
      />

<MemoizedCustomerSpeakDiv
        title={customerspeakpageData.Cybersecurity.title}
        bgImage={customerspeakpageData.Cybersecurity.bgImage}
        cardPosition={customerspeakpageData.Cybersecurity.cardposition}
        slides={customerspeakpageData.Cybersecurity.cybersecuritySlides}
      />
     
     <MemoizedAiServices
            title={customerspeakpageData.AiServices.title}
            backgroundVideo={customerspeakpageData.AiServices.backgroundVideo}
            backgroundType="video"
          />


      <MemoizedContactCareers variant="light" />
      <ScrollToTop />
    </PageWrapper>
  );
}

export default memo(CustomerSpeak);