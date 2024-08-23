const config = require("../../config/auth.config");
const db = require("../../models");
const Banners = db.Banners;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    // name, marks, subjects

    // Check if the upload ID is provided in the request
    if (!req.body.uploadId) {
        return responder.bad(res, {
            data: [{
                msg: 'Banners.messages.uploadId_missing',
            }]
        });
    }

    const banners = new Banners({
        title: req.body.title,
        index_no: req.body.index_no,
        imageId: req.body.uploadId,
    });

    banners.save((err, banners) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else {
            console.log(banners);

            if (banners) {
                

                return responder.success(res, {
                    data: banners
                });
            } else {
                return responder.bad(res, {
                    data: [{
                        msg: 'banners.messages.create_err',
                    }]
                });
            }
        }
    });
};