const config = require("../../config/auth.config");
const db = require("../../models");
const Address = db.Address;
const responder = require('../../libs/responder');
 let bcrypt = require("bcryptjs");
const { currency } = require("../../models");
const Currency = db.currency
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    let where = {
        _id: req.params._id,
        isDeleted: false
    };
    let select = {
        _id: 1,
        userId: 1,
        street_area : 1,
        street_no:1,   
        street_name:1,
        pincode:1    
    };
    Address.findOne(where,select).exec(async (err, data) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else if (!data) {
            return responder.bad(res, {
                errors: [{
                    msg: ( 'address.validation.not_found'),
                    code: 'address.validation.not_found',
                    param: null
                }]
            });
        }
            var newData={
                _id : data._id,
                userId : data.userId,
                address:data.address,
                street_name : data.street_name,
                street_no : data.street_no
            };
        
          
            return responder.success(res, { newData });
        }

    );

};