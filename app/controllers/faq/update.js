const config = require("../../config/auth.config");
const db = require("../../models");
const Faq = db.Faq;
var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');
 
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res, next) => {

    console.log("req.body?.country",req.body?.country)

    let update = {}
    update.updatedAt = Date.now()
    if(req.body.index_no){
        update.index_no=req.body.index_no;
       }
   if(req.body.question){
    update.question=req.body.question;
   }
   if(req.body.answer){
    update.answer=req.body.answer;
   }
  

   Faq.findOneAndUpdate({
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