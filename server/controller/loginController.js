


const User = require('../database/userInfoSchema'); // Adjust the path to your User model
const jwt = require('jsonwebtoken'); // Import jwt

// Controller function to login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password directly (this is insecure, just for example)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' }); // Replace with your secret key

        res.cookie('token', token, {
            httpOnly: true,  // Prevent access by JavaScript
            secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
            sameSite: 'Strict',  // Prevent CSRF attacks
            maxAge: 3600000,  // 1 hour in milliseconds
        });
        res.status(200).json({
            message: 'Login successful',
            token, // Optional, if you want to return the token directly to the frontend
            userId: user.userId,
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};

module.exports = { loginUser };
