import React, { useState, useEffect } from "react";
import "./JobForm.css";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";

Modal.setAppElement("#root");

function JobForm() {
  const [jobs, setJobs] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    location: "",
    brief: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 < jobs.length ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? jobs.length - 1 : prev - 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const addItem = (setter, list) => (e) => {
    e.preventDefault();
    const input = e.target.previousSibling.value.trim();
    if (input) {
      setter([...list, input]);
      e.target.previousSibling.value = "";
    }
  };

  const removeItem = (setter, list, index) => {
    setter(list.filter((_, i) => i !== index));
  };

  const handleEditJob = (job) => {
    setJobDetails({
      _id: job._id,
      title: job.title,
      location: job.location,
      brief: job.brief,
    });
    setResponsibilities(job.responsibilities || []);
    setQualifications(job.qualifications || []);
    setSkills(job.skills || []);
    setIsEditing(true);
  };

  const handleDeleteJob = (job) => {
    setJobToDelete(job);
    setModalIsOpen(true);
  };

  const confirmDeleteJob = async () => {
    try {
      await fetch(`http://localhost:5000/api/jobs/${jobToDelete._id}`, {
        method: "DELETE",
      });
      toast.success("Job Deleted");
      fetchJobs();
      setCurrentIndex(0);
    } catch {
      toast.error("Error deleting job");
    }
    setModalIsOpen(false);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();

    if (jobDetails.title && jobDetails.location && jobDetails.brief) {
      const updatedJob = {
        ...jobDetails,
        responsibilities,
        qualifications,
        skills,
      };

      try {
        const response = await fetch(
          `http://localhost:5000/api/jobs/${isEditing ? jobDetails._id : ""}`,
          {
            method: isEditing ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedJob),
          }
        );

        if (response.ok) {
          toast.success(`Job ${isEditing ? "Updated" : "Added"}`);
          fetchJobs();
          resetForm();
        }
      } catch {
        toast.error("Error saving job");
      }
    }
  };

  const resetForm = () => {
    setJobDetails({ title: "", location: "", brief: "" });
    setResponsibilities([]);
    setQualifications([]);
    setSkills([]);
    setIsEditing(false);
  };

  return (
    <div className="job-management">
      <div className="job-form-section">
        <h2>Job Details</h2>
        <form className="job-form" onSubmit={handleSaveJob}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Enter Job Title"
              value={jobDetails.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="location"
              placeholder="Choose Location"
              value={jobDetails.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="brief"
              placeholder="Enter Job Brief"
              value={jobDetails.brief}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <h3>Responsibilities</h3>
            {responsibilities.length === 0 && (
              <p className="no-items">No responsibilities added</p>
            )}
            <ul>
              {responsibilities.map((item, index) => (
                <li key={index}>
                  • {item}
                  <button
                    type="button"
                    onClick={() => removeItem(setResponsibilities, responsibilities, index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="add-item">
              <input type="text" placeholder="Add responsibility" />
              <button onClick={addItem(setResponsibilities, responsibilities)}>
                Add
              </button>
            </div>
          </div>

          <div className="form-group">
            <h3>Qualifications</h3>
            {qualifications.length === 0 && (
              <p className="no-items">No qualifications added</p>
            )}
            <ul>
              {qualifications.map((item, index) => (
                <li key={index}>
                  • {item}
                  <button
                    type="button"
                    onClick={() => removeItem(setQualifications, qualifications, index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="add-item">
              <input type="text" placeholder="Add qualification" />
              <button onClick={addItem(setQualifications, qualifications)}>
                Add
              </button>
            </div>
          </div>

          <div className="form-group">
            <h3>Skills</h3>
            {skills.length === 0 && (
              <p className="no-items">No skills added</p>
            )}
            <ul>
              {skills.map((item, index) => (
                <li key={index}>
                  • {item}
                  <button
                    type="button"
                    onClick={() => removeItem(setSkills, skills, index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="add-item">
              <input type="text" placeholder="Add skill" />
              <button onClick={addItem(setSkills, skills)}>Add</button>
            </div>
          </div>

          <button type="submit" className="save-btn">
            {isEditing ? "Update Job" : "Add Job"}
          </button>
        </form>
      </div>

      <div className="job-list-section">
        <h2>Added Jobs</h2>
        <div className="job-slider">
          <button className="arrow prev" onClick={prevSlide}>
            <FaArrowLeft />
          </button>

          <div className="job-cards-container">
            {jobs.length > 0 ? (
              <div className="job-card">
                <div className="job-card-header">
                  <h3>{jobs[currentIndex]?.title}</h3>
                  <p className="location">
                    <FaMapMarkerAlt /> {jobs[currentIndex]?.location}
                  </p>
                </div>

                <div className="job-card-body">
                  <div className="job-description">
                    <p>{jobs[currentIndex]?.brief}</p>
                  </div>
                </div>

                <div className="job-card-footer">
                  <button
                    onClick={() => handleEditJob(jobs[currentIndex])}
                    className="action-btn edit-btn"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteJob(jobs[currentIndex])}
                    className="action-btn delete-btn"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-jobs-placeholder">
                <div className="placeholder-icon">📋</div>
                <p>No job opportunities posted yet</p>
              </div>
            )}
          </div>

          <button className="arrow next" onClick={nextSlide}>
            <FaArrowRight />
          </button>
        </div>

        {jobs.length > 0 && (
          <div className="slider-indicator">
            {jobs.map((_, index) => (
              <span
                key={index}
                className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Delete?</h2>
        <p>Are you sure you want to delete the "{jobToDelete?.title}" position?</p>
        <div className="modal-buttons">
          <button onClick={() => setModalIsOpen(false)} className="cancel-btn">
            Cancel
          </button>
          <button onClick={confirmDeleteJob} className="confirm-btn">
            Delete Job
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default JobForm;