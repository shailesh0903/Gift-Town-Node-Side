const config = require("../../config/auth.config");
const db = require("../../models");
const Brand = db.Brand;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    // name, marks, subjects

    // Check if the upload ID is provided in the request
    if (!req.body.uploadId) {
        return responder.bad(res, {
            data: [{
                msg: 'Brand.messages.uploadId_missing',
            }]
        });
    }

    const brand = new Brand({
        brand_name: req.body.brand_name,
        thumbnail_id: req.body.thumbnail_id,
        imageId: req.body.uploadId,
    });

    brand.save((err, brand) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else {
            console.log(brand);

            if (brand) {
                

                return responder.success(res, {
                    data: brand
                });
            } else {
                return responder.bad(res, {
                    data: [{
                        msg: 'brand.messages.create_err',
                    }]
                });
            }
        }
    });
};