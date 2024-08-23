const config = require("../../config/auth.config");
const db = require("../../models");
const Brand = db.Brand;
var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');

module.exports = (req, res) => {
    const update = {
        isDeleted: true,
        updatedAt: Date.now(),
        updatedBy: req.user_id
    };

    Brand.findOneAndUpdate({
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
                    msg: ( 'brand.validation.not_found'),
                    code: 'brand.validation.not_found',
                    param: null
                }]
            });
        }

        return responder.success(res, {
            data: [{
                msg:('brand.messages.deleted'),
                code: 'brand.messages.deleted',
                param: null
            }]
        });

    });

};