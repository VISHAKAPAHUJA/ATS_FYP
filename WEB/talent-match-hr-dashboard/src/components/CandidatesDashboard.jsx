import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaChevronLeft, 
  FaChevronRight, 
  FaChevronDown,
  FaFilePdf, 
  FaFileWord, 
  FaFileAlt, 
  FaUsers, 
  FaFileAlt as FaFileAlt2, 
  FaCheckCircle, 
  FaHandshake, 
  FaUser, 
  FaHome, 
  FaUserTie, 
  FaBriefcase, 
  FaChartBar 
} from 'react-icons/fa';

const CandidatesDashboard = () => {
  const [activeTab, setActiveTab] = useState('all-candidates');
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      initials: 'JS',
      name: 'John Smith',
      email: 'john.smith@example.com',
      position: 'Senior Frontend Dev',
      appliedDate: 'May 15, 2023',
      status: 'Resume Review',
      statusColor: 'yellow',
      resumeScore: 92,
      assessmentScore: null,
      bgColor: 'blue'
    },
    {
      id: 2,
      initials: 'JD',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      position: 'UX Designer',
      appliedDate: 'May 12, 2023',
      status: 'Resume Passed',
      statusColor: 'green',
      resumeScore: 78,
      assessmentScore: null,
      bgColor: 'green'
    },
    {
      id: 3,
      initials: 'MB',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      position: 'Data Scientist',
      appliedDate: 'May 10, 2023',
      status: 'Assessment Passed',
      statusColor: 'purple',
      resumeScore: 95,
      assessmentScore: 92,
      bgColor: 'purple'
    },
    {
      id: 4,
      initials: 'AR',
      name: 'Alice Roberts',
      email: 'alice.r@example.com',
      position: 'Product Manager',
      appliedDate: 'May 8, 2023',
      status: 'Rejected',
      statusColor: 'red',
      resumeScore: 65,
      assessmentScore: null,
      bgColor: 'red'
    }
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getScoreClass = (score, type) => {
    if (score >= 85) return `${type}-score-excellent`;
    if (score >= 70) return `${type}-score-good`;
    if (score >= 50) return `${type}-score-average`;
    return `${type}-score-poor`;
  };

  useEffect(() => {
    // Simulate loading animation for progress bars
    const progressBars = document.querySelectorAll('.progress-animate');
    progressBars.forEach(bar => {
      const currentWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = currentWidth;
      }, 300);
    });
  }, [activeTab]);

  return (
    <div className="bg-gray-50 max-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col">
          {/* Candidates Content */}
          <div className="w-full">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Candidates Management</h1>
                <p className="text-gray-600">View and manage all candidates for your open positions</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Senior Frontend Developer</option>
                    <option>UX/UI Designer</option>
                    <option>Data Scientist</option>
                    <option>Product Manager</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaChevronDown className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Candidates</p>
                    <h3 className="text-2xl font-bold text-gray-800">42</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaUsers className="text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Resume Passed</p>
                    <h3 className="text-2xl font-bold text-gray-800">28</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <FaFileAlt2 className="text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Assessment Passed</p>
                    <h3 className="text-2xl font-bold text-gray-800">15</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <FaCheckCircle className="text-purple-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-t-xl shadow-sm">
              <div className="flex overflow-x-auto">
                <button 
                  onClick={() => handleTabChange('all-candidates')}
                  className={`tab-button px-6 py-3 text-sm font-medium ${activeTab === 'all-candidates' ? 'active text-blue-500' : 'text-gray-500'}`}
                >
                  All Candidates
                </button>
                <button 
                  onClick={() => handleTabChange('resume-passed')}
                  className={`tab-button px-6 py-3 text-sm font-medium ${activeTab === 'resume-passed' ? 'active text-blue-500' : 'text-gray-500'}`}
                >
                  Resume Passed
                </button>
                <button 
                  onClick={() => handleTabChange('assessment-passed')}
                  className={`tab-button px-6 py-3 text-sm font-medium ${activeTab === 'assessment-passed' ? 'active text-blue-500' : 'text-gray-500'}`}
                >
                  Assessment Passed
                </button>
                <button 
                  onClick={() => handleTabChange('interview-stage')}
                  className={`tab-button px-6 py-3 text-sm font-medium ${activeTab === 'interview-stage' ? 'active text-blue-500' : 'text-gray-500'}`}
                >
                  Interview Stage
                </button>
              </div>
            </div>

            {/* Candidates Table */}
            <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
              {/* All Candidates Tab Content */}
              {activeTab === 'all-candidates' && (
                <div id="all-candidates" className="p-6 fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <div className="relative w-full max-w-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                      </div>
                      <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search candidates..." />
                    </div>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        <FaFilter className="inline mr-2" /> Filter
                      </button>
                      <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        <FaDownload className="inline mr-2" /> Export
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {candidates.map((candidate) => (
                          <tr key={candidate.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`flex-shrink-0 h-10 w-10 rounded-full bg-${candidate.bgColor}-100 flex items-center justify-center`}>
                                  <span className={`text-${candidate.bgColor}-800 font-medium`}>{candidate.initials}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                                  <div className="text-sm text-gray-500">{candidate.position}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.appliedDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${candidate.statusColor}-100 text-${candidate.statusColor}-800`}>
                                {candidate.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                              {candidate.status === 'Rejected' ? (
                                <button className="text-gray-600 hover:text-gray-900">Restore</button>
                              ) : (
                                <button className="text-red-600 hover:text-red-900">Reject</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                      </a>
                      <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                      </a>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">42</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Previous</span>
                            <FaChevronLeft className="h-4 w-4" />
                          </a>
                          <a href="#" aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            1
                          </a>
                          <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            2
                          </a>
                          <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            3
                          </a>
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                          <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            8
                          </a>
                          <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Next</span>
                            <FaChevronRight className="h-4 w-4" />
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Resume Passed Tab Content */}
              {activeTab === 'resume-passed' && (
                <div id="resume-passed" className="p-6 fade-in">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Candidates with Passed Resumes</h3>
                    <p className="text-sm text-gray-500">These candidates have been approved by our AI screening model.</p>
                  </div>

                  <div className="space-y-4">
                    {candidates.filter(c => c.status === 'Resume Passed').map(candidate => (
                      <div key={candidate.id} className="candidate-card bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className={`flex-shrink-0 h-12 w-12 rounded-full bg-${candidate.bgColor}-100 flex items-center justify-center mr-4`}>
                              <span className={`text-${candidate.bgColor}-800 font-medium text-lg`}>{candidate.initials}</span>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">{candidate.name}</h4>
                              <p className="text-sm text-gray-500">{candidate.email}</p>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                            <div className="mb-3 md:mb-0">
                              <p className="text-xs font-medium text-gray-500 mb-1">RESUME SCORE</p>
                              <div className="flex items-center">
                                <div className="w-24 h-2 rounded-full mr-2">
                                  <div 
                                    className={`h-full rounded-full progress-animate ${getScoreClass(candidate.resumeScore, 'resume')}`}
                                    style={{ width: `${candidate.resumeScore}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{candidate.resumeScore}/100</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500 mb-1">RESUME</p>
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                <FaFilePdf className="mr-1" /> View Resume
                              </button>
                            </div>
                            <div className="mt-3 md:mt-0">
                              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                                Schedule Interview
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">28</span> results
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Assessment Passed Tab Content */}
              {activeTab === 'assessment-passed' && (
                <div id="assessment-passed" className="p-6 fade-in">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Candidates with Passed Assessments</h3>
                    <p className="text-sm text-gray-500">These candidates have successfully passed both resume screening and skills assessment.</p>
                  </div>

                  <div className="space-y-4">
                    {candidates.filter(c => c.status === 'Assessment Passed').map(candidate => (
                      <div key={candidate.id} className="candidate-card bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className={`flex-shrink-0 h-12 w-12 rounded-full bg-${candidate.bgColor}-100 flex items-center justify-center mr-4`}>
                              <span className={`text-${candidate.bgColor}-800 font-medium text-lg`}>{candidate.initials}</span>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">{candidate.name}</h4>
                              <p className="text-sm text-gray-500">{candidate.email}</p>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                            <div className="mb-3 md:mb-0">
                              <p className="text-xs font-medium text-gray-500 mb-1">RESUME SCORE</p>
                              <div className="flex items-center">
                                <div className="w-24 h-2 rounded-full mr-2">
                                  <div 
                                    className={`h-full rounded-full progress-animate ${getScoreClass(candidate.resumeScore, 'resume')}`}
                                    style={{ width: `${candidate.resumeScore}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{candidate.resumeScore}/100</span>
                              </div>
                            </div>
                            <div className="mb-3 md:mb-0">
                              <p className="text-xs font-medium text-gray-500 mb-1">TEST SCORE</p>
                              <div className="flex items-center">
                                <div className="w-24 h-2 rounded-full mr-2">
                                  <div 
                                    className={`h-full rounded-full progress-animate ${getScoreClass(candidate.assessmentScore, 'assessment')}`}
                                    style={{ width: `${candidate.assessmentScore}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{candidate.assessmentScore}/100</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500 mb-1">DOCUMENTS</p>
                              <div className="flex space-x-3">
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                  <FaFilePdf className="mr-1" /> Resume
                                </button>
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                  <FaFileAlt className="mr-1" /> Test
                                </button>
                              </div>
                            </div>
                            <div className="mt-3 md:mt-0">
                              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                                Schedule Final Interview
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">15</span> results
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .custom-shadow {
          box-shadow: 0 4px 20px rgba(14, 60, 145, 0.12);
        }
        .candidate-card:hover {
          transform: translateY(-3px);
          transition: all 0.3s ease;
          box-shadow: 0 6px 15px rgba(14, 60, 145, 0.15);
        }
        .tab-button {
          position: relative;
          padding-bottom: 0.5rem;
        }
        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #0E3C91;
        }
        .progress-bar {
          height: 6px;
          border-radius: 3px;
          background-color: #E3F2FD;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, #0E3C91, #1E88E5);
        }
        .resume-score-excellent {
          background: linear-gradient(90deg, #10B981, #34D399);
        }
        .resume-score-good {
          background: linear-gradient(90deg, #3B82F6, #93C5FD);
        }
        .resume-score-average {
          background: linear-gradient(90deg, #F59E0B, #FBBF24);
        }
        .resume-score-poor {
          background: linear-gradient(90deg, #EF4444, #F87171);
        }
        .assessment-score-excellent {
          background: linear-gradient(90deg, #10B981, #34D399);
        }
        .assessment-score-good {
          background: linear-gradient(90deg, #3B82F6, #93C5FD);
        }
        .assessment-score-average {
          background: linear-gradient(90deg, #F59E0B, #FBBF24);
        }
        .assessment-score-poor {
          background: linear-gradient(90deg, #EF4444, #F87171);
        }
      `}</style>
    </div>
  );
};

export default CandidatesDashboard;