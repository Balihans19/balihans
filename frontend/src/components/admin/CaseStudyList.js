import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Plus, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

/**
 * CaseStudyList Component - Displays a paginated list of case studies with management options.
 * Allows admin users to view, delete, and navigate through case studies.
 *
 * @returns {JSX.Element} - The case studies list UI.
 */
const CaseStudyList = () => {
  // State for storing case studies, loading status, errors, pagination
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch case studies whenever the page number changes
  useEffect(() => {
    fetchCaseStudies();
  }, [page]);

  /**
   * Fetches case studies from the API with pagination support.
   * Updates the state with the fetched data.
   */
  const fetchCaseStudies = async () => {
    try {
      const { data } = await axios.get(`/api/admin/case-studies?page=${page}&limit=10`);
      setCaseStudies(data.caseStudies);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to fetch case studies');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the deletion of a case study.
   * Prompts the user for confirmation before proceeding with the API request.
   *
   * @param {string} slug - Unique identifier for the case study.
   */
  const handleDelete = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this case study? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`/api/admin/case-studies/${slug}`);
      fetchCaseStudies(); // Refresh list after successful deletion
    } catch (err) {
      setError('Failed to delete case study');
    }
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show error message if the request fails
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 lg:mt-0">
      {/* Header Section */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Case Studies</h1>
          <p className="mt-2 text-xl text-white">Manage your case studies - create and remove entries.</p>
        </div>
        <Link
          to="/admin/case-studies/new"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Case Study
        </Link>
      </div>

      {/* Case Studies Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-4 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Categories</th>
              <th className="px-4 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-4 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-4 py-3 text-right text-base font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {caseStudies.map((study) => (
              <tr key={study.slug} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{study.seo?.title}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{study.slug}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {(study.mainSection?.categories || []).map((category) => (
                      <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {category}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm">{new Date(study.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-4 text-center">
                  <a
                    href={`/case-studies/${study.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors"
                    title="View case study"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-center space-x-4">
                    <button onClick={() => handleDelete(study.slug)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-gray-300 text-gray-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          <ChevronLeft className="h-5 w-5 inline-block mr-2" />
          Previous
        </button>

        <span className="text-sm text-gray-700">Page {page} of {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-md ${page === totalPages ? 'bg-gray-300 text-gray-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          Next
          <ChevronRight className="h-5 w-5 inline-block ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CaseStudyList;


