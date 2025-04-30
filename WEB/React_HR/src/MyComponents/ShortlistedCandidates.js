import React from 'react';
import './ShortlistedCandidates.css';  // Import CSS

const ShortlistedCandidates = () => {
  const candidates = [
    { name: "John Doe", email: "john@example.com", category: "Software Developer", score: 85, resumeLink: "#" },
    { name: "Jane Smith", email: "jane@example.com", category: "Data Scientist", score: 90, resumeLink: "#" },
    { name: "Tom Green", email: "tom@example.com", category: "UI/UX Designer", score: 88, resumeLink: "#" },
    { name: "Lucy Brown", email: "lucy@example.com", category: "Project Manager", score: 92, resumeLink: "#" },
  ];

  return (
    <div className="shortlisted-candidates-container">
      <h2>Shortlisted Candidates</h2>
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Selected Category</th>
            <th>Resume Score</th>
            <th>Resumes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.category}</td>
              <td>{candidate.score}</td>
              <td><a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer">Download Resume</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShortlistedCandidates;
