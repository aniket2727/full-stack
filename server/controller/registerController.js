


const User = require('../database/userInfoSchema'); // Import the User model
const redisClient = require('../database/redisClient'); // Import the Redis client

// Controller for creating a new user
const createUser = async (req, res) => {
  const { email, mobile, aadharCard } = req.body; // Destructure the required fields from the request body

  try {
    // Check Redis for existing user data (this is just an example; adjust according to your needs)
    const cachedEmail = await redisClient.get(`user:${email}`);
    const cachedMobile = await redisClient.get(`mobile:${mobile}`);
    const cachedAadhar = await redisClient.get(`aadhar:${aadharCard}`);

    if (cachedEmail || cachedMobile || cachedAadhar) {
      return res.status(400).json({ message: 'Email, mobile number, or Aadhar card is already registered.' });
    }

    // Check if the email already exists in MongoDB
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      await redisClient.set(`user:${email}`, true, { EX: 60 * 60 }); // Cache for 1 hour
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Check if the mobile number already exists in MongoDB
    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      await redisClient.set(`mobile:${mobile}`, true, { EX: 60 * 60 }); // Cache for 1 hour
      return res.status(400).json({ message: 'Mobile number is already registered.' });
    }

    // Check if the Aadhar card number already exists in MongoDB
    const existingAadhar = await User.findOne({ aadharCard });
    if (existingAadhar) {
      await redisClient.set(`aadhar:${aadharCard}`, true, { EX: 60 * 60 }); // Cache for 1 hour
      return res.status(400).json({ message: 'Aadhar card number is already registered.' });
    }

    // If all checks pass, create a new user
    const user = new User(req.body); // Create a new user instance with the request body
    await user.save(); // Save the user to the database

    // Optionally, you can cache the user information in Redis for quick access
    await redisClient.set(`user:${email}`, JSON.stringify(user), { EX: 60 * 60 }); // Cache for 1 hour

    res.status(201).json(user); // Respond with the created user
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createUser,
};
