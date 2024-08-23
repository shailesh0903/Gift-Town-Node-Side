const { admin } = require('./admin'); // Path to your firebaseAdmin.js file

const registerUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Create user with email and password
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        console.log('Successfully created new user:', userRecord.uid);

        // Respond with success message or user data
        res.status(201).json({
            message: 'User registered successfully!',
            uid: userRecord.uid,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        // Respond with error message
        res.status(500).json({
            error: 'Failed to register user. Please try again later.',
        });
    }
};

module.exports = registerUser;
