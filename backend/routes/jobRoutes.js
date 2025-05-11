const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Question = require('../models/Question');
// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/jobs/:id/questions
router.get('/:id/questions', async (req, res) => {
    try {
      console.log(`Fetching questions for job ${req.params.id}`);
      
      // Verify the job exists first
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      const questions = await Question.find({ jobId: req.params.id });
      console.log(`Found ${questions.length} questions`);
      
      res.json(questions);
    } catch (err) {
      console.error('Error fetching questions:', err);
      res.status(500).json({ 
        message: 'Failed to fetch questions',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  });
// Create a new job

router.post('/', async (req, res) => {
  try {
    // First create the job without questions
    const job = new Job({
      title: req.body.title,
      category: req.body.category,
      type: req.body.type,
      location: req.body.location,
      description: req.body.description,
      responsibilities: req.body.responsibilities,
      skills: req.body.skills,
      qualifications: req.body.qualifications,
      salaryRange: req.body.salaryRange,
      applicationDeadline: req.body.applicationDeadline,
      status: req.body.status || 'active'
    });

    const newJob = await job.save();

    // If there are questions, create them
    if (req.body.questions && req.body.questions.length > 0) {
      const questions = await Question.insertMany(
        req.body.questions.map(q => ({
          ...q,
          jobId: newJob._id
        }))
      );

      // Update job with question references
      newJob.questions = questions.map(q => q._id);
      await newJob.save();
    }

    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// In your backend route file
router.put('/api/jobs/:id', async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ success: true, data: updatedJob });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
// Update a job
router.patch('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Update fields that are passed in the request
    if (req.body.title) job.title = req.body.title;
    if (req.body.category) job.category = req.body.category;
    if (req.body.type) job.type = req.body.type;
    if (req.body.location) job.location = req.body.location;
    if (req.body.description) job.description = req.body.description;
    if (req.body.responsibilities) job.responsibilities = req.body.responsibilities;
    if (req.body.skills) job.skills = req.body.skills;
    if (req.body.qualifications) job.qualifications = req.body.qualifications;
    if (req.body.salaryRange) job.salaryRange = req.body.salaryRange;
    if (req.body.applicationDeadline) job.applicationDeadline = req.body.applicationDeadline;
    if (req.body.questions) job.questions = req.body.questions;
    if (req.body.status) job.status = req.body.status;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Archive/unarchive a job
router.patch('/:id/archive', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    job.status = job.status === 'archived' ? 'active' : 'archived';
    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a job
// Updated DELETE route
router.delete('/:id', async (req, res) => {
  try {
    // First find the job
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Delete associated questions first
    await Question.deleteMany({ jobId: req.params.id });

    // Then delete the job using deleteOne() or findByIdAndDelete()
    await Job.deleteOne({ _id: req.params.id });
    // Alternatively: await Job.findByIdAndDelete(req.params.id);

    res.json({ 
      success: true,
      message: 'Job and associated questions deleted successfully',
      deletedId: req.params.id
    });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete job',
      error: err.message 
    });
  }
});
module.exports = router;