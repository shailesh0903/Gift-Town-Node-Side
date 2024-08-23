const db = require("../../models");
const responder = require('../../libs/responder');

const Users = db.User;

// Route for editing user profile
module.exports = async (req, res, next) => {
  try {
    const userId = req.params._id; // Extract user ID from the request parameters

    // Retrieve user from the database based on user ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update user profile data
    // Example: Updating cust_name
    if (req.body.cust_name) {
      user.cust_name = req.body.cust_name;
    }

    // Example: Updating mobile_no
    if (req.body.mobile_no) {
      user.mobile_no = req.body.mobile_no;
    }

    // Save the updated user profile
    const updatedUser = await user.save();

    // Respond with success message and updated user data
    return responder.success(res, {
      data: updatedUser, // Send back the updated user data
      message: 'Profile updated successfully.',
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: 'Failed to update user profile.' });
  }
};
