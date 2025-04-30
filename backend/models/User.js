const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
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
    // For password reset (ADD THESE NEW FIELDS)
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
module.exports = mongoose.model('User', UserSchema);