const mongoose = require('mongoose');

const connectDB = async () => {
  // Use local MongoDB if MONGODB_URI is not set
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sri-venkateswara';
  
  if (!process.env.MONGODB_URI) {
    console.log('📝 MONGODB_URI not found, using local MongoDB');
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      // These options are no longer needed in Mongoose 6+, but kept for compatibility
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Not Connected'}`);
    
    // Test the connection by checking if we can access collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📁 Available Collections: ${collections.length > 0 ? collections.map(c => c.name).join(', ') : 'None (will be created on first insert)'}`);
    
    return conn;
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    console.error('\n💡 Troubleshooting tips:');
    console.error('   1. Make sure MongoDB is running locally');
    console.error('   2. Check if MONGODB_URI in .env file is correct');
    console.error('   3. Make sure you replaced <db_password> with your actual password');
    console.error('   4. Verify your IP address is whitelisted in MongoDB Atlas');
    console.error('   5. Check your internet connection');
    console.error('\n📖 See backend/SETUP.md for detailed setup instructions\n');
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB connection error: ${err}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;

