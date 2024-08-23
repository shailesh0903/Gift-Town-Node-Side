const config = require("../../config/auth.config");
const db = require("../../models");
const Sub_cat = db.Sub_cat;
// var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 const Contest = db.contests;



module.exports = (req, res,next) => {
    const update = {
        isDeleted: true,
        updatedAt: Date.now(),
        
    };


   

            // return false

            Sub_cat.findOneAndUpdate({
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
                            msg: ( 'Sub_cat.validation.not_found'),
                            code: 'Sub_cat.validation.not_found',
                            param: null
                        }]
                    });
                }

                return responder.success(res, {
                    data: [{
                        msg:( 'Sub_cat.messages.deleted'),
                        code: 'Sub_cat.messages.deleted',
                        param: null
                    }]
                });
            });

        } 


