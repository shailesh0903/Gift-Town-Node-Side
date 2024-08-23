// Import necessary modules
const db = require("../../models");
const responder = require('../../libs/responder');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authMiddleware = require('./getProfile');

const Users = db.User;

module.exports = async (req, res, next) => {
  try {
    // Log request body data for debugging
    console.log("Login API Request Body:", req.body);

    // Validate mobile number and password
    const { mobile_no, password } = req.body;
    if (!mobile_no || !password) {
      return res.status(400).json({ error: 'Mobile number and password are required.' });
    }

    // Validate mobile number length
    if (mobile_no.length !== 10) {
      return res.status(400).json({ error: 'Mobile number must be exactly 10 digits long.' });
    }

    // Find user by mobile number
    const user = await Users.findOne({ mobile_no });
    if (!user) {
      console.log("User not found.");
      return res.status(401).json({ error: 'User not found.' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password.");
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Password is valid, generate JWT token
    const token = generateJwtToken(user);
    console.log("JWT Token:", token);

    // Respond with success message, token, and user data
    return responder.success(res, {
      data: { 
        token,
        user: {
          _id: user._id,
          cust_name:user.cust_name,
          mobile_no:user.mobile_no,
          password:user.password
         
      
          // Add any other user data you want to include
        }
      },
      message: 'Login successful.',
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: 'Failed to authenticate user.' });
  }
};

// Function to generate JWT token
function generateJwtToken(user) {
  // Generate JWT token with user ID
  const token = jwt.sign({ userId: user._id, cust_name:user.cust_name, mobile_no:user.mobile_no,password:user.password }, 'your_secret_key', { expiresIn: '1h' });
  return token;
}
