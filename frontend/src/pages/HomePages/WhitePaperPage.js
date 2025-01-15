

import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';

const WhitePaperSection = React.lazy(() => import('../../components/WhitePaperComponents/WhitePaperSection'))
const CaseStudySlides = React.lazy(() => import('../../components/CaseStudyComponents/CaseStudySlides'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const Services = React.lazy(() => import('../../components/Resuable/Services'));


// Memoize components
const MemoizedComponents = {

  WhitePaperSection: memo(WhitePaperSection),
  CaseStudySlides: memo(CaseStudySlides),
  Services: memo(Services),
  ContactCareers: memo(ContactCareers)
};

function WhitePaperPage() {
  const { slug } = useParams();
  
  const { data, isLoading, error } = useQuery(
    ['whitePaper', slug],
    async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/white-papers/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch white paper');
      return response.json();
    }
  );



  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;
  if (!data) return null;

  return (
    <PageWrapper>
    
    <MemoizedComponents.WhitePaperSection
     backgroundImageUrl={data.mainSection.backgroundImageUrl} 
     heading={data.mainSection.heading}
     description={data.mainSection.description}
     contentSections={data.mainSection.contentSection}
      />



    <MemoizedComponents.Services
            title={data.Services.title}
            backgroundVideo={data.Services.backgroundVideo}
            backgroundType="video"
          />

      <MemoizedComponents.CaseStudySlides />

      <MemoizedComponents.ContactCareers variant="dark" />
    </PageWrapper>
  );
}

export default memo(WhitePaperPage);