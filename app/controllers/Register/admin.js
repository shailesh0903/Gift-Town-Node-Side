const admin = require('firebase-admin');
const serviceAccount = require('../middleware/send-otp-283f4-firebase-adminsdk-gkfeu-be8bd5a3c6.json'); // Update with your service account key path

let firebaseAdminInitialized = false;

const initializeFirebaseAdmin = () => {
    if (!firebaseAdminInitialized) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        firebaseAdminInitialized = true;
    }
};

module.exports = {
    admin,
    initializeFirebaseAdmin,
};
