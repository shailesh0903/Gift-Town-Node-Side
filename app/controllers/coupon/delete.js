const config = require("../../config/auth.config");
const db = require("../../models");
const Coupon = db.Coupon;
// var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 const Contest = db.contests;



module.exports = (req, res,next) => {
    const update = {
        isDeleted: true,
        updatedAt: Date.now(),
        
    };


   

            // return false

            Coupon.findOneAndUpdate({
                _id: req.params._id,
                isDeleted: false
            }, {
                $set: update
            }, {
                upsert: false
            }).exec(function (err, item) {
                if (err) {
                    return responder.handleInternalError(res, err, next);
                } else if (!item) {
                    return responder.bad(res, {
                        errors: [{
                            msg: ( 'Coupon.validation.not_found'),
                            code: 'Coupon.validation.not_found',
                            param: null
                        }]
                    });
                }

                return responder.success(res, {
                    data: [{
                        msg:( 'Coupon.messages.deleted'),
                        code: 'Coupon.messages.deleted',
                        param: null
                    }]
                });
            });

        } 


