const config = require("../../config/auth.config");
const db = require("../../models");
const Brand = db.Brand;
var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res, next) => {
    
    console.log("req.body?.country",req.body?.country)

    let update = {}
    update.updatedAt = Date.now()
  
    if(req.body.brand_name){
        update.brand_name=req.body.brand_name;
    }
    if(req.body.thumbnail_id){
        update.thumbnail_id=req.body.thumbnail_id;
    }
    if(req.body.uploadId){
        update.imageId=req.body.uploadId;
       }


    Brand.findOneAndUpdate({
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
                    msg: ( 'Brand.messages.update_err'),
                    code: 'Brand.messages.update_err',
                    param: null
                }]
            });
        } else {

            return responder.success(res, {
                data: [{
                    msg: ( 'Brand.messages.updated'),
                    code: 'Brand.messages.updated',
                    param: null
                }]
            });

        }

    });

};