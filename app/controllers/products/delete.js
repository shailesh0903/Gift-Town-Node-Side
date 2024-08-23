const config = require("../../config/auth.config");
const db = require("../../models");
const Products = db.Products;
// var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 const Contest = db.contests;



module.exports = (req, res,next) => {
    const update = {
        isDeleted: true,
        updatedAt: Date.now(),
        
    };


   

            // return false

            Products.findOneAndUpdate({
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
                            msg: ( 'Products.validation.not_found'),
                            code: 'Products.validation.not_found',
                            param: null
                        }]
                    });
                }

                return responder.success(res, {
                    data: [{
                        msg:( 'Products.messages.deleted'),
                        code: 'Products.messages.deleted',
                        param: null
                    }]
                });
            });

        } 

        



    // mongoose.models.User.count({
    //     state: req.params._id,
    //     isDeleted: false
    // }).exec(function(err, count) {
    //     if(err) {
    //         return responder.handleInternalError(res, err, next);
    //     } else if (count > 0) {

    //         return responder.bad(res, {
    //             errors: [{
    //                 msg: translation.translate(req, 'companies.validation.existed_in_districts', {count: count}),
    //                 data: {count: count},
    //                 code: 'companies.validation.existed_in_districts',
    //                 param: null
    //             }]
    //         });
    //     } else {

    //         var update = {
    //             isDeleted: true,
    //             updatedAt: Date.now(),
    //             updatedBy: req.user._id
    //         };
    //         mongoose.models.Company.findOneAndUpdate({
    //             _id: req.params._id,
    //             isDeleted: false
    //         }, {
    //             $set: update
    //         }, {
    //             upsert: false
    //         }).exec(function(err, item) {

    //             if(err) {
    //                 return responder.handleInternalError(res, err, next);
    //             } else if(!item) {
    //                 return responder.bad(res, {
    //                     errors: [{
    //                         msg: translation.translate(req, 'companies.validation.not_found'),
    //                         code: 'companies.validation.not_found',
    //                         param: null
    //                     }]
    //                 });
    //             }

    //             return responder.success(res);
    //         });
    //     }
    // });

