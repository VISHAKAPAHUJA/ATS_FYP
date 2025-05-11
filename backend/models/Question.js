const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  questionText: { type: String, required: true },
  options: { 
    type: [String], 
    required: true,
    validate: [arrayLimit, '{PATH} must have exactly 4 options']
  },
  correctAnswer: { 
    type: Number, 
    required: true,
    min: 1,
    max: 4
  }
});

function arrayLimit(val) {
  return val.length === 4;
}

module.exports = mongoose.model('Question', questionSchema);