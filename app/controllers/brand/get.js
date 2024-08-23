const config = require("../../config/auth.config");
const db = require("../../models");
const Brand = db.Brand;
let bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');

module.exports = (req, res) => {
    let where = {
        _id: req.params._id,
        isDeleted: false
    };
    let select = { _id: 1, name: 1,employeeId:1, email: 1,company:1, createdAt: 1, phone: 1, isActive: 1, phone: 1, dateOfBirth: 1 ,Address:1};
    Brand.findOne(where, select).exec((err, data) => {


        if (err) {
            return responder.handleInternalError(res, err, next);
        } else if (!data) {
            return responder.bad(res, {
                errors: [{
                    msg: ( 'Brand.validation.not_found'),
                    code: 'Brand.validation.not_found',
                    param: null
                }]
            });
        } else {
            return responder.success(res, { data });
        }

    });

};