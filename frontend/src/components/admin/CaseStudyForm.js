/**
 * CaseStudyForm Component
 * A comprehensive form for creating and editing case studies in the admin panel.
 * Handles image uploads, multiple sections, and dynamic form fields.
 * 
 * @component
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, MinusCircle, Save } from 'lucide-react';

const CaseStudyForm = () => {
  // Constants
  const CUSTOMER_SPEAK_IMAGE = "https://res.cloudinary.com/dnijlfi48/image/upload/v1733998738/Untitled_80_x_60_px_1_lssgog_tauehc_nfnmtb.webp";

  // Hooks
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditMode = Boolean(slug);

  // State management
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [commonComponents, setCommonComponents] = useState({
    aiServices: {
      title: '',
      backgroundVideo: ''
    }
  });

  // Initial form state configuration
  const initialFormState = {
    slug: '',
    seo: {
      title: ''
    },
    mainSection: {
      backgroundImageUrl: '',
      sectionTitle: 'CASE STUDY',
      heading: '',
      categories: [],
      description: ''
    },
    solutions: {
      title: '',
      solutionData: [
        {
          id: 1,
          number: '01',
          title: 'The Challenge',
          contents: [{ primaryHeading: '', primaryDescription: '' }]
        },
        {
          id: 2,
          number: '02',
          title: 'The Solution',
          contents: [{ primaryHeading: '', primaryDescription: '' }]
        },
        {
          id: 3,
          number: '03',
          title: 'The Outcome',
          contents: [{ primaryHeading: 'Results', points: [''] }]
        },
        {
          id: 4,
          number: '04',
          title: 'Customer Speak',
          contents: [{
            primaryHeading: '',
            primaryDescription: '',
            description: '',
            image: ''
          }]
        }
      ]
    },
    aiServices: {},
    includeWhitePaperSlides: true,
    includeCaseStudySlides: true,
  };

  const [formData, setFormData] = useState(initialFormState);

  /**
   * Fetches common components data from the server
   */
  const fetchCommonComponents = async () => {
    try {
      const { data } = await axios.get('/api/admin/common-components');
      setCommonComponents(data);
      setFormData(prev => ({
        ...prev,
        aiServices: data.aiServices
      }));
    } catch (err) {
      setError('Failed to fetch common components');
    }
  };

  /**
   * Fetches case study data when in edit mode
   */
  const fetchCaseStudy = async () => {
    try {
      const { data } = await axios.get(`/api/admin/case-studies/${slug}`);
      
      const transformedData = {
        ...data,
        solutions: {
          ...data.solutions,
          solutionData: data.solutions.solutionData.map(solution => {
            if (solution.number === '04') {
              return {
                ...solution,
                contents: solution.contents.map(content => ({
                  ...content,
                  image: content.image || CUSTOMER_SPEAK_IMAGE
                }))
              };
            }
            return solution;
          })
        },
        mainSection: {
          ...data.mainSection,
          backgroundImageUrl: data.mainSection.backgroundImageUrl || data.mainSection.backgroundImage
        },
        includeWhitePaperSlides: data.includeWhitePaperSlides ?? true,
        includeCaseStudySlides: data.includeCaseStudySlides ?? true,
        aiServices: commonComponents.aiServices || data.aiServices
      };

      setFormData(transformedData);
    } catch (err) {
      setError('Failed to fetch case study');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles changes in form fields
   * @param {Event} e - The change event
   * @param {string} section - Section of the form being updated
   * @param {string} subsection - Subsection of the form being updated
   * @param {number} index - Index for array fields
   */
  const handleChange = (e, section, subsection, index) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev };
      if (section && subsection) {
        if (index !== undefined) {
          newData[section][subsection][index] = {
            ...newData[section][subsection][index],
            [name]: value
          };
        } else {
          newData[section][subsection] = value;
        }
      } else if (section) {
        newData[section] = { ...newData[section], [name]: value };
      } else {
        newData[name] = value;
      }
      return newData;
    });
  };

  /**
   * Handles image upload to Cloudinary
   * @param {Event} e - The file input change event
   * @param {string} section - Form section for the image
   * @param {string} field - Field name for the image
   */
  const handleImageUpload = async (e, section, field) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Casestudies');
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append('timestamp', Math.round((new Date()).getTime() / 1000));
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const result = await response.json();
  
      if (result.secure_url) {
        setFormData(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: result.secure_url,
            ...(field === 'backgroundImageUrl' && { backgroundImage: result.secure_url })
          }
        }));
      }
    } catch (err) {
      setError('Image upload failed');
      console.error(err);
    }
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const submissionData = JSON.parse(JSON.stringify(formData));

    submissionData.solutions.solutionData = submissionData.solutions.solutionData.map(solution => {
      if (solution.number === '04') {
        return {
          ...solution,
          contents: solution.contents.map(content => ({
            ...content,
            image: content.image || CUSTOMER_SPEAK_IMAGE
          }))
        };
      }
      return solution;
    });

    try {
      const response = isEditMode
        ? await axios.put(`/api/admin/case-studies/${slug}`, submissionData)
        : await axios.post('/api/admin/case-studies', submissionData);

      if (response.data) {
        navigate('/admin/case-studies');
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'save'} case study`);
    } finally {
      setSaving(false);
    }
  };

  /**
   * Handles adding a new content section
   * @param {number} solutionIndex - Index of the solution to add content to
   */
  const handleAddContent = (solutionIndex) => {
    const solution = formData.solutions.solutionData[solutionIndex];
    const newContent = solution.number === '03'
      ? { primaryHeading: '', points: [''] }
      : solution.number === '04'
        ? { primaryHeading: '', primaryDescription: '', description: '', image: '' }
        : { primaryHeading: '', primaryDescription: '' };

    setFormData(prev => ({
      ...prev,
      solutions: {
        ...prev.solutions,
        solutionData: prev.solutions.solutionData.map((sol, idx) =>
          idx === solutionIndex
            ? { ...sol, contents: [...sol.contents, newContent] }
            : sol
        )
      }
    }));
  };

  /**
   * Handles removing a content section
   * @param {number} solutionIndex - Index of the solution
   * @param {number} contentIndex - Index of the content to remove
   */
  const handleRemoveContent = (solutionIndex, contentIndex) => {
    setFormData(prev => ({
      ...prev,
      solutions: {
        ...prev.solutions,
        solutionData: prev.solutions.solutionData.map((sol, idx) =>
          idx === solutionIndex
            ? {
                ...sol,
                contents: sol.contents.filter((_, i) => i !== contentIndex)
              }
            : sol
        )
      }
    }));
  };

  /**
   * Handles changes in content fields
   * @param {number} solutionIndex - Index of the solution
   * @param {number} contentIndex - Index of the content
   * @param {string} field - Field to update
   * @param {any} value - New value
   */
  const handleContentChange = (solutionIndex, contentIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      solutions: {
        ...prev.solutions,
        solutionData: prev.solutions.solutionData.map((sol, idx) =>
          idx === solutionIndex
            ? {
                ...sol,
                contents: sol.contents.map((content, i) =>
                  i === contentIndex
                    ? { ...content, [field]: value }
                    : content
                )
              }
            : sol
        )
      }
    }));
  };

  // Effect hooks for data fetching
  useEffect(() => {
    fetchCommonComponents();
    if (isEditMode) {
      fetchCaseStudy();
    }
  }, [slug]);

  /**
   * Renders form fields for a content section
   */
  const renderContentFields = (solution, solutionIndex, content, contentIndex) => {
    return (
      <div key={contentIndex} className="space-y-4 pl-4 border-l-2 border-gray-200 mt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-md font-medium">Content Section {contentIndex + 1}</h4>
          {solution.contents.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveContent(solutionIndex, contentIndex)}
              className="text-red-600 hover:text-red-800"
            >
              <MinusCircle className="h-5 w-5" />
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Primary Heading</label>
          <input
            type="text"
            value={content.primaryHeading || ''}
            onChange={(e) => handleContentChange(solutionIndex, contentIndex, 'primaryHeading', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {solution.number !== '03' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Description</label>
            <textarea
              value={content.primaryDescription || ''}
              onChange={(e) => handleContentChange(solutionIndex, contentIndex, 'primaryDescription', e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        )}

        {solution.number === '03' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
            {content.points.map((point, pointIndex) => (
              <div key={pointIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={point || ''}
                  onChange={(e) => {
                    const newPoints = [...content.points];
                    newPoints[pointIndex] = e.target.value;
                    handleContentChange(solutionIndex, contentIndex, 'points', newPoints);
                  }}
                  className="flex-1 border border-gray-300 rounded-md shadow-sm p-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newPoints = content.points.filter((_, i) => i !== pointIndex);
                    handleContentChange(solutionIndex, contentIndex, 'points', newPoints);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newPoints = [...content.points, ''];
                handleContentChange(solutionIndex, contentIndex, 'points', newPoints);
              }}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Point
            </button>
          </div>
        )}

  
        {solution.number === '04' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={content.description || ''}
                onChange={(e) => handleContentChange(solutionIndex, contentIndex, 'description', e.target.value)}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Image</label>
              <div className="mt-2">
                <img
                  src={CUSTOMER_SPEAK_IMAGE}
                  alt="Customer"
                  className="h-20 w-20 object-cover rounded"
                />
                <input
                  type="hidden"
                  value={CUSTOMER_SPEAK_IMAGE}
                  onChange={(e) => handleContentChange(solutionIndex, contentIndex, 'image', e.target.value)}
                />
              </div>
            </div>
          </>
        )}
        </div>
      );
    };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Case Study' : 'Create New Case Study'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}



      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug || ''}
                onChange={(e) => handleChange(e)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                SEO Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.seo.title || ''}
                onChange={(e) => handleChange(e, 'seo')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Main Section</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Background Image
              </label>
              <div className="mt-1 flex items-center">
                {formData.mainSection.backgroundImageUrl && (
                  <img
                    src={formData.mainSection.backgroundImageUrl}
                    alt="Background"
                    className="h-20 w-20 object-cover mr-4"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'mainSection', 'backgroundImageUrl')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Heading
              </label>
              <input
                type="text"
                name="heading"
                value={formData.mainSection.heading || ''}
                onChange={(e) => handleChange(e, 'mainSection')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categories (comma-separated)
              </label>
              <input
                type="text"
                name="categories"
                onChange={(e) => {
                  const categories = e.target.value.split(',').map(cat => cat.trim());
                  setFormData(prev => ({
                    ...prev,
                    mainSection: {
                      ...prev.mainSection,
                      categories
                    }
                  }));
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.mainSection.description || ''}
                onChange={(e) => handleChange(e, 'mainSection')}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Solutions</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Solutions Title</label>
            <input
              type="text"
              name="title"
              value={formData.solutions.title || ''}
              onChange={(e) => handleChange(e, 'solutions')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          {formData.solutions.solutionData.map((solution, solutionIndex) => (
            <div key={solution.id} className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">{solution.title} (Section {solution.number})</h3>
              
              {solution.contents.map((content, contentIndex) => 
                renderContentFields(solution, solutionIndex, content, contentIndex)
              )}

              <button
                type="button"
                onClick={() => handleAddContent(solutionIndex)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Content Section
              </button>
            </div>
          ))}
        </div>
      </div>

        {/* AI Services Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">AI Services</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.aiServices.title || ''}
                onChange={(e) => handleChange(e, 'aiServices')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Background Video URL
              </label>
              <input
                type="text"
                name="backgroundVideo"
                value={formData.aiServices.backgroundVideo || ''}
                onChange={(e) => handleChange(e, 'aiServices')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
        </div>
        

                 <div className="bg-white shadow sm:rounded-lg p-6">
             <h2 className="text-xl font-semibold mb-4">Optional Components</h2>
             <div className="space-y-4">
               <div className="flex items-center">
                 <input
                   type="checkbox"
                   id="includeWhitePaperSlides"
                   checked={formData.includeWhitePaperSlides}
                   onChange={(e) => setFormData(prev => ({
                     ...prev,
                     includeWhitePaperSlides: e.target.checked
                   }))}
                   className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                 />
                 <label htmlFor="includeWhitePaperSlides" className="ml-2 text-sm text-gray-700">
                   Include White Paper Slides
                 </label>
               </div>
               <div className="flex items-center">
                 <input
                   type="checkbox"
                   id="includeCaseStudySlides"
                   checked={formData.includeCaseStudySlides}
                   onChange={(e) => setFormData(prev => ({
                     ...prev,
                     includeCaseStudySlides: e.target.checked
                   }))}
                   className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                 />
                 <label htmlFor="includeCaseStudySlides" className="ml-2 text-sm text-gray-700">
                   Include Case Study Slides
                 </label>
               </div>
             </div>
           </div>



        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/case-studies')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Case Study
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseStudyForm;




