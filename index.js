const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const authRoutes = require('./routes/auth');
const User = require("./models/User");

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// GET route to fetch all users (for testing - remove in production)
app.get("/api/users", async(req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

// check route
app.get("/", (req, res) => {
    res.json({ 
        message: "Authentication API is running",
        endpoints: {
            register: "POST /api/auth/register",
            login: "POST /api/auth/login"
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Database connection and server startup
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});





