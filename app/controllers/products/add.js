const config = require("../../config/auth.config");
const db = require("../../models");
const Products = db.Products;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    // name, marks, subjects

    // Check if the upload ID is provided in the request
    if (!req.body.uploadId) {
        return responder.bad(res, {
            data: [{
                msg: 'Products.messages.uploadId_missing',
            }]
        });
    }

    const products = new Products({
        brandId:mongoose.Types.ObjectId(req.body.brandId),
        sub_cat_Id: mongoose.Types.ObjectId(req.body.sub_cat_Id),
        categoriesId:mongoose.Types.ObjectId(req.body.categoriesId),
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        discount_price: req.body.discount_price,
        description: req.body.description,
        img_1_url: req.body.img_1_url,
        img_2_url: req.body.img_2_url,
        imageId: req.body.uploadId,
    });

    products.save((err, products) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else {
            console.log(products);

            if (products) {
                

                return responder.success(res, {
                    data: products
                });
            } else {
                return responder.bad(res, {
                    data: [{
                        msg: 'Products.messages.create_err',
                    }]
                });
            }
        }
    });
};