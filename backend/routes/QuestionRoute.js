const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions for a job
router.get('/job/:jobId', async (req, res) => {
  try {
    const questions = await Question.find({ jobId: req.params.jobId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new question (or multiple questions)
router.post('/', async (req, res) => {
  try {
    // Handle single question or array of questions
    if (Array.isArray(req.body)) {
      const questions = await Question.insertMany(req.body);
      res.status(201).json(questions);
    } else {
      const question = new Question(req.body);
      const newQuestion = await question.save();
      res.status(201).json(newQuestion);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a question
router.patch('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    if (req.body.questionText) question.questionText = req.body.questionText;
    if (req.body.options) question.options = req.body.options;
    if (req.body.correctAnswer) question.correctAnswer = req.body.correctAnswer;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a question
router.delete('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    await question.remove();
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;