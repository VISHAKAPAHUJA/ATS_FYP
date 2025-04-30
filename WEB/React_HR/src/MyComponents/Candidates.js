import React from 'react';
import './Candidates.css';

const Candidates = () => {
  // Dummy data for candidates
  const candidates = [
    { name: 'John Doe', email: 'john@example.com', category: 'Software Engineer', resume: 'resume1.pdf' },
    { name: 'Jane Smith', email: 'jane@example.com', category: 'Data Scientist', resume: 'resume2.pdf' },
    { name: 'Michael Johnson', email: 'michael@example.com', category: 'Web Developer', resume: 'resume3.pdf' },
    { name: 'Emily Davis', email: 'emily@example.com', category: 'Software Engineer', resume: 'resume4.pdf' },
    { name: 'David Wilson', email: 'david@example.com', category: 'Data Scientist', resume: 'resume5.pdf' },
  ];

  return (
    <div className="candidates-container">
      <h2 className="section-title">Candidates</h2>
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Selected Category</th>
            <th>Resumes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.category}</td>
              <td><a href={`/${candidate.resume}`} className="resume-link" download>Download Resume</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;
