const config = require("../../config/auth.config");
const db = require("../../models");
const Bannerupload = db.bannerupload;

const responder = require('../../libs/responder');
const mongoose = require('mongoose');



var bcrypt = require("bcryptjs");

module.exports =async (req, res) => {
    // let where = { isDeleted: false };
    let where = {}
    where.isDeleted = false
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 20;
    const skip=(page-1)*limit;

var count = await Bannerupload.find().all().count();
Bannerupload.find(where).skip(skip).limit(limit).select('url').exec( async (err, data) => {
        console.log(data)
        if (err) {
            console.log(err);
            return responder.handleInternalError(res, err, next);
        } else if (!data) {
            return responder.bad(res, {
                errors: [{
                    msg: ( 'Upload.validation.not_found'),
                    code: 'Upload.validation.not_found',
                    param: null
                }]
            });
        } 
            
            return responder.success(res, { totalRecords:count });
         
        }

)}

    
            
