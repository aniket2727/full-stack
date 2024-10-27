
const express = require('express');
const { loginUser } = require('../controller/loginController'); // Adjust the path to your login controller

const router = express.Router();

// Route to login a user
router.post('/login', loginUser); // Use the loginUser controller for this route

module.exports = router; // Export the router
