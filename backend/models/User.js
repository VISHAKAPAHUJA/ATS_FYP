const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Make sure to require jwt if using it

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    username: {  // New username field
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    password: { 
        type: String, 
        required: true 
    },
    // For email verification
    verificationCode: {
        type: String,
        length: 6
    },
    verificationCodeExpires: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // For password reset
    resetPasswordCode: {
        type: String,
        default: null
    },
    resetPasswordCodeExpires: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    // Only hash if it's a new user or password is modified
    if (!this.isModified('password')) return next();
    
    try {
        // Skip hashing if already hashed
        if (this.password.startsWith('$2a$')) return next();
        
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Add to User.js after the pre-save hook
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  return token;
};

module.exports = mongoose.model('User', UserSchema);