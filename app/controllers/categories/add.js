const config = require("../../config/auth.config");
const db = require("../../models");
const Categories = db.Categories;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    // name, marks, subjects

    // Check if the upload ID is provided in the request
    if (!req.body.uploadId) {
        return responder.bad(res, {
            data: [{
                msg: 'Subject.messages.uploadId_missing',
            }]
        });
    }

    const categories = new Categories({
        cat_name: req.body.cat_name,
        brandId: mongoose.Types.ObjectId(req.body.brandId),
        banner_id: req.body.banner_id,
        imageId: req.body.uploadId,
        tag:req.body.tag
    });

    categories.save((err, categories) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else {
            console.log(categories);

            if (categories) {
                

                return responder.success(res, {
                    data: categories
                });
            } else {
                return responder.bad(res, {
                    data: [{
                        msg: 'categories.messages.create_err',
                    }]
                });
            }
        }
    });
};