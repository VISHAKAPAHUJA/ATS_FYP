import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  FaUserTie,
  FaHome,
  FaSearch,
  FaFileAlt,
  FaCalendarCheck,
  FaChartLine,
  FaCog,
  FaQuestionCircle,
  FaCheckCircle,
} from "react-icons/fa";
import axios from 'axios';

const Sidebar = () => {
  const [userData, setUserData] = useState({
    username: "User",
    email: "",
    profileStrength: 75,
    applicationCount: 5,
    interviewCount: 2
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      console.log("Fetching user data with token:", token);
      
      const response = await axios.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("API Response:", response.data); // Add this line

      if (response.data.success) {
        console.log("User data received:", response.data.user); // Debug log
        setUserData({
          username: response.data.user.username || "User",
          email: response.data.user.email || "",
          profileStrength: response.data.user.profileStrength || 0, // Changed to 0
          applicationCount: response.data.user.applicationCount || 0, // Changed to 0
          interviewCount: response.data.user.interviewCount || 0 // Changed to 0
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, []);

  // Function to get initials from username or email
  const getInitials = () => {
    if (userData.username && userData.username.length > 0) {
      const parts = userData.username.split(' ');
      return parts.map(part => part[0]).join('').toUpperCase().substring(0, 2);
    }
    if (userData.email && userData.email.length > 0) {
      return userData.email.substring(0, 2).toUpperCase();
    }
    return "US";
  };

  if (loading) {
    return (
      <aside className="lg:w-1/4">
        <div className="bg-white rounded-xl shadow-xl p-6 sticky top-8 border border-gray-100">
          <div className="animate-pulse">
            <div className="h-20 w-20 mx-auto rounded-full bg-gray-200 mb-4"></div>
            <div className="h-6 w-3/4 mx-auto bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:w-1/4">
      <div className="bg-white rounded-xl shadow-xl p-6 sticky top-8 border border-gray-100 transition hover:shadow-2xl">
        {/* Profile Summary */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4 shadow-lg relative overflow-hidden">
            <span className="text-white text-2xl font-bold z-10">
              {getInitials()}
            </span>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {userData.username}
          </h3>
          <p className="text-sm text-gray-500">
            {userData.email || "Member since 2023"}
          </p>
          <div className="mt-2 flex space-x-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-1 animate-pulse"></span>
              Active
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              <FaCheckCircle className="text-xs mr-1" />
              Verified
            </span>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Profile Strength
            </span>
            <span className="text-sm font-medium text-blue-600">{userData.profileStrength}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${userData.profileStrength}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Complete your profile to increase visibility
          </p>
        </div>

        {/* Navigation */}
        <h2 className="text-xl font-bold mb-6 text-blue-600 flex items-center">
          <FaUserTie className="mr-2" />
          <span>Candidate Dashboard</span>
        </h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/candidate_dashboard"
                className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition hover:translate-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaHome className="text-blue-600" />
                </div>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/find-jobs"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition hover:translate-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaSearch className="text-gray-600" />
                </div>
                <span>Find Jobs</span>
              </Link>
            </li>
            <li>
              <Link
                to="/applications"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition hover:translate-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaFileAlt className="text-gray-600" />
                </div>
                <span>Applications</span>
                <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                  {userData.applicationCount}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/interviews"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition hover:translate-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaCalendarCheck className="text-gray-600" />
                </div>
                <span>Interviews</span>
                <span className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {userData.interviewCount}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition hover:translate-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaChartLine className="text-gray-600" />
                </div>
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition hover:translate-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaCog className="text-gray-600" />
                </div>
                <span>Settings</span>
              </Link>
            </li>
          </ul>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 p-4 rounded-lg transition hover:scale-[1.02]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaQuestionCircle className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    Need Help?
                  </h4>
                  <p className="text-xs text-gray-500">
                    Contact our support team
                  </p>
                </div>
              </div>
              <button className="mt-3 w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition hover:-translate-y-1">
                Get Support
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;