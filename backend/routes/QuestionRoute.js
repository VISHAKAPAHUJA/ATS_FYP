const express = require('express');
const router = express.Router();
const Question = require('../models/Question'); // Ensure the model path is correct

// 🚀 Add a Question
router.post('/questions', async (req, res) => {
    try {
        console.log("Received request data:", req.body);

        const { category, question, options, correctAnswer } = req.body;

        if (!category || !question || !options || !Array.isArray(options) || options.length < 2 || !correctAnswer) {
            return res.status(400).json({ success: false, message: "Invalid question data" });
        }

        const newQuestion = new Question({ category, question, options, correctAnswer });
        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion);
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// 🚀 Get Questions by Category
router.get('/questions', async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {}; // Apply filter if category is provided

        const questions = await Question.find(query);
        res.json(Array.isArray(questions) ? questions : []); // Ensure response is always an array
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// 🚀 Delete a Question
router.delete('/questions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuestion = await Question.findByIdAndDelete(id);

        if (!deletedQuestion) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        res.json({ success: true, message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
