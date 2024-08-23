const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    userId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Assuming there's a 'User' model referenced here
    },
    street_no: String,
    street_name: String,
    street_area: String, // New field: street_area
    pincode: String,     // New field: pincode
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
