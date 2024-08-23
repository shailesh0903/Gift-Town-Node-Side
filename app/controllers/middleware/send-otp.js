const admin = require("firebase-admin");
const serviceAccount = require("./send-otp-283f4-firebase-adminsdk-gkfeu-be8bd5a3c6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendNotif = async (token, title, body, appointmentId) => {
    try {
        if (!token || typeof token !== 'string') {
            throw new Error('Invalid FCM token provided');
        }
        console.log(token);
        const message = {
            notification: {
                title: title,
                body: body,
            },
            android: {
                notification: {
                    sound: "default",
                },
                data: {
                    // title: title,
                    // body: body,
                    appointment_id: appointmentId, // Add the appointment ID here
                },
            },
            token: token,
        };
        const response = await admin.messaging().send(message);
        console.log("Successfully sent message:", response);
    } catch (error) {
        if (error.code === 'messaging/registration-token-not-registered') {
            console.error("FCM token is no longer valid:", error.message);
            // Handle invalid token, e.g., remove it from the database or mark it as invalid
        } else {
            console.error("Error sending message:", error.message);
        }
        throw error;
    }
};

module.exports = sendNotif;