const express = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');

const router = express.Router();

// Test database connection and operations
router.get('/test', async (req, res) => {
  try {
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    const dbInfo = {
      connectionState: states[connectionState] || 'unknown',
      host: mongoose.connection.host,
      database: mongoose.connection.name,
      isConnected: connectionState === 1
    };

    // Try to count users
    let userCount = 0;
    try {
      userCount = await User.countDocuments();
    } catch (err) {
      console.error('Error counting users:', err);
    }

    // Try to find one user
    let sampleUser = null;
    try {
      sampleUser = await User.findOne();
    } catch (err) {
      console.error('Error finding user:', err);
    }

    res.json({
      status: 'success',
      database: dbInfo,
      userCount: userCount,
      sampleUser: sampleUser ? {
        id: sampleUser._id,
        name: sampleUser.name,
        email: sampleUser.email
      } : null,
      message: connectionState === 1 ? 'Database is connected and working' : 'Database connection issue'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error testing database',
      error: error.message
    });
  }
});

module.exports = router;

