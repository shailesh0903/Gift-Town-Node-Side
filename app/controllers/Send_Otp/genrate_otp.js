const Vendor = require("../../models/user.model");

const admin = require('./admin'); // Path to your firebaseAdmin.js file
const { Messaging } = require("firebase-admin");

// Function to generate a random OTP (for simulation purposes)
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
}

// Exporting function to send OTP
module.exports = async (req, res, next) => {
    const vendorId = req.body._id;

    try {
        if (!vendorId) {
            throw new Error('Vendor ID is required');
        }

        const vendor = await Vendor.findById(vendorId);

        if (!vendor) {
            throw new Error('Vendor not found');
        }

        const token = vendor.jwtToken;

        if (!token || typeof token !== 'string') {
            throw new Error('Invalid FCM token provided');
        }

        // Generate OTP
        const otp = generateOTP();
        const message = `Your OTP for verification is: ${otp}`;

        // Simulate SMS sending (replace with actual Firebase Cloud Messaging logic)
        console.log(`Sending SMS to ${vendor.mobile_no}: ${message}`); // Assuming vendor has mobile_no field

        // Example using Firebase Admin SDK (uncomment and adapt as needed)
        await admin.messaging().send({
            data: {
                otp: otp,
            },
            token: token, // Ensure `token` is a valid FCM registration token
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        res.status(500).json({ error: error.message });
    }
};

