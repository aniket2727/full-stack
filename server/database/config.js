


const mongoose = require('mongoose');

// Replace with your MongoDB connection string using 127.0.0.1 instead of 'localhost'
const mongoURI = 'mongodb://127.0.0.1:27017/villagedevelopement';

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
    //   useNewUrlParser: true, // Recommended for parsing MongoDB connection strings
    //   useUnifiedTopology: true, // Helps with connection management
    
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Call the function to connect
connectDB();

module.exports = connectDB;
