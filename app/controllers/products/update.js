const config = require("../../config/auth.config");
const db = require("../../models");
const Products = db.Products;
var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res, next) => {
    
    console.log("req.body?.country",req.body?.country)

    let update = {}
    update.updatedAt = Date.now()
   if(req.body.brandId){
    update.brandId=req.body.brandId;
   }
   if(req.body.sub_cat_Id){
    update.sub_cat_Id=req.body.sub_cat_Id;
   }
   if(req.body.categoriesId){
    update.categoriesId=req.body.categoriesId;
   }
   if(req.body.product_name){
    update.product_name=req.body.product_name;
   }
   if(req.body.product_price){
    update.product_price=req.body.product_price;
   }
   if(req.body.discount_price){
    update.discount_price=req.body.discount_price;
   }
   if(req.body.description){
    update.description=req.body.description;
   }
   if(req.body.thumbnail_url){
    update.thumbnail_url=req.body.thumbnail_url;
   }
   if(req.body.img_1_url){
    update.img_1_url=req.body.img_1_url;
   }
   if(req.body.img_2_url){
    update.img_2_url=req.body.img_2_url;
   }
   if(req.body.uploadId){
    update.imageId=req.body.uploadId;
   }

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
                data: [{
                    msg: ( 'Products.messages.update_err'),
                    code: 'Products.messages.update_err',
                    param: null
                }]
            });
        } else {

            return responder.success(res, {
                data: [{
                    msg: ( 'Products.messages.updated'),
                    code: 'Products.messages.updated',
                    param: null
                }]
            });

        }

    });

};