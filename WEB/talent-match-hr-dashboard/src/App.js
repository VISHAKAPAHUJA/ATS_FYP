import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeBanner from './components/WelcomeBanner';
import StatsCard from './components/StatsCard';
import ApplicationsChart from './components/ApplicationsChart';
import RecentActivity from './components/RecentActivity';
import TopCandidates from './components/TopCandidates';
import HiringProgress from './components/HiringProgress';
import PostJob from './components/PostJob';
import ManageJobs from './components/ManageJobs';
import CandidatesDashboard from './components/CandidatesDashboard';
import SettingsPage from './components/SettingsPage';
import CreateAccount from './Authentication/CreateAccount';
import Login from './Authentication/Login'
import VerifyEmail from './Authentication/VerifyEmail'
import { FaBriefcase, FaFileAlt, FaCalendarAlt, FaUserCheck } from 'react-icons/fa';

const Dashboard = () => (
  <div className="lg:w-3/4">
    <WelcomeBanner />
    
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard 
        title="Active Jobs" 
        value="8" 
        icon={FaBriefcase} 
        borderColor="border-blue-500" 
        bgColor="bg-blue-100" 
        textColor="text-blue-500" 
        change="+2 from last week" 
      />
      <StatsCard 
        title="Applications" 
        value="124" 
        icon={FaFileAlt} 
        borderColor="border-green-500" 
        bgColor="bg-green-100" 
        textColor="text-green-500" 
        change="+15% from last week" 
      />
      <StatsCard 
        title="Interviews" 
        value="18" 
        icon={FaCalendarAlt} 
        borderColor="border-yellow-500" 
        bgColor="bg-yellow-100" 
        textColor="text-yellow-500" 
        change="+3 scheduled today" 
      />
      <StatsCard 
        title="Hired" 
        value="5" 
        icon={FaUserCheck} 
        borderColor="border-purple-500" 
        bgColor="bg-purple-100" 
        textColor="text-purple-500" 
        change="+1 this week" 
      />
    </div>
    
    {/* Main Dashboard Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <ApplicationsChart />
      <RecentActivity />
    </div>
    
    {/* Candidates and Jobs Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <TopCandidates />
      <HiringProgress />
    </div>
  </div>
);
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
      if (!isAuthenticated) {
          navigate('/login');
      }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

// Then update your dashboard routes to use the ProtectedRoute:

function App() {
  return (
    <Router>
      <Routes>
        {/* Create Account Route (shown first by default) */}
        <Route path="/" element={
          <div className="min-h-screen">
            <CreateAccount />
          </div>
        } />
         <Route path="/login" element={
          <div className="min-h-screen">
            <Login />
          </div>
        } />
        <Route path="/verify-email" element={
          <div className="min-h-screen">
            <VerifyEmail />
          </div>
        } />

<Route path="/dashboard" element={
    <ProtectedRoute>
        {/* <div className="min-h-screen bg-white"> */}
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar />
                <Dashboard />
            </div>
            </main>
        </div>
    </ProtectedRoute>
} />
        
        
        <Route path="/post-job" element={
          <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar />
                <PostJob />
              </div>
            </main>
          </div>
        } />

        
        {/* Add other dashboard routes similarly */}
        <Route path="/manage-jobs" element={
          <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar />
                <ManageJobs />
              </div>
            </main>
          </div>
        } />

<Route path="/candidates" element={
          <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar />
                <CandidatesDashboard />
              </div>
            </main>
          </div>
        } />

<Route path="/settings" element={
          <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar />
                <SettingsPage />
              </div>
            </main>
          </div>
        } />

      </Routes>
    </Router>
  );
}

export default App;