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


//importing the routes
const userRoutes=require('./routes/registerRoute');



// Use the user routes
app.use('/api', userRoutes); // All user-related routes will start with /api/users


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
