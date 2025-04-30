import React from 'react';
import './Finalsc.css'; // If you have any styling

const FinalShortlistedCandidates = () => {
  const candidates = [
    { name: "John Doe", email: "john@example.com", category: "Software Developer", resumeScore: 85, testScore: 90, resumeLink: "#" },
    { name: "Jane Smith", email: "jane@example.com", category: "Data Scientist", resumeScore: 88, testScore: 92, resumeLink: "#" },
    { name: "Tom Green", email: "tom@example.com", category: "UI/UX Designer", resumeScore: 87, testScore: 91, resumeLink: "#" },
    { name: "Lucy Brown", email: "lucy@example.com", category: "Project Manager", resumeScore: 90, testScore: 94, resumeLink: "#" },
  ];

  return (
    <div className="final-shortlisted-candidates-container">
      <h2>Final Shortlisted Candidates</h2>
      <table className="final-candidates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Selected Category</th>
            <th>Resume Score</th>
            <th>Test Score</th>
            <th>Resumes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.category}</td>
              <td>{candidate.resumeScore}</td>
              <td>{candidate.testScore}</td>
              <td><a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer">Download Resume</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalShortlistedCandidates;
