const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  cvPath: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['submitted', 'reviewed', 'rejected', 'accepted'],
    default: 'submitted'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);