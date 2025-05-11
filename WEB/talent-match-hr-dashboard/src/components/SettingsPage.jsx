import React, { useState } from 'react';
import { 
  FaUser, 
  FaBell, 
  FaSave, 
  FaCog,
  FaHandshake,
  FaUserTie,
  FaHome,
  FaBriefcase
} from 'react-icons/fa';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    emailNotifications: true,
    smsNotifications: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content - Full width */}
      <main className="w-full px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#0E3C91]">Account Settings</h2>
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#0E3C91] text-white rounded-lg hover:bg-[#0E3C91]/90 transition flex items-center space-x-2 mt-4 md:mt-0"
            >
              <FaSave />
              <span>Save Changes</span>
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Navigation */}
            <div className="lg:w-1/4">
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-1">
                  <li>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className={`settings-tab ${activeTab === 'profile' ? 'active font-medium text-[#0E3C91]' : 'text-gray-700'} flex items-center space-x-3 p-3 rounded-lg w-full text-left`}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center">
                        <FaUser className={activeTab === 'profile' ? 'text-[#0E3C91]' : 'text-gray-500'} />
                      </div>
                      <span>Profile</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('notifications')}
                      className={`settings-tab ${activeTab === 'notifications' ? 'active font-medium text-[#0E3C91]' : 'text-gray-700'} flex items-center space-x-3 p-3 rounded-lg w-full text-left`}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center">
                        <FaBell className={activeTab === 'notifications' ? 'text-[#0E3C91]' : 'text-gray-500'} />
                      </div>
                      <span>Notifications</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Settings Content */}
            <div className="lg:w-3/4">
              {activeTab === 'profile' && (
                <div className="space-y-8 fade-in">
                  {/* Profile Section */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                      <FaUser className="mr-2 text-[#0E3C91]" />
                      Personal Information
                    </h3>
                    
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-gray-100 mb-4 overflow-hidden">
                          <img 
                            src="https://randomuser.me/api/portraits/women/44.jpg" 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button className="text-sm text-[#0E3C91] font-medium hover:text-[#0E3C91]/80 transition">
                          Change Photo
                        </button>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input 
                              type="text" 
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E3C91] focus:border-[#0E3C91] transition"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input 
                              type="text" 
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E3C91] focus:border-[#0E3C91] transition"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E3C91] focus:border-[#0E3C91] transition"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="space-y-8 fade-in">
                  {/* Notifications Section */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                      <FaBell className="mr-2 text-[#0E3C91]" />
                      Notification Preferences
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Email Notifications</h4>
                          <p className="text-sm text-gray-500">Receive email notifications about new applicants</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="emailNotifications"
                            checked={formData.emailNotifications}
                            onChange={handleInputChange}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E3C91]"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">SMS Notifications</h4>
                          <p className="text-sm text-gray-500">Receive SMS notifications for urgent matters</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="smsNotifications"
                            checked={formData.smsNotifications}
                            onChange={handleInputChange}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E3C91]"></div>
                        </label>
                      </div>
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
          animation: fadeIn 0.5s ease-out;
        }
        .custom-shadow {
          box-shadow: 0 4px 20px rgba(14, 60, 145, 0.12);
        }
        .gradient-bg {
          background: linear-gradient(135deg, #0E3C91 0%, #1E88E5 50%, #90CAF9 100%);
        }
        .settings-tab {
          transition: all 0.3s ease;
        }
        .settings-tab:hover {
          background-color: #F5F9FF;
        }
        .settings-tab.active {
          background-color: #F5F9FF;
          border-left: 4px solid #0E3C91;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;