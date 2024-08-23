// firebaseAdmin.js

const admin = require('firebase-admin');

const serviceAccount = require('../middleware/send-otp-283f4-firebase-adminsdk-gkfeu-be8bd5a3c6.json'); // Replace with the path to your service account key JSON file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Optional: Add more Firebase configs if needed
});

module.exports = admin;
