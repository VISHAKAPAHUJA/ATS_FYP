import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Job Seeker</h1>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/job-details" className={({ isActive }) => isActive ? 'active' : ''}>Job Details</NavLink></li>
        <li><NavLink to="/aptitude-tests" className={({ isActive }) => isActive ? 'active' : ''}>Aptitude Tests</NavLink></li>
        <li><NavLink to="/candidates" className={({ isActive }) => isActive ? 'active' : ''}>Candidates</NavLink></li>
        <li><NavLink to="/shortlisted-candidates" className={({ isActive }) => isActive ? 'active' : ''}>Shortlisted Candidates</NavLink></li>
        <li><NavLink to="/final-shortlisted-candidates" className={({ isActive }) => isActive ? 'active' : ''}>Final Shortlisted Candidates</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
