const config = require("../../config/auth.config");
const db = require("../../models");
const Address = db.Address;
// var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 const Contest = db.contests;



module.exports = (req, res,next) => {
    const update = {
        isDeleted: true,
        updatedAt: Date.now(),
        
    };

            Address.findOneAndUpdate({
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
                            msg: ( 'address.validation.not_found'),
                            code: 'address.validation.not_found',
                            param: null
                        }]
                    });
                }

                return responder.success(res, {
                    data: [{
                        msg:( 'address.messages.deleted'),
                        code: 'address.messages.deleted',
                        param: null
                    }]
                });
            });

        } 


