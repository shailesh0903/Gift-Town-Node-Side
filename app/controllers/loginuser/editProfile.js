const jwt = require('jsonwebtoken');
const db = require("../../models");
const responder = require('../../libs/responder');

const Users = db.User;
const JWT_SECRET_KEY = 'your_secret_key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};

module.exports = async (req, res, next) => {
    authenticateToken(req, res, async () => {
        try {
            const userId = req.user.userId; // Retrieve user ID from the JWT token
            console.log("User ID from token:", userId);

            // Retrieve user from the database based on user ID
            const user = await Users.findById(userId);
            if (!user) {
                console.log("User not found in database.");
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
            console.error("Error:", error);
            return res.status(500).json({ error: 'Failed to update user profile.' });
        }
    });
};