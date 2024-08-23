const config = require("../../config/auth.config");
const db = require("../../models");
const Faq = db.Faq;
const Role = db.role;
var bcrypt = require("bcryptjs");
const responder = require('../../libs/responder');

module.exports = (req, res,next) => {
   

        const faq = new Faq({
            question: req.body.question,
            answer: req.body.answer,
            index_no: req.body.index_no
        });
     faq.save((err, faq) => {
        if (err) {
            return responder.handleInternalError(res, err, next);

        } else {
            if (faq) {

                let item = {}
                item._id = faq._id

                return responder.success(res, {
                    data: [{
                        msg: ('faq.messages.created'),
                    }]
                });

            } else {

                return responder.bad(res, {
                    data: [{
                        msg:('faq.messages.create_err'),
                    }]
                });
            }

        }
    });
   }
