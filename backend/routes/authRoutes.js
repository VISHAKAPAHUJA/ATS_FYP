// authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Generate JWT token (if using authentication)
        const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });

        res.status(200).json({ success: true, message: "Logged in successfully", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
    }
});

// Export router
module.exports = router;
