const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Ensure this path is correct

// Get all jobs
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
