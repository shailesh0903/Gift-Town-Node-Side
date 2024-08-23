const config = require("../../config/auth.config");
const db = require("../../models");
const User = db.User; // Make sure this matches your model definition
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        // Count total number of users
        const count = await User.countDocuments({ isDeleted: false });

        if (count === 0) {
            // Log an error for debugging
            console.error("No users found in the database.");
            return responder.bad(res, {
                errors: [{
                    msg: 'No users found.',
                    code: 'Users.validation.not_found',
                    param: null
                }]
            });
        }

        // Fetch users with pagination, excluding deleted ones
        const data = await User.find({ isDeleted: false }).skip(skip).limit(limit).select('_id mobile_no cust_name contact_no address date_of_birth date_of_join referal_code refered_by is_approved').exec();

        // Format users data
        const newDataArray = data.map((item) => ({
            _id: item._id,
            mobile_no: item.mobile_no,
            cust_name: item.cust_name,
            contact_no: item.contact_no,
            address: item.address,
            date_of_birth: item.date_of_birth,
            date_of_join: item.date_of_join,
            referal_code: item.referal_code,
            refered_by: item.refered_by,
            is_approved: item.is_approved
        }));

        // Send formatted data as response
        return responder.success(res, { totalRecords: count, data: newDataArray });
    } catch (error) {
        // Log any unexpected errors
        console.error('Error fetching users:', error);
        return responder.handleInternalError(res, error);
    }
};
