const config = require("../../config/auth.config");
const db = require("../../models");
const Address = db.Address;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  

    // Check if the upload ID is provided in the request
   

    const address = new Address({
        userId:req.body.userId,
        street_area: req.body.street_area,
        street_name: req.body.street_name,
        street_no: req.body.street_no,
        pincode: req.body.pincode
    });

    address.save((err, address) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else {
            console.log(address);

            if (address) {
                

                return responder.success(res, {
                    data: address
                });
            } else {
                return responder.bad(res, {
                    data: [{
                        msg: 'address.messages.create_err',
                    }]
                });
            }
        }
    });
};