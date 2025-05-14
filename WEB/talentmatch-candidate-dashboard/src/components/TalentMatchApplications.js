import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const TalentMatchApplications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  const applications = [
    {
      id: 1,
      title: "UX Designer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote)",
      salary: "$90k - $120k/year",
      status: "accepted",
      appliedDate: "2 days ago",
      skills: ["UI/UX", "Figma", "Research"],
      icon: "building",
      iconColor: "blue"
    },
    {
      id: 2,
      title: "Product Designer",
      company: "EcoStart",
      location: "New York, NY (Hybrid)",
      salary: "$85k - $110k/year",
      status: "pending",
      appliedDate: "1 week ago",
      skills: ["Product", "Prototyping", "User Testing"],
      icon: "leaf",
      iconColor: "green"
    },
    {
      id: 3,
      title: "Senior UX Designer",
      company: "ShopMega",
      location: "Chicago, IL (On-site)",
      salary: "$100k - $140k/year",
      status: "rejected",
      appliedDate: "2 weeks ago",
      skills: ["E-commerce", "Mobile", "Accessibility"],
      icon: "shopping-cart",
      iconColor: "red"
    },
    {
      id: 4,
      title: "UI/UX Lead",
      company: "DevSolutions",
      location: "Boston, MA (Remote)",
      salary: "$110k - $150k/year",
      status: "accepted",
      appliedDate: "3 weeks ago",
      skills: ["Leadership", "Team", "Strategy"],
      icon: "laptop-code",
      iconColor: "purple"
    },
    {
      id: 5,
      title: "Mobile Designer",
      company: "AppVenture",
      location: "Austin, TX (Hybrid)",
      salary: "$95k - $125k/year",
      status: "pending",
      appliedDate: "1 day ago",
      skills: ["iOS", "Android", "Responsive"],
      icon: "mobile-alt",
      iconColor: "yellow"
    }
  ];

  const filteredApplications = applications.filter(app => {
    // Filter by search input
    const matchesSearch = 
      app.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      app.company.toLowerCase().includes(searchInput.toLowerCase());
    
    // Filter by active tab
    const matchesTab = 
      activeTab === 'all' || 
      app.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'accepted':
        return 'check-circle text-green-500';
      case 'pending':
        return 'clock text-yellow-500';
      case 'rejected':
        return 'times-circle text-red-500';
      default:
        return 'question-circle text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 max-w-6xl mx-auto">
      <Helmet>
        <title>TalentMatch - Applications</title>
        <style>
          {`
            .application-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
            }
            .progress-fill.wave::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
              animation: wave 2s linear infinite;
            }
            @keyframes wave {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}
        </style>
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          <i className="fas fa-file-alt text-blue-500 mr-2"></i>
          My Applications
        </h2>
        <div className="flex space-x-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search applications..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center">
            <i className="fas fa-filter mr-2"></i>
            Filter
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button 
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('all')}
          >
            All ({applications.length})
          </button>
          <button 
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'accepted' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('accepted')}
          >
            <i className={`fas fa-check-circle ${activeTab === 'accepted' ? 'text-green-500' : 'text-green-500'} mr-1`}></i>
            Accepted ({applications.filter(app => app.status === 'accepted').length})
          </button>
          <button 
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'pending' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('pending')}
          >
            <i className={`fas fa-clock ${activeTab === 'pending' ? 'text-yellow-500' : 'text-yellow-500'} mr-1`}></i>
            Pending ({applications.filter(app => app.status === 'pending').length})
          </button>
          <button 
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'rejected' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('rejected')}
          >
            <i className={`fas fa-times-circle ${activeTab === 'rejected' ? 'text-red-500' : 'text-red-500'} mr-1`}></i>
            Rejected ({applications.filter(app => app.status === 'rejected').length})
          </button>
        </nav>
      </div>

      {/* Application Cards */}
      <div className="space-y-4">
        {filteredApplications.map(application => (
          <div key={application.id} className="application-card bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center mb-4 md:mb-0 md:w-1/3">
                <div className={`w-12 h-12 rounded-lg bg-${application.iconColor}-100 flex items-center justify-center mr-4`}>
                  <i className={`fas fa-${application.icon} text-${application.iconColor}-600 text-xl`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{application.title}</h3>
                  <p className="text-sm text-gray-500">{application.company}</p>
                </div>
              </div>
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                  <span>{application.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <i className="fas fa-dollar-sign mr-2 text-gray-400"></i>
                  <span>{application.salary}</span>
                </div>
              </div>
              <div className="md:w-1/3 flex md:justify-end">
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(application.status)}`}>
                    <i className={`fas fa-${getStatusIcon(application.status)} mr-1`}></i> 
                    {application.status === 'accepted' ? 'Accepted' : 
                     application.status === 'pending' ? 'Under Review' : 'Rejected'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">Applied: {application.appliedDate}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="flex space-x-2">
                {application.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 bg-${skill.toLowerCase() === 'ui/ux' ? 'blue' : 
                              skill.toLowerCase() === 'figma' ? 'purple' :
                              skill.toLowerCase() === 'research' ? 'indigo' :
                              skill.toLowerCase() === 'product' ? 'green' :
                              skill.toLowerCase() === 'prototyping' ? 'teal' :
                              skill.toLowerCase() === 'user testing' ? 'emerald' :
                              skill.toLowerCase() === 'e-commerce' ? 'red' :
                              skill.toLowerCase() === 'mobile' ? 'orange' :
                              skill.toLowerCase() === 'accessibility' ? 'amber' :
                              skill.toLowerCase() === 'leadership' ? 'purple' :
                              skill.toLowerCase() === 'team' ? 'fuchsia' :
                              skill.toLowerCase() === 'strategy' ? 'pink' :
                              skill.toLowerCase() === 'ios' ? 'yellow' :
                              skill.toLowerCase() === 'android' ? 'blue' : 'cyan'}-50 text-${skill.toLowerCase() === 'ui/ux' ? 'blue' : 
                              skill.toLowerCase() === 'figma' ? 'purple' :
                              skill.toLowerCase() === 'research' ? 'indigo' :
                              skill.toLowerCase() === 'product' ? 'green' :
                              skill.toLowerCase() === 'prototyping' ? 'teal' :
                              skill.toLowerCase() === 'user testing' ? 'emerald' :
                              skill.toLowerCase() === 'e-commerce' ? 'red' :
                              skill.toLowerCase() === 'mobile' ? 'orange' :
                              skill.toLowerCase() === 'accessibility' ? 'amber' :
                              skill.toLowerCase() === 'leadership' ? 'purple' :
                              skill.toLowerCase() === 'team' ? 'fuchsia' :
                              skill.toLowerCase() === 'strategy' ? 'pink' :
                              skill.toLowerCase() === 'ios' ? 'yellow' :
                              skill.toLowerCase() === 'android' ? 'blue' : 'cyan'}-600 text-xs rounded-full`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50 transition">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center">
                  {application.status === 'accepted' ? (
                    <>
                      <i className="fas fa-calendar mr-2"></i> Schedule
                    </>
                  ) : application.status === 'rejected' ? (
                    <>
                      <i className="fas fa-comment mr-2"></i> Feedback
                    </>
                  ) : (
                    <>
                      <i className="fas fa-eye mr-2"></i> View Job
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredApplications.length}</span> of <span className="font-medium">{filteredApplications.length}</span> applications
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentMatchApplications;