const express = require('express');
const cors = require('cors');
const connectDB = require('./database/config'); // Import the database connection function

const app = express();
const port = 9009;

// Connect to the MongoDB database
connectDB();

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true, // Allow cookies and credentials
};

// Enable CORS with the defined options
app.use(cors(corsOptions));

// Handle preflight requests explicitly for all routes
app.options('*', cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Importing the routes
const userRoutes = require('./routes/registerRoute');
const loginRoutes = require('./routes/loginRouter');
const projectDetailsRoutes = require('./routes/projectDetailsRoutes');
const issueDetailsRoutes = require('./routes/issueDetailsRouter');

// Use the user routes
app.use('/api', userRoutes);
app.use('/api', loginRoutes);
app.use('/api', projectDetailsRoutes);
app.use('/api', issueDetailsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
