const config = require("../../config/auth.config");
const db = require("../../models");
const Coupon = db.Coupon;
var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res, next) => {

    console.log("req.body?.country",req.body?.country)

    let update = {}
    update.updatedAt = Date.now()
   if(req.body.title){
    update.title=req.body.title;
   }
   if(req.body.code){
    update.code=req.body.code;
   }
   if(req.body.discount){
    update.discount=req.body.discount;
   }
   if(req.body.expirationDateString){
    update.expirationDateString=req.body.expirationDateString
   }
   if(req.body.discountType){
    update.discountType=req.body.discountType
   }
   if(req.body.uploadId){
    update.imageId=req.body.uploadId;
   }
  

   Coupon.findOneAndUpdate({
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
                    msg: ( 'Coupon.messages.update_err'),
                    code: 'Coupon.messages.update_err',
                    param: null
                }]
            });
        } else {

            return responder.success(res, {
                data: [{
                    msg: ( 'Coupon.messages.updated'),
                    code: 'Coupon.messages.updated',
                    param: null
                }]
            });

        }

    });

};