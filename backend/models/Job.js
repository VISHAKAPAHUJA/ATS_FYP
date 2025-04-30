const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    brief: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    qualifications: { type: [String], default: [] },
    skills: { type: [String], default: [] }
}, { collection: "jobs" });  // 👈 Explicitly set collection name

module.exports = mongoose.model("Job", JobSchema);
