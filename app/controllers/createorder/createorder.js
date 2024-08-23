const responder = require('../../libs/responder');
const Razorpay = require('razorpay');
const db = require("../../models");
const Order = db.Order;

// Create an instance of Razorpay
const razorpay = new Razorpay({
    key_id: 'rzp_test_yIB88pndVnwuL3',
    key_secret: '1RDzi7Qe22MtWsVdycs6rBAw'
});

module.exports = (req, res, next) => {
    // Generate a transaction ID (example: using a timestamp)
    const transactionId = Date.now().toString(); 

    const order = new Order({
        productArray: req.body.productArray,
        welfareAmount: req.body.welfareAmount,
        transactionId: transactionId // Include transactionId in the order
    });

    order.save((err, savedOrder) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else {
            // Assuming you have a price field in your request or a fixed price
            const amount = req.body.amount || 100; // Default amount 100 paisa

            const options = {
                amount: amount * 100, // amount in paisa
                currency: "INR", // Currency code
                receipt: `order${savedOrder._id}`, // Unique receipt ID
                payment_capture: 1 // Auto capture payment
            };

            // Create an order using Razorpay API
            razorpay.orders.create(options, (err, razorpayOrder) => {
                if (err) {
                    return responder.handleInternalError(res, err, next);
                } else {
                    // If order created successfully, return order ID
                    savedOrder.razorpayOrderId = razorpayOrder.id;
                    savedOrder.orderStatus = 'delivered'; // Update order status to "delivered"
                    savedOrder.save((err, updatedOrder) => {
                        if (err) {
                            return responder.handleInternalError(res, err, next);
                        } else {
                            return responder.success(res, {
                                data: [{
                                    msg: 'order.messages.created',
                                    orderId: updatedOrder._id,
                                    razorpayOrderId: razorpayOrder.id,
                                    transactionId: transactionId // Include transactionId in the response
                                }]
                            });
                        }
                    });
                }
            });
        }
    });
};
