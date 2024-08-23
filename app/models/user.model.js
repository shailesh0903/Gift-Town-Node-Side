

const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    crypto = require('crypto');


const User = mongoose.model(
    "User",
    new mongoose.Schema({
        mobile_no: {
            type: String
        },
        password: {
            type: String
        },
        cust_name: {
            type: String
        },
        contact_no: {
            type: Number
        },
        address: {
            type: String
        },
        date_of_birth: {
            type: Number
        },
        device_token: { type: String, default: null },
        date_of_join: {
            type: Number
        },
        referal_code: {
            type: Number
        },
        refered_by: {
            type: String
        },
        is_approved: {
            type: Boolean,
            default: false // You can set a default value if needed
        },
        jwtToken: {
            type: String,
            default: null
        },
        createdAt: {
            type: Date,
            index: true,
            default: Date.now
        },

        updatedAt: {
            type: Date,
            required: false,
            index: true,
            default: Date.now
        },

        isDeleted: {
            type: Boolean,
            index: true,
            default: false
        },
        isActive: {
            type: Boolean,
            index: true,
            default: true
        }

    })

);

// const upload = multer({ storage: storage });
module.exports = User;