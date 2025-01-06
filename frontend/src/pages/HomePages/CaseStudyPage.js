
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';

const CaseStudyMainDiv = React.lazy(() => import('../../components/CaseStudyComponents/CaseStudyMainDiv'));
const CaseStudySolutions = React.lazy(() => import('../../components/CaseStudyComponents/CaseStudySolutions'));
const Spotlight = React.lazy(() => import('../../components/BSFIComponents/Spotlight'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));
const AiServices = React.lazy(() => import('../../components/AIComponents/AiServices'));
const DuoCarousel = React.lazy(() => import('../../components/Resuable/DuoCarousel'));

// Memoize components
const MemoizedComponents = {
  CaseStudyMainDiv: memo(CaseStudyMainDiv),
  CaseStudySolutions: memo(CaseStudySolutions),
  Spotlight: memo(Spotlight),
  AiServices: memo(AiServices),
  DuoCarousel: memo(DuoCarousel),
  ContactCareers: memo(ContactCareers)
};

function CaseStudyPage() {
  const { slug } = useParams();
  
  const { data, isLoading, error } = useQuery(
    ['caseStudy', slug],
    async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/case-studies/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch case study');
      return response.json();
    }
  );



  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;
  if (!data) return null;

  return (
    <PageWrapper>
      <MemoizedComponents.CaseStudyMainDiv {...data.mainSection} />
      <MemoizedComponents.CaseStudySolutions
             title={data.solutions.title}
             solutionsData={data.solutions.solutionData}
          />
      
      <MemoizedComponents.Spotlight spotlightItems={data.spotlight.spotlightItems} />
      <MemoizedComponents.AiServices {...data.aiServices}
            backgroundVideo={data.aiServices.backgroundVideo}
            backgroundType="video"
          />

<MemoizedComponents.DuoCarousel
            slides={data.transformingEnterprises.carouselSlides}
            title={data.transformingEnterprises.title}
          />

      <MemoizedComponents.ContactCareers variant="dark" />
    </PageWrapper>
  );
}

export default memo(CaseStudyPage);