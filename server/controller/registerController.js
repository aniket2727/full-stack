const User = require('../database/userInfoSchema'); // Import the User model
const redisClient = require('../database/redisClient'); // Import the Redis client

const createUser = async (req, res) => {
  const { email, mobile, aadharCard } = req.body; // Destructure the required fields from the request body

  try {
    console.log('Checking for cached data in Redis...');

    // Check Redis for cached user data
    const [cachedEmail, cachedMobile, cachedAadhar] = await Promise.all([
      redisClient.get(`user:${email}`),
      redisClient.get(`mobile:${mobile}`),
      redisClient.get(`aadhar:${aadharCard}`)
    ]);

    if (cachedEmail || cachedMobile || cachedAadhar) {
      return res.status(400).json({ message: 'Email, mobile number, or Aadhar card is already registered.' });
    }

    // Check MongoDB for existing records
    const [existingEmail, existingMobile, existingAadhar] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ mobile }),
      User.findOne({ aadharCard })
    ]);

    if (existingEmail) {
      // Use a string 'true' instead of boolean true
      await redisClient.set(`user:${email}`, 'true', { EX: 60 * 60 }); // Cache for 1 hour
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    if (existingMobile) {
      await redisClient.set(`mobile:${mobile}`, 'true', { EX: 60 * 60 }); // Cache for 1 hour
      return res.status(400).json({ message: 'Mobile number is already registered.' });
    }

    if (existingAadhar) {
      await redisClient.set(`aadhar:${aadharCard}`, 'true', { EX: 60 * 60 }); // Cache for 1 hour
      return res.status(400).json({ message: 'Aadhar card number is already registered.' });
    }

    // If all checks pass, create a new user
    const user = new User(req.body); // Create a new user instance with the request body
    await user.save(); // Save the user to the database

    // Cache the user information in Redis for quick access
    await redisClient.set(`user:${email}`, JSON.stringify(user), { EX: 60 * 60 }); // Cache the user data for 1 hour

    res.status(201).json(user); // Respond with the created user
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createUser,
};
