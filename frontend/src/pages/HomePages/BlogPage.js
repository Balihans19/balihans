

import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';

const BlogSection = React.lazy(() => import('../../components/BlogComponents/BlogSection'))
const CaseStudySlides = React.lazy(() => import('../../components/CaseStudyComponents/CaseStudySlides'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const Services = React.lazy(() => import('../../components/Resuable/Services'));


// Memoize components
const MemoizedComponents = {

  BlogSection: memo(BlogSection),
  CaseStudySlides: memo(CaseStudySlides),
  Services: memo(Services),
  ContactCareers: memo(ContactCareers)
};

function BlogPage() {
  const { slug } = useParams();
  
  const { data, isLoading, error } = useQuery(
    ['blog', slug],
    async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blog/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch blog');
      return response.json();
    }
  );



  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;
  if (!data) return null;

  return (
    <PageWrapper>
    
    <MemoizedComponents.BlogSection
     backgroundImageUrl={data.mainSection.backgroundImageUrl} 
     heading={data.mainSection.heading}
     description={data.mainSection.description}
     contentSection={data.contentSection}
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

export default memo(BlogPage);