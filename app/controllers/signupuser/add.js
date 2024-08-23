// Import necessary modules
const db = require("../../models");
const responder = require('../../libs/responder');
const bcrypt = require("bcryptjs");
const Users = db.User;

module.exports = async (req, res, next) => {
  try {
    // Log request body data for debugging
    console.log("Request Body:", req.body);

    // Validate mobile number and password
    const { mobile_no, password, cust_name } = req.body;
    if (!mobile_no && !password && !cust_name) {
      return res.status(400).json({ error: 'Mobile number and password and cust_name are required.' });
    }

    if (!cust_name) {
      return res.status(400).json({ error: 'Cust_Name is required.' });
    }

    // Validate mobile number
    if (!mobile_no) {
      return res.status(400).json({ error: 'Mobile number is required.' });
    }
    // Validate mobile number length
    if (mobile_no.length !== 10) {
      return res.status(400).json({ error: 'Mobile number must be exactly 10 digits long.' });
    }

    // Validate password
    if (!password) {
      return res.status(400).json({ error: 'Password is required.' });
    }
    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }
    // You can add more password validation rules here

    // Check if user already exists
    const existingUser = await Users.findOne({ mobile_no: mobile_no });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user with hashed password
    const newUser = new Users({
      mobile_no,
      password: hashedPassword,// Save the hashed password
      cust_name
    });

    // Save the user in the database
    await newUser.save();

    // Respond with success message and user data
    return responder.success(res, {
      data: newUser,
      message: 'User created successfully.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to create user.' });
  }
};
