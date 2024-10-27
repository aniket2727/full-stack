


const express = require('express');
const { createUser } = require('../controller/registerController'); // Import the createUser controller

const router = express.Router();

// Route to create a new user
router.post('/register', createUser); // Use the createUser controller for this route

module.exports = router; // Export the router
