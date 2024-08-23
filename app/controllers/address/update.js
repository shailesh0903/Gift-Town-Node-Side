const config = require("../../config/auth.config");
const db = require("../../models");
const Address = db.Address;
var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res, next) => {

    console.log("req.body?.country",req.body?.country)

    let update = {}
    update.updatedAt = Date.now()
    if(req.body.userId){
        update.userId=req.body.userId;
       }
   if(req.body.street_area){
    update.street_area=req.body.street_area;
   }
   if(req.body.street_no){
    update.street_no=req.body.street_no;
   }
   if(req.body.street_name){
    update.street_name=req.body.street_name;
   }
   if(req.body.pincode){
    update.pincode=req.body.pincode;
   }
  

   Address.findOneAndUpdate({
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
                    msg: ( 'Faq.messages.update_err'),
                    code: 'Faq.messages.update_err',
                    param: null
                }]
            });
        } else {

            return responder.success(res, {
                data: [{
                    msg: ( 'Faq.messages.updated'),
                    code: 'Faq.messages.updated',
                    param: null
                }]
            });

        }

    });

};