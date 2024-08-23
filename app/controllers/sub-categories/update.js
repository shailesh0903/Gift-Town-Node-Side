const config = require("../../config/auth.config");
const db = require("../../models");
const Sub_cat = db.Sub_cat;
var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res, next) => {

    console.log("req.body?.country",req.body?.country)

    let update = {}
    update.updatedAt = Date.now()
   if(req.body.categoriesId){
    update.categoriesId=req.body.categoriesId;
   }
   if(req.body.sub_cat_name){
    update.sub_cat_name=req.body.sub_cat_name;
   }
   if(req.body.thumbanail_url){
    update.thumbanail_url=req.body.thumbanail_url;
   }
   if(req.body.uploadId){
    update.imageId=req.body.uploadId;
   }
  

   Sub_cat.findOneAndUpdate({
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
                    msg: ( 'Sub_cat.messages.update_err'),
                    code: 'Sub_cat.messages.update_err',
                    param: null
                }]
            });
        } else {

            return responder.success(res, {
                data: [{
                    msg: ( 'Sub_cat.messages.updated'),
                    code: 'Sub_cat.messages.updated',
                    param: null
                }]
            });

        }

    });

};