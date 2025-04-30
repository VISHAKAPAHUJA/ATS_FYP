import React, { useState, useEffect } from 'react';
import './Questions.css';

const Questions = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);

  // Fetch questions for a category from Open Trivia Database API
  useEffect(() => {
    if (category) {
      // Use the Open Trivia API to fetch questions for the selected category
      const fetchQuestions = async () => {
        try {
          // Replace the category mapping with the corresponding category ID from Open Trivia
          const categoryMapping = {
            'Java Developer': 18, // Programming
            'Python Developer': 18, // Programming
            'DataBase Administrator': 18, // Programming (considering database-related questions under programming)
            'System Administrator': 18, // Programming (system administration falls under IT-related topics)
            'Network Administrator': 18, // Programming (network-related questions under IT/Programming)
            'Sales Manager': 9, // General Knowledge (Sales management is a broader domain)
            'Web Developer': 18, // Programming
            'Software Developer': 18, // Programming
            'HR Manager': 9, // General Knowledge (HR questions are more general and not specific to programming)
            'Data Scientist': 18, // Programming (since Data Science is tech-related, it's under programming)
          };
          
          const categoryId = categoryMapping[category];

          if (categoryId) {
            const response = await fetch(
              `https://opentdb.com/api.php?amount=25&category=${categoryId}&type=multiple`
            );
            const data = await response.json();
            const formattedQuestions = data.results.map((q) => ({
              question: q.question,
              options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5), // Randomize options
              correctAnswer: q.correct_answer,
            }));

            setQuestions(formattedQuestions);
          }
        } catch (error) {
          console.error('Error fetching questions from API:', error);
        }
      };

      fetchQuestions();
    }
  }, [category]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  const addQuestion = async () => {
    if (newQuestion.trim() && newOptions.every((opt) => opt.trim()) && correctAnswer.trim()) {
      const newQ = { category, question: newQuestion, options: newOptions, correctAnswer };

      try {
        const response = await fetch('http://localhost:5000/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newQ),
        });

        if (response.ok) {
          const savedQuestion = await response.json();
          setQuestions([...questions, savedQuestion]); // Update UI
          setNewQuestion('');
          setNewOptions(['', '', '', '']);
          setCorrectAnswer('');
          setShowAddQuestionForm(false);
        } else {
          console.error('Failed to save question');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error("Invalid question, options, or correct answer");
    }
  };

  const deleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setQuestions(questions.filter((q) => q._id !== id)); // Remove from UI
      } else {
        console.error('Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="questions-container">
      <h2 className="category-title">{category} Questions</h2>
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <div className="question-card" key={index}>
            <p className="question-text">{index + 1}. {q.question}</p>
            <ul className="options-list">
              {q.options.map((option, i) => (
                <li className="option-item" key={i}>{option}</li>
              ))}
            </ul>
            <p className="correct-answer">Correct Answer: {q.correctAnswer}</p>
            <button onClick={() => deleteQuestion(q._id)} className="delete-btn">Delete</button>
          </div>
        ))
      ) : (
        <p className="no-questions">No questions available for this category.</p>
      )}

      {/* Toggle Add Question Form */}
      <button
        onClick={() => setShowAddQuestionForm(!showAddQuestionForm)}
        className="toggle-add-question-btn"
      >
        {showAddQuestionForm ? 'Cancel' : 'Add a New Question'}
      </button>

      {showAddQuestionForm && (
        <div className="add-question-container">
          <h3>Add a New Question</h3>
          <input
            type="text"
            placeholder="Enter question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="question-input"
          />
          {newOptions.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="option-input"
            />
          ))}
          <input
            type="text"
            placeholder="Enter correct answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="correct-answer-input"
          />
          <button onClick={addQuestion} className="add-question-btn">Add Question</button>
        </div>
      )}
    </div>
  );
};

export default Questions;
