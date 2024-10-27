const express = require('express');
const cors = require('cors');
const connectDB = require('./database/config'); // Import the database connection function

const app = express();
const port = 9009;

// Connect to the MongoDB database
connectDB();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Sample GET route that returns a simple JSON response
app.get('/api/data', (req, res) => {
  res.json({
    message: 'Hello, this is your data!',
    success: true
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
