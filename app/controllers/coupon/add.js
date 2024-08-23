const config = require("../../config/auth.config");
const db = require("../../models");
const Coupon = db.Coupon;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    // name, marks, subjects

    // Check if the upload ID is provided in the request
    if (!req.body.uploadId) {
        return responder.bad(res, {
            data: [{
                msg: 'coupon.messages.uploadId_missing',
            }]
        });
    }

    const coupon = new Coupon({
        discountType: req.body.discountType,
        code: req.body.code,
        title: req.body.title,
        expirationDateString: req.body.expirationDateString,
        discount:req.body.discount,
        imageId: req.body.uploadId,
    });

    coupon.save((err, coupon) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else {
            console.log(coupon);

            if (coupon) {
                

                return responder.success(res, {
                    data: coupon
                });
            } else {
                return responder.bad(res, {
                    data: [{
                        msg: 'coupon.messages.create_err',
                    }]
                });
            }
        }
    });
};