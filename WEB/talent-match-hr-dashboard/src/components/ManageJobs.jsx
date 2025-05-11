import { useState, useEffect } from 'react';
import { 
  FaBriefcase, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaUserCheck,
  FaSearch,
  FaFilter,
  FaEllipsisV,
  FaUserFriends,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';
import axios from 'axios';

const ManageJobs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    activeJobs: 0,
    applications: 0,
    interviews: 0,
    hired: 0
  });

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
        
        // Calculate stats
        const activeJobs = response.data.filter(job => job.status === 'active').length;
        // Note: You might want to fetch actual application counts from your backend
        const applications = response.data.reduce((sum, job) => sum + (job.applicants || 0), 0);
        
        setStats({
          activeJobs,
          applications,
          interviews: 0, // Replace with actual data from your backend
          hired: 0 // Replace with actual data from your backend
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on active tab
  const filteredJobs = () => {
    if (activeTab === 'all') return jobs;
    if (activeTab === 'drafts') return jobs.filter(job => job.status === 'draft');
    return jobs.filter(job => job.status === activeTab);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date to "X days ago" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return 'yesterday';
    return `${diffInDays} days ago`;
  };

  // Handle job actions
  const handleJobAction = async (jobId, action) => {
    try {
      let updatedJob;
      
      switch (action) {
        case 'archive':
          updatedJob = await axios.patch(`/api/jobs/${jobId}/archive`);
          break;
        case 'publish':
          updatedJob = await axios.patch(`/api/jobs/${jobId}`, { status: 'active' });
          break;
        case 'close':
          updatedJob = await axios.patch(`/api/jobs/${jobId}`, { status: 'closed' });
          break;
        case 'repost':
          updatedJob = await axios.patch(`/api/jobs/${jobId}`, { status: 'active' });
          break;
        case 'delete':
          await axios.delete(`/api/jobs/${jobId}`);
          break;
        default:
          break;
      }

      if (action !== 'delete') {
        setJobs(jobs.map(job => 
          job._id === jobId ? (updatedJob?.data || job) : job
        ));
      } else {
        setJobs(jobs.filter(job => job._id !== jobId));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Get available actions for a job based on its status
  const getJobActions = (job) => {
    switch (job.status) {
      case 'active':
        return [
          { label: 'View Applicants', action: 'view' },
          { label: 'Edit Job', action: 'edit' },
          { label: 'Close Job', action: 'close' },
          { label: 'Archive', action: 'archive' }
        ];
      case 'draft':
        return [
          { label: 'Edit Job', action: 'edit' },
          { label: 'Publish', action: 'publish' },
          { label: 'Delete', action: 'delete' }
        ];
      case 'archived':
        return [
          { label: 'View Applicants', action: 'view' },
          { label: 'Repost', action: 'repost' },
          { label: 'Delete', action: 'delete' }
        ];
      case 'closed':
        return [
          { label: 'View Applicants', action: 'view' },
          { label: 'Repost', action: 'repost' },
          { label: 'Archive', action: 'archive' }
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stats-card bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Jobs</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.activeJobs}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FaBriefcase className="text-blue-500 text-xl" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2"><span className="text-green-500">+0</span> from last week</p>
        </div>
        
        <div className="stats-card bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Applications</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.applications}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FaFileAlt className="text-green-500 text-xl" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2"><span className="text-green-500">+0%</span> from last week</p>
        </div>
        
        <div className="stats-card bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Interviews</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.interviews}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <FaCalendarAlt className="text-yellow-500 text-xl" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2"><span className="text-green-500">+0</span> scheduled today</p>
        </div>
        
        <div className="stats-card bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Hired</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.hired}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <FaUserCheck className="text-purple-500 text-xl" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2"><span className="text-green-500">+0</span> this week</p>
        </div>
      </div>
      
      {/* Job Management Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 custom-shadow border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-2xl font-bold text-blue-800">Manage Job Postings</h2>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`tab-button mr-6 font-medium ${activeTab === 'all' ? 'text-blue-800 active' : 'text-gray-500 hover:text-blue-800'}`}
            onClick={() => setActiveTab('all')}
          >
            All Jobs
          </button>
          <button 
            className={`tab-button mr-6 font-medium ${activeTab === 'active' ? 'text-blue-800 active' : 'text-gray-500 hover:text-blue-800'}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`tab-button mr-6 font-medium ${activeTab === 'drafts' ? 'text-blue-800 active' : 'text-gray-500 hover:text-blue-800'}`}
            onClick={() => setActiveTab('drafts')}
          >
            Drafts
          </button>
          <button 
            className={`tab-button font-medium ${activeTab === 'archived' ? 'text-blue-800 active' : 'text-gray-500 hover:text-blue-800'}`}
            onClick={() => setActiveTab('archived')}
          >
            Archived
          </button>
        </div>
        
        {/* Job List */}
        <div className="space-y-4">
          {filteredJobs().length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No jobs found</p>
            </div>
          ) : (
            filteredJobs().map((job) => (
              <div 
                key={job._id} 
                className={`job-card bg-white rounded-lg border border-gray-200 p-6 custom-shadow ${
                  job.status === 'archived' ? 'archived' : job.status === 'active' ? 'active' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center">
                      <h3 className={`text-lg font-semibold ${
                        job.status === 'archived' ? 'text-gray-500' : 'text-gray-800'
                      }`}>
                        {job.title}
                      </h3>
                      <span className={`badge ml-3 px-2 py-1 rounded-full text-xs font-medium ${getBadgeClass(job.status)}`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
                      <span className="flex items-center mr-4">
                        <FaBriefcase className="mr-1 text-gray-400" />
                        {job.type}
                      </span>
                      <span className="flex items-center mr-4">
                        <FaMapMarkerAlt className="mr-1 text-gray-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <FaClock className="mr-1 text-gray-400" />
                        {job.status === 'draft' ? 'Created' : job.status === 'archived' ? 'Closed' : 'Posted'} {formatDate(job.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {job.status === 'draft' ? (
                      <button 
                        className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => handleJobAction(job._id, 'publish')}
                      >
                        Publish
                      </button>
                    ) : (
                      <span className={`text-sm font-medium ${
                        job.status === 'archived' ? 'text-gray-500' : 'text-gray-700'
                      }`}>
                        <FaUserFriends className="mr-1 inline text-gray-500" />
                        {job.applicants || 0} Applicants
                      </span>
                    )}
                    <div className="relative">
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(job._id);
                        }}
                      >
                        <FaEllipsisV />
                      </button>
                      {dropdownOpen === job._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                          {getJobActions(job).map((action, index) => (
                            <button
                              key={index}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                              onClick={() => {
                                handleJobAction(job._id, action.action);
                                setDropdownOpen(null);
                              }}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredJobs().length}</span> of <span className="font-medium">{jobs.length}</span> jobs
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-800 text-white rounded-lg hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;