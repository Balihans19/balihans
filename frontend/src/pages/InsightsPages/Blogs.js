

import React, { memo } from 'react';
import { usePageData} from '../../hooks/usePageData';
import { LoadingSpinner, ErrorFallback, PageWrapper } from '../../components/common/PageWrapper';
import UsePageTitle from '../../components/Resuable/UsePageTitle';

// Lazy load components for performance optimization

const ScrollToTop = React.lazy(() => import('../../components/Resuable/ScrollToTop'));
const StoriesPageMainDiv = React.lazy(() => import('../../components/StoriesPageComponents/StoriesPageMainDiv'));
const CustomerStories = React.lazy(() => import('../../components/StoriesPageComponents/CustomerStories'));
const AiServices = React.lazy(() => import('../../components/AIComponents/AiServices'));
const ContactCareers = React.lazy(() => import('../../components/Resuable/ContactCareers'));



// Memoized section components to avoid unnecessary re-renders
const MemoizedStoriesPageMainDiv = memo(StoriesPageMainDiv);
const MemoizedCustomerStories = memo(CustomerStories);
const MemoizedAiServices = memo(AiServices);
const MemoizedContactCareers = memo(ContactCareers);


function Blogs() {
  
  // Set the page title for SEO and page rendering
  UsePageTitle('Blog');
  
//   // Fetch the blog data using a custom hook
  const { data: blogspageData, loading, error } = usePageData('blogspage');
  
//   // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;

//   // Show error fallback UI if there is an error
  if (error) return <ErrorFallback error={{ message: error }} />;

//   // If there's no blog data, return null to prevent rendering empty UI
  if (!blogspageData) return null;

  return (

    
// Wrapping the page in a PageWrapper for error handling and lazy loading
    <PageWrapper>
          <MemoizedStoriesPageMainDiv
            backgroundImage={blogspageData.backgroundImage}
            categories={blogspageData.categories}
            title={blogspageData.title}
            description={blogspageData.description}
          />

         <MemoizedCustomerStories 
         contentType="blog"
            />

        <MemoizedAiServices
            title={blogspageData.AiServices.title}
            backgroundVideo={blogspageData.AiServices.backgroundVideo}
            backgroundType="video"
          />
       
       <MemoizedContactCareers 
          variant="dark" 
          />
          
          <ScrollToTop />
          </PageWrapper>
  );
}

export default memo(Blogs);