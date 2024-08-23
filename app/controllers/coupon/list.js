const config = require("../../config/auth.config");
const db = require("../../models");
const Upload = db.upload;
const Coupon = db.Coupon;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
    let where = { isDeleted: false }; // Query condition to filter deleted documents
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        // Count total Coupons excluding deleted ones
        const count = await Coupon.countDocuments(where);
        
        // Find Coupons with pagination and filtering deleted ones
        const data = await Coupon.find(where)
            .skip(skip)
            .limit(limit)
            .select('code title discount discountType expirationDateString imageId')
            .exec();

        if (!data || data.length === 0) {
            return responder.bad(res, {
                errors: [{
                    msg: 'Products.validation.not_found',
                    code: 'Products.validation.not_found',
                    param: null
                }]
            });
        }

        const newDataArray = [];
        for (const coupon of data) {
            let url = '';
            if (coupon.imageId) {
                const uploadData = await Upload.findById(mongoose.Types.ObjectId(coupon.imageId));
                if (uploadData) {
                    url = uploadData.url;
                }
            }
            newDataArray.push({
                _id: coupon._id,
                code: coupon.code,
                title: coupon.title,
                discount: coupon.discount,
                expirationDateString: coupon.expirationDateString,
                discountType: coupon.discountType,
                url: url
            });
        }

        return responder.success(res, { totalRecords: count, data: newDataArray });
    } catch (err) {
        console.log(err);
        return responder.handleInternalError(res, err, next);
    }
};
