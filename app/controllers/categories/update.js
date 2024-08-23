const config = require("../../config/auth.config");
const db = require("../../models");
const Categories = db.Categories;
var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res, next) => {
    console.log("req.body?.country",req.body?.country)

    let update = {}
    update.updatedAt = Date.now()
  
    if(req.body.cat_name){
        update.cat_name=req.body.cat_name;
    }
    if(req.body.brandId){
        update.brandId=req.body.brandId;
    }
    if(req.body.banner_id){
        update.banner_id=req.body.banner_id;
    }
    if(req.body.uploadId){
        update.imageId=req.body.uploadId;
       }
       if(req.body.tag){
        update.tag=req.body.tag;
       }
      
    Categories.findOneAndUpdate({
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
                    msg: ( 'Categories.messages.update_err'),
                    code: 'Categories.messages.update_err',
                    param: null
                }]
            });
        } else {

            return responder.success(res, {
                data: [{
                    msg: ( 'Categories.messages.updated'),
                    code: 'Categories.messages.updated',
                    param: null
                }]
            });

        }

    });

};