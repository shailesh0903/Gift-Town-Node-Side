const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    productArray: {
        type: Array,
        default: []
    },
    welfareAmount: {
        type: Number,
        default: 10
    },
    orderStatus: {
        type: String,
        enum: ['delivered', 'processing', 'cancelled', 'pending'],
        default: 'pending'
    },
    transactionId: {
        type: String,
        default: null
    }, 
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

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
