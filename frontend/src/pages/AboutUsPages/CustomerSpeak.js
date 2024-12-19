import React, { memo } from 'react';
import { usePageData } from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components
const MainDiv = React.lazy(() => import('../../components/Resuable/MainDiv'));
const CustomerSpeakDiv = React.lazy(() => import('../../components/CustomerSpeakComponents/CustomerSpeakDiv'))
const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const AiServices = React.lazy(() => import('../../components/AIComponents/AiServices'));

// Memoized components
const MemoizedMainDiv = memo(MainDiv);
const MemoizedCustomerSpeakDiv = memo(CustomerSpeakDiv);
const MemoizedContactCareers = memo(ContactCareers);
const MemoizedAiServices = memo(AiServices);

function CustomerSpeak() {
  UsePageTitle('Customer Speak ');
  
  const { data: customerspeakpageData, loading, error } = usePageData('customerspeakpage');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;
  if (!customerspeakpageData) return null;

  return (
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