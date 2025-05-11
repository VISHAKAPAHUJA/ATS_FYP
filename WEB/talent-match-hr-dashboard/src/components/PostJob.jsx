import { useState, useEffect } from 'react';
import { 
  FaHandshake, FaHome, FaBell, FaEnvelope, FaUser, 
  FaUserTie, FaPlusCircle, FaBriefcase, FaUsers, 
  FaChartBar, FaCalendarAlt, FaFileSignature, FaCog, 
  FaQuestionCircle, FaPlus, FaPaperPlane, FaHistory,
  FaTimes, FaCheckCircle, FaEdit, FaArchive, FaTrash,
  FaQuestionCircle as FaQuestion
} from 'react-icons/fa';
import JobQuestions from './JobQuestions';

const PostJob = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [postedJobs, setPostedJobs] = useState([]);
  const [viewingQuestionsForJob, setViewingQuestionsForJob] = useState(null);

  const [formData, setFormData] = useState({
    jobTitle: '',
    jobCategory: '',
    jobType: '',
    location: '',
    jobDescription: '',
    responsibilities: [],
    skills: [],
    qualifications: [],
    salaryRange: '',
    applicationDeadline: '',
    questions: []
  });

  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [qualificationInput, setQualificationInput] = useState('');

  // Update hidden textareas when lists change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      responsibilities: Array.from(document.querySelectorAll('#responsibilitiesList .item-tag span')).map(el => el.textContent.trim()),
      skills: Array.from(document.querySelectorAll('#skillsList .item-tag span')).map(el => el.textContent.trim()),
      qualifications: Array.from(document.querySelectorAll('#qualificationsList .item-tag span')).map(el => el.textContent.trim())
    }));
  }, [responsibilityInput, skillInput, qualificationInput]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const jobs = await response.json();
        setPostedJobs(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    
    fetchJobs();
  }, []);

  const addItem = (listId, value) => {
    if (value.trim() === '') return;

    const list = document.getElementById(listId);
    const itemId = Date.now();
    
    const item = document.createElement('div');
    item.className = 'item-tag fade-in';
    item.innerHTML = `
      <span>${value}</span>
      <button type="button" onClick="removeItem('${listId}', '${itemId}')">
        <FaTimes />
      </button>
    `;
    item.id = itemId;
    
    list.appendChild(item);

    // Clear the input
    if (listId === 'responsibilitiesList') {
      setResponsibilityInput('');
    } else if (listId === 'skillsList') {
      setSkillInput('');
    } else if (listId === 'qualificationsList') {
      setQualificationInput('');
    }
  };

  const removeItem = (listId, itemId) => {
    const item = document.getElementById(itemId);
    if (item) {
      item.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => {
        item.remove();
      }, 300);
    }
  };

  const addQuestion = () => {
    setQuestionCount(prev => prev + 1);
    const questionsContainer = document.getElementById('questionsContainer');
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'bg-primary/5 p-6 rounded-xl border border-primary/10 fade-in question-card';
    questionDiv.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h4 class="font-medium text-primary flex items-center">
          <FaQuestion className="mr-2" />
          <span>Question #${questionCount + 1}</span>
        </h4>
        <button type="button" class="text-red-500 hover:text-red-700 remove-question transition action-btn">
          <FaTimes />
        </button>
      </div>
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-700 mb-2">Question Text*</label>
        <input type="text" name="questionText[]" required 
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Option 1*</label>
          <div class="flex items-center">
            <span class="mr-2 text-primary">A.</span>
            <input type="text" name="option1[]" required 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Option 2*</label>
          <div class="flex items-center">
            <span class="mr-2 text-primary">B.</span>
            <input type="text" name="option2[]" required 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Option 3*</label>
          <div class="flex items-center">
            <span class="mr-2 text-primary">C.</span>
            <input type="text" name="option3[]" required 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Option 4*</label>
          <div class="flex items-center">
            <span class="mr-2 text-primary">D.</span>
            <input type="text" name="option4[]" required 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
          </div>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Correct Answer*</label>
        <select name="correctAnswer[]" required 
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
          <option value="">Select correct option</option>
          <option value="1">Option A</option>
          <option value="2">Option B</option>
          <option value="3">Option C</option>
          <option value="4">Option D</option>
        </select>
      </div>
    `;
    
    questionsContainer.appendChild(questionDiv);
    
    // Add event listener to the remove button
    questionDiv.querySelector('.remove-question').addEventListener('click', function() {
      questionDiv.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => {
        questionsContainer.removeChild(questionDiv);
        setQuestionCount(prev => prev - 1);
      }, 300);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Collect questions data from the form
      const questionElements = document.querySelectorAll('.question-card');
      const questions = Array.from(questionElements).map(card => {
        const questionText = card.querySelector('input[name="questionText[]"]').value;
        const options = [
          card.querySelector('input[name="option1[]"]').value,
          card.querySelector('input[name="option2[]"]').value,
          card.querySelector('input[name="option3[]"]').value,
          card.querySelector('input[name="option4[]"]').value
        ];
        const correctAnswer = parseInt(card.querySelector('select[name="correctAnswer[]"]').value);
  
        // Validate question data
        if (!questionText || options.some(opt => !opt)) {
          throw new Error('All question fields must be filled');
        }
        if (isNaN(correctAnswer) || correctAnswer < 1 || correctAnswer > 4) {
          throw new Error('Please select a valid correct answer for all questions');
        }
  
        return {
          questionText,
          options,
          correctAnswer
        };
      });
  
      // Create job data object
      const jobData = {
        title: formData.jobTitle,
        category: formData.jobCategory,
        type: formData.jobType,
        location: formData.location,
        description: formData.jobDescription,
        responsibilities: formData.responsibilities,
        skills: formData.skills,
        qualifications: formData.qualifications,
        salaryRange: formData.salaryRange,
        applicationDeadline: formData.applicationDeadline,
        questions: questions, // Send the full question objects
        status: "active"
      };
  
      console.log('Submitting job:', jobData);
  
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.message || 'Failed to post job');
      }
  
      // ... rest of your success handling code
      const newJob = await response.json();
      
      // Format the posted date for display
      const formattedJob = {
        ...newJob,
        posted: newJob.posted || new Date().toISOString()
      };
      
      setPostedJobs(prev => [formattedJob, ...prev]);
      showSuccessMessage();
       
      // Reset form
      setFormData({
        jobTitle: '',
        jobCategory: '',
        jobType: '',
        location: '',
        jobDescription: '',
        responsibilities: [],
        skills: [],
        qualifications: [],
        salaryRange: '',
        applicationDeadline: '',
        questions: []
      });
      setQuestionCount(0);
      document.getElementById('responsibilitiesList').innerHTML = '';
      document.getElementById('skillsList').innerHTML = '';
      document.getElementById('qualificationsList').innerHTML = '';
      document.getElementById('questionsContainer').innerHTML = '';
      
    
    } catch (error) {
      console.error('Error posting job:', error);
      // Show error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-bounce';
      errorDiv.innerHTML = `
        <FaTimes className="text-xl" />
        <span>${error.message || 'Failed to post job. Please try again.'}</span>
      `;
      document.body.appendChild(errorDiv);
      
      setTimeout(() => {
        errorDiv.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => {
          document.body.removeChild(errorDiv);
        }, 500);
      }, 3000);
    }
  };


  const showSuccessMessage = () => {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-bounce';
    successDiv.innerHTML = `
      <FaCheckCircle className="text-xl" />
      <span>Job posted successfully!</span>
    `;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => {
        document.body.removeChild(successDiv);
      }, 500);
    }, 3000);
  };

  const editJob = (id) => {
    const job = postedJobs.find(job => job._id === id);
    if (job) {
      setFormData({
        jobTitle: job.title,
        jobCategory: job.category,
        jobType: job.type,
        location: job.location || '',
        jobDescription: job.description || '',
        responsibilities: job.responsibilities || [],
        skills: job.skills || [],
        qualifications: job.qualifications || [],
        salaryRange: job.salaryRange || '',
        applicationDeadline: job.applicationDeadline || '',
        questions: job.questions || []
      });
  
      // Update the lists
      const responsibilitiesList = document.getElementById('responsibilitiesList');
      responsibilitiesList.innerHTML = '';
      job.responsibilities?.forEach(resp => {
        addItem('responsibilitiesList', resp);
      });
      
      const skillsList = document.getElementById('skillsList');
      skillsList.innerHTML = '';
      job.skills?.forEach(skill => {
        addItem('skillsList', skill);
      });
      
      const qualificationsList = document.getElementById('qualificationsList');
      qualificationsList.innerHTML = '';
      job.qualifications?.forEach(qual => {
        addItem('qualificationsList', qual);
      });
  
      // Clear existing questions and repopulate
      const questionsContainer = document.getElementById('questionsContainer');
      questionsContainer.innerHTML = '';
      
      // Set questionCount to continue from existing questions
      const existingQuestionCount = job.questions?.length || 0;
      setQuestionCount(existingQuestionCount);
  
      // Add existing questions back to the form with validation
      job.questions?.forEach((question, index) => {
        // Skip if question is not properly formatted
        if (!question || !question.options || !Array.isArray(question.options)) {
          console.warn('Skipping malformed question at index', index);
          return;
        }
  
        const questionDiv = document.createElement('div');
        questionDiv.className = 'bg-primary/5 p-6 rounded-xl border border-primary/10 fade-in question-card';
        questionDiv.innerHTML = `
          <div class="flex justify-between items-center mb-4">
            <h4 class="font-medium text-primary flex items-center">
              <FaQuestion className="mr-2" />
              <span>Question #${index + 1}</span>
            </h4>
            <button type="button" class="text-red-500 hover:text-red-700 remove-question transition action-btn">
              <FaTimes />
            </button>
          </div>
          <div class="mb-5">
            <label class="block text-sm font-medium text-gray-700 mb-2">Question Text*</label>
            <input type="text" name="questionText[]" required 
              value="${question.questionText || ''}"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Option 1*</label>
              <div class="flex items-center">
                <span class="mr-2 text-primary">A.</span>
                <input type="text" name="option1[]" required 
                  value="${question.options[0] || ''}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Option 2*</label>
              <div class="flex items-center">
                <span class="mr-2 text-primary">B.</span>
                <input type="text" name="option2[]" required 
                  value="${question.options[1] || ''}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Option 3*</label>
              <div class="flex items-center">
                <span class="mr-2 text-primary">C.</span>
                <input type="text" name="option3[]" required 
                  value="${question.options[2] || ''}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Option 4*</label>
              <div class="flex items-center">
                <span class="mr-2 text-primary">D.</span>
                <input type="text" name="option4[]" required 
                  value="${question.options[3] || ''}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Correct Answer*</label>
            <select name="correctAnswer[]" required 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition">
              <option value="">Select correct option</option>
              <option value="1" ${question.correctAnswer === 1 ? 'selected' : ''}>Option A</option>
              <option value="2" ${question.correctAnswer === 2 ? 'selected' : ''}>Option B</option>
              <option value="3" ${question.correctAnswer === 3 ? 'selected' : ''}>Option C</option>
              <option value="4" ${question.correctAnswer === 4 ? 'selected' : ''}>Option D</option>
            </select>
          </div>
        `;
        
        questionsContainer.appendChild(questionDiv);
        
        // Add event listener to the remove button
        questionDiv.querySelector('.remove-question').addEventListener('click', function() {
          questionDiv.classList.add('opacity-0', 'transition-opacity', 'duration-300');
          setTimeout(() => {
            questionsContainer.removeChild(questionDiv);
            setQuestionCount(prev => prev - 1);
          }, 300);
        });
      });
      
      // Remove the job from the list
      setPostedJobs(prev => prev.filter(job => job._id !== id));
      
      // Show edit message
      const editDiv = document.createElement('div');
      editDiv.className = 'fixed top-6 right-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-bounce';
      editDiv.innerHTML = `
        <FaEdit className="text-xl" />
        <span>Editing job: ${job.title}</span>
      `;
      document.body.appendChild(editDiv);
      
      setTimeout(() => {
        editDiv.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => {
          document.body.removeChild(editDiv);
        }, 500);
      }, 3000);
    }
  };
  const archiveJob = (id) => {
    const job = postedJobs.find(job => job._id === id);
    if (!job) return;

    const updatedJobs = postedJobs.map(job => 
      job._id === id ? { ...job, status: job.status === 'archived' ? 'active' : 'archived' } : job
    );
    
    setPostedJobs(updatedJobs);
    
    const action = job.status === 'archived' ? 'unarchived' : 'archived';
    const archiveDiv = document.createElement('div');
    archiveDiv.className = 'fixed top-6 right-6 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-bounce';
    archiveDiv.innerHTML = `
      <FaArchive className="text-xl" />
      <span>Job ${action} successfully!</span>
    `;
    document.body.appendChild(archiveDiv);
    
    setTimeout(() => {
      archiveDiv.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => {
        document.body.removeChild(archiveDiv);
      }, 500);
    }, 3000);
  };

  const deleteJob = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this job?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
  
        const result = await response.json();
  
        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to delete from database');
        }
  
        // Only update state if backend deletion succeeded
        setPostedJobs(prev => prev.filter(job => job._id !== id));
  
        // Show success notification
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-bounce';
        successDiv.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>${result.message}</span>
        `;
        document.body.appendChild(successDiv);
  
        setTimeout(() => {
          successDiv.classList.add('opacity-0', 'transition-opacity', 'duration-300');
          setTimeout(() => {
            document.body.removeChild(successDiv);
          }, 300);
        }, 3000);
  
      } catch (error) {
        console.error('Delete error:', error);
        
        // Show error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-bounce';
        errorDiv.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span>${error.message}</span>
        `;
        document.body.appendChild(errorDiv);
  
        setTimeout(() => {
          errorDiv.classList.add('opacity-0', 'transition-opacity', 'duration-300');
          setTimeout(() => {
            document.body.removeChild(errorDiv);
          }, 300);
        }, 3000);
      }
    }
  };
  
  // Helper function for notifications
  const showNotification = (type, message) => {
    const icon = type === 'success' ? <FaCheckCircle /> : <FaTimes />;
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    
    const notification = document.createElement('div');
    notification.className = `fixed top-6 right-6 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-bounce`;
    notification.innerHTML = `
      ${icon.outerHTML}
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
  };

  const formatPostedDate = (dateString) => {
    if (!dateString) return "Unknown";
    if (dateString === "Just now") return dateString;
    
    try {
      const postedDate = new Date(dateString);
      if (isNaN(postedDate.getTime())) return "Unknown";
      
      const now = new Date();
      const diffInSeconds = Math.floor((now - postedDate) / 1000);
      
      if (diffInSeconds < 60) return "Just now";
      if (diffInSeconds < 120) return "1 minute ago";
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      if (diffInSeconds < 7200) return "1 hour ago";
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      if (diffInSeconds < 172800) return "1 day ago";
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    } catch (e) {
      console.error("Date formatting error:", e);
      return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <main className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 custom-shadow border border-gray-100">
              {/* Job Posting Form */}
              <form id="jobForm" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="md:col-span-1">
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                    <input 
                      type="text" 
                      id="jobTitle" 
                      name="jobTitle" 
                      required 
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <label htmlFor="jobCategory" className="block text-sm font-medium text-gray-700 mb-1">Job Category*</label>
                    <select 
                      id="jobCategory" 
                      name="jobCategory" 
                      required 
                      value={formData.jobCategory}
                      onChange={(e) => setFormData({...formData, jobCategory: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    >
                      <option value="">Select a category</option>
                      <option value="IT">Information Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">Human Resources</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-1">
                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
                    <select 
                      id="jobType" 
                      name="jobType" 
                      required 
                      value={formData.jobType}
                      onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    >
                      <option value="">Select job type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-1">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                    <input 
                      type="text" 
                      id="location" 
                      name="location" 
                      required 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
                    <textarea 
                      id="jobDescription" 
                      name="jobDescription" 
                      rows="4" 
                      required 
                      value={formData.jobDescription}
                      onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities*</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        id="responsibilityInput" 
                        value={responsibilityInput}
                        onChange={(e) => setResponsibilityInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('responsibilitiesList', responsibilityInput)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary transition" 
                        placeholder="Add responsibility" 
                      />
                      <button 
                        type="button" 
                        id="addResponsibilityBtn" 
                        onClick={() => addItem('responsibilitiesList', responsibilityInput)}
                        className="px-4 py-3 bg-primary text-white rounded-r-lg hover:bg-primary/90 transition"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2" id="responsibilitiesList"></div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills*</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        id="skillInput" 
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('skillsList', skillInput)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary transition" 
                        placeholder="Add skill" 
                      />
                      <button 
                        type="button" 
                        id="addSkillBtn" 
                        onClick={() => addItem('skillsList', skillInput)}
                        className="px-4 py-3 bg-primary text-white rounded-r-lg hover:bg-primary/90 transition"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2" id="skillsList"></div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications*</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        id="qualificationInput" 
                        value={qualificationInput}
                        onChange={(e) => setQualificationInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('qualificationsList', qualificationInput)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary transition" 
                        placeholder="Add qualification" 
                      />
                      <button 
                        type="button" 
                        id="addQualificationBtn" 
                        onClick={() => addItem('qualificationsList', qualificationInput)}
                        className="px-4 py-3 bg-primary text-white rounded-r-lg hover:bg-primary/90 transition"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2" id="qualificationsList"></div>
                  </div>
                  
                  <div className="md:col-span-1">
                    <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                    <input 
                      type="text" 
                      id="salaryRange" 
                      name="salaryRange" 
                      value={formData.salaryRange}
                      onChange={(e) => setFormData({...formData, salaryRange: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">Application Deadline*</label>
                    <input 
                      type="date" 
                      id="applicationDeadline" 
                      name="applicationDeadline" 
                      required 
                      value={formData.applicationDeadline}
                      onChange={(e) => setFormData({...formData, applicationDeadline: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Screening Questions</h3>
                  <button 
                    type="button" 
                    id="addQuestionBtn" 
                    onClick={addQuestion}
                    className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <FaPlus />
                    <span>Add Question</span>
                  </button>
                </div>
                
                <div id="questionsContainer" className="space-y-6">
                  {/* Questions will be added here dynamically */}
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition shadow-sm">
                    Save as Draft
                  </button>
                  <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-md hover:shadow-lg flex items-center space-x-2">
                    <FaPaperPlane />
                    <span>Post Job</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Recently Posted Jobs */}
            <div className="bg-white rounded-xl shadow-lg p-8 custom-shadow border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary/5">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Job Title</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Posted</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {postedJobs.map((job) => (
                      <tr key={job._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            {job.status === 'archived' ? (
                              <>
                                <span className="text-gray-400 line-through">{job.title}</span>
                                <span className="ml-2 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">Archived</span>
                              </>
                            ) : (
                              job.title
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatPostedDate(job.posted)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => editJob(job._id)} 
                            className="text-primary hover:text-primary/80 mr-3 action-btn"
                            title="Edit Job"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => archiveJob(job._id)} 
                            className="text-yellow-600 hover:text-yellow-800 mr-3 action-btn"
                            title={job.status === 'archived' ? 'Unarchive Job' : 'Archive Job'}
                          >
                            <FaArchive />
                          </button>
                          <button 
                            onClick={() => setViewingQuestionsForJob(job._id)}
                            className="text-purple-600 hover:text-purple-800 mr-3 action-btn"
                            title="View Questions"
                          >
                            <FaQuestionCircle />
                          </button>
                          <button 
                            onClick={() => deleteJob(job._id)} 
                            className="text-red-600 hover:text-red-800 action-btn"
                            title="Delete Job"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Modal */}
        {viewingQuestionsForJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <JobQuestions 
              jobId={viewingQuestionsForJob} 
              onClose={() => setViewingQuestionsForJob(null)}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default PostJob;