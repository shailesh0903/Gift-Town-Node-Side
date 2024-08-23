const config = require("../../config/auth.config");
const db = require("../../models");
const Banners = db.Banners;
var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');

module.exports = (req, res) => {
    const update = {
        isDeleted: true,
        updatedAt: Date.now(),
        // updatedBy: req.user._id
    };

    Banners.findOneAndUpdate({
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
                    msg: ( 'Banners.validation.not_found'),
                    code: 'Banners.validation.not_found',
                    param: null
                }]
            });
        }

        return responder.success(res, {
            data: [{
                msg:('Banners.messages.deleted'),
                code: 'Banners.messages.deleted',
                param: null
            }]
        });

    });

};