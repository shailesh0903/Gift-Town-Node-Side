const firebase = require('firebase/app');
require('firebase/messaging');


const firebaseConfig = {
    apiKey: "AIzaSyDGFvfOwyjkbRFfPE8diF48dpsDCeF2I_A",
    authDomain: "send-otp-283f4.firebaseapp.com",
    projectId: "send-otp-283f4",
    storageBucket: "send-otp-283f4.appspot.com",
    messagingSenderId: "1048189944181",
    appId: "1:1048189944181:web:1a7f5e1225e3661c98933c",
    measurementId: "G-XJBR6B774C"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.getToken({ vapidKey: 'BMuLQZe5ft3kyuIA8Zwnww3zfNUZq8CNJO-2gkZL59ExrHdD7wWYjOjKX7zZK1FyV0KnpTUVUn0Vhbt0XWKMs_U' }).then((currentToken) => {
    if (currentToken) {
        // Send `currentToken` to your server along with the phone number
        sendTokenToServer(currentToken);
    } else {
        console.log('No registration token available.');
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});

function sendTokenToServer(token) {
    // Example code to send `token` to your server via HTTP request
    fetch('/api/save-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    })
        .then(response => {
            if (response.ok) {
                console.log('Token sent to server successfully.');
            } else {
                console.error('Failed to send token to server.');
            }
        })
        .catch(error => {
            console.error('Error sending token to server:', error);
        });
}