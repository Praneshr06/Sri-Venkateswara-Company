const express = require('express');
const User = require('../models/User');
const Contact = require('../models/Contact');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'MongoDB Atlas'
  });
});

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      status: 'success',
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// GET user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      data: user
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user ID format'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// POST create new user
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required'
      });
    }

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User with this email already exists'
      });
    }

    const user = await User.create({ name, email });

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: messages
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Error creating user',
      error: error.message
    });
  }
});

// PUT update user
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'User with this email already exists'
        });
      }
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    user.updatedAt = Date.now();

    const updatedUser = await user.save();

    res.json({
      status: 'success',
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user ID format'
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: messages
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Error updating user',
      error: error.message
    });
  }
});

// DELETE user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user ID format'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Error deleting user',
      error: error.message
    });
  }
});

// Contact Form Endpoints

// Test endpoint to verify Contact model is loaded
router.get('/contact/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Contact endpoint is working',
    model: 'Contact model is loaded'
  });
});

// POST create new contact submission
router.post('/contact', async (req, res) => {
  try {
    console.log('Contact form submission received:', {
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      hasMessage: !!req.body.message
    });

    const { name, email, company, phone, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({
        status: 'error',
        message: 'Name, email, subject, and message are required'
      });
    }

    console.log('Creating contact in database...');
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: (company || '').trim(),
      phone: (phone || '').trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    console.log('Contact created successfully:', contact._id);

    res.status(201).json({
      status: 'success',
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject
      }
    });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      console.log('Validation errors:', messages);
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: messages
      });
    }
    
    console.error('Server error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Error submitting contact form',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET all contact submissions (for admin use)
router.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      status: 'success',
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching contact submissions',
      error: error.message
    });
  }
});

module.exports = router;

