const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, company, phone } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, email, and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 6 characters'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User with this email already exists'
      });
    }

    // Create new user
    console.log('Creating user with data:', { name, email: email.toLowerCase(), company, phone });
    console.log('Database name:', require('mongoose').connection.name);
    console.log('Connection state:', require('mongoose').connection.readyState === 1 ? 'Connected' : 'Not Connected');
    
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      company: company || '',
      phone: phone || ''
    });

    console.log('User created successfully with ID:', user._id);
    console.log('User saved to database:', require('mongoose').connection.name);
    
    // Verify the user was saved
    const verifyUser = await User.findById(user._id);
    if (verifyUser) {
      console.log('✅ User verified in database');
    } else {
      console.error('❌ User not found after creation!');
    }

    // Don't send password back
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      phone: user.phone,
      createdAt: user.createdAt
    };

    res.status(201).json({
      status: 'success',
      message: 'Account created successfully',
      data: userResponse
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      console.error('Validation errors:', messages);
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: messages
      });
    }
    if (error.code === 11000) {
      console.error('Duplicate email error');
      return res.status(400).json({
        status: 'error',
        message: 'Email already exists'
      });
    }
    console.error('Server error during signup:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Error creating account',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Don't send password back
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      phone: user.phone,
      createdAt: user.createdAt
    };

    res.json({
      status: 'success',
      message: 'Login successful',
      data: userResponse
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error during login',
      error: error.message
    });
  }
});

module.exports = router;

