import React, { useState, useEffect } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import Questions from './Questions';
import './Aptitude.css';

const AptitudeTest = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch job titles from MongoDB (replace with your actual API)
    fetch('http://localhost:5000/api/jobs')
      .then((response) => response.json())
      .then((data) => setCategories(data.map((job) => job.title)))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      setShowQuestions(true);
    } else {
      alert('Please select a category!');
    }
  };

  return (
    <div className="aptitude-wrapper"> {/* Wrapper to center content */}
      <div className="aptitude-container">
        <h2>
          <FaClipboardList /> APTITUDE TEST
        </h2>
        {!showQuestions ? (
          <form className="job-form">
            <div className="radio-group">
              {categories.map((category, index) => (
                <label key={index} className="radio-label">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={handleCategoryChange}
                    className="radio-input"
                  />
                  {category}
                </label>
              ))}
            </div>
            <button type="submit" onClick={handleSubmit} className="btn">
              Questions
            </button>
          </form>
        ) : (
          <Questions category={selectedCategory} />
        )}
      </div>
    </div>
  );
};

export default AptitudeTest;
