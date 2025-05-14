import React from 'react';
import { 
  FaPlus, FaBuilding, FaGlobe, FaMobileAlt, 
  FaFileAlt, FaCalendarCheck, FaBookmark, FaEye,
  FaEllipsisV, FaCheck, FaClock, FaTimes,
  FaRobot, FaLightbulb, FaBullseye 
} from 'react-icons/fa';

const MainContent = () => {
  return (
    // <main className="lg:w-3/4">
    <div className="w-full">      {/* Welcome Banner */}
      <div className="gradient-bg text-white rounded-xl p-6 mb-8 relative overflow-hidden fade-in">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
            <p className="opacity-90">Your job search is looking great. Keep it up!</p>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition transform hover:scale-105 active:scale-95 shadow-lg">
            <FaPlus className="mr-2 inline" /> Upload Resume
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Applications</p>
              <h3 className="text-2xl font-bold mt-1">12</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
              <FaFileAlt className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-green-500 font-medium"><i className="fas fa-arrow-up mr-1"></i> 2.5% from last week</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Interviews</p>
              <h3 className="text-2xl font-bold mt-1">3</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
              <FaCalendarCheck className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-green-500 font-medium"><i className="fas fa-arrow-up mr-1"></i> 1 new this week</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Saved Jobs</p>
              <h3 className="text-2xl font-bold mt-1">8</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shadow-inner">
              <FaBookmark className="text-indigo-600 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-gray-500 font-medium">No change</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 card-hover fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Profile Views</p>
              <h3 className="text-2xl font-bold mt-1">24</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shadow-inner">
              <FaEye className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-green-500 font-medium"><i className="fas fa-arrow-up mr-1"></i> 5 new views</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button className="py-4 px-1 font-medium text-gray-500 hover:text-blue-600 relative active-tab">
            <span>Recent Jobs</span>
          </button>
          <button className="py-4 px-1 font-medium text-gray-500 hover:text-blue-600 relative">
            <span>Recommended</span>
          </button>
          <button className="py-4 px-1 font-medium text-gray-500 hover:text-blue-600 relative">
            <span>Saved Jobs</span>
          </button>
        </nav>
      </div>

      {/* Job Listings */}
      <div className="space-y-4 mb-8">
        {/* Job Card 1 */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition card-hover fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center shadow-inner">
                <FaBuilding className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Senior UX Designer</h3>
                <div className="flex flex-wrap items-center mt-1 space-x-4 text-sm text-gray-500">
                  <span><FaBuilding className="mr-1 inline" /> TechCorp Inc.</span>
                  <span><i className="fas fa-map-marker-alt mr-1"></i> San Francisco, CA</span>
                  <span><i className="fas fa-dollar-sign mr-1"></i> $120k - $140k</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Applied</span>
              <button className="text-blue-600 hover:text-blue-800 transform hover:scale-125 transition">
                <FaEllipsisV />
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white -mr-2 flex items-center justify-center">
                  <FaCheck className="text-white text-xs" />
                </div>
                <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white -mr-2 flex items-center justify-center">
                  <FaCheck className="text-white text-xs" />
                </div>
                <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center animate-pulse">
                  <FaClock className="text-white text-xs" />
                </div>
              </div>
              <span className="text-sm text-gray-500">Interview in progress</span>
            </div>
            <span className="text-sm text-gray-500">Applied 5 days ago</span>
          </div>
        </div>

        {/* Job Card 2 */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition card-hover fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg bg-purple-50 flex items-center justify-center shadow-inner">
                <FaGlobe className="text-purple-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Product Manager</h3>
                <div className="flex flex-wrap items-center mt-1 space-x-4 text-sm text-gray-500">
                  <span><FaBuilding className="mr-1 inline" /> WebSolutions</span>
                  <span><i className="fas fa-map-marker-alt mr-1"></i> Remote</span>
                  <span><i className="fas fa-dollar-sign mr-1"></i> $100k - $130k</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
              <button className="text-blue-600 hover:text-blue-800 transform hover:scale-125 transition">
                <FaBookmark />
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">Match score: 92%</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div className="bg-green-500 h-2.5 rounded-full animate-progress" style={{ width: '92%' }}></div>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 active:translate-y-0 shadow-md">
              Apply Now
            </button>
          </div>
        </div>

        {/* Job Card 3 */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition card-hover fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg bg-green-50 flex items-center justify-center shadow-inner">
                <FaMobileAlt className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">iOS Developer</h3>
                <div className="flex flex-wrap items-center mt-1 space-x-4 text-sm text-gray-500">
                  <span><FaBuilding className="mr-1 inline" /> MobileFirst</span>
                  <span><i className="fas fa-map-marker-alt mr-1"></i> New York, NY</span>
                  <span><i className="fas fa-dollar-sign mr-1"></i> $110k - $135k</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Applied</span>
              <button className="text-blue-600 hover:text-blue-800 transform hover:scale-125 transition">
                <FaEllipsisV />
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white flex items-center justify-center">
                <FaTimes className="text-white text-xs" />
              </div>
              <span className="text-sm text-gray-500">Application rejected</span>
            </div>
            <span className="text-sm text-gray-500">Applied 2 weeks ago</span>
          </div>
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <FaRobot className="text-blue-600 mr-2 bounce" style={{ animationDelay: '0.5s' }} />
            AI Recommendations
          </h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition transform hover:-translate-y-1">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recommendation 1 */}
          <div className="border border-blue-100 rounded-lg p-4 bg-blue-50 transform hover:scale-[1.02] transition">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                <FaLightbulb className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Profile Suggestion</h4>
                <p className="text-sm text-gray-600 mt-1">Add 2 more projects to increase your visibility by 15%</p>
                <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition transform hover:-translate-y-1">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
          {/* Recommendation 2 */}
          <div className="border border-green-100 rounded-lg p-4 bg-green-50 transform hover:scale-[1.02] transition">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
                <FaBullseye className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Job Match</h4>
                <p className="text-sm text-gray-600 mt-1">Based on your skills, we found 3 perfect matches</p>
                <button className="mt-2 text-green-600 hover:text-green-800 text-sm font-medium transition transform hover:-translate-y-1">
                  View Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* </main> */}
    </div>

  );
};

export default MainContent;