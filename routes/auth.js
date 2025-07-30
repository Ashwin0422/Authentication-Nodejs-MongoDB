const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegistration, validateLogin } = require('../middleware/validate');

const router = express.Router();

// Register a new user
router.post('/register', validateRegistration, async (req, res) => {
    try {
        const { username, gmail, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ username }, { gmail }] 
        });

        if (existingUser) {
            return res.status(400).json({ 
                error: 'User already exists with this username or email' 
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const user = new User({
            username,
            gmail,
            password: hashedPassword
        });

        const savedUser = await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: savedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Remove password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse,
            token
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            error: 'Error registering user',
            details: error.message 
        });
    }
});

// Login user
router.post('/login', validateLogin, async (req, res) => {
    try {
        const { gmail, password } = req.body;

        // Find user by email
        const user = await User.findOne({ gmail });
        if (!user) {
            return res.status(401).json({ 
                error: 'Invalid email or password' 
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                error: 'Invalid email or password' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id }, // payload
            process.env.JWT_SECRET, // secret key
            { expiresIn: '7d' } 
        );

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.json({
            message: 'Login successful',
            user: userResponse,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            error: 'Error logging in',
            details: error.message 
        });
    }
});

module.exports = router; 