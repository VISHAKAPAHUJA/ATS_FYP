import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './MyComponents/Navbar';
import JobForm from './MyComponents/JobForm';
import AptitudeTest from './MyComponents/AptitudeTest';
import Candidates from './MyComponents/Candidates';
import ShortlistedCandidates from './MyComponents/ShortlistedCandidates';
import Finalsc from './MyComponents/Finalsc';
import './App.css';

const AppWrapper = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={isHomePage ? 'home-bg' : 'job-form-bg'}>
      <Routes>
        <Route path="/" element={<div className="home-content"><h2>Welcome to Job Seeker Platform</h2><p>Click on 'Job Details' to post a job.</p></div>} />
        <Route path="/job-details" element={<JobForm />} />
        <Route path="/aptitude-tests" element={<AptitudeTest />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/shortlisted-candidates" element={<ShortlistedCandidates />} />
        <Route path="/final-shortlisted-candidates" element={<Finalsc />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Move Navbar OUTSIDE of AppWrapper */}
      <AppWrapper />
    </Router>
  );
};

export default App;
