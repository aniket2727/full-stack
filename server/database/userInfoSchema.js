


const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for password
  },
  aadharCard: {
    type: String,
    required: true,
    unique: true, // Ensure Aadhar card number is unique
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10, // Minimum length for mobile number
    maxlength: 15, // Maximum length for mobile number
  },
  age: {
    type: Number,
    required: true,
    min: 0, // Minimum age
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  blockNumber: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Enum for gender options
  },
  birthDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // Automatically create `createdAt` and `updatedAt` fields
});

// Create a model based on the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
