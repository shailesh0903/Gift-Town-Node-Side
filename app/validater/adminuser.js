const Joi = require('joi');
const message = require('../message/message')

exports.saveAdminUser = (req, res, next) => {
    console.log("saveAdminUser>>",req.body)
    var update = Joi.object().keys({
        name: Joi.string().required().messages({ 'string.empty': "Name " + message.messages.IS_REQUIRED }),
        email: Joi.string().required().messages({ 'string.empty': "Email " + message.messages.IS_REQUIRED }),
        employeeId: Joi.string().required().messages({ 'string.empty': "EmployeeId " + message.messages.IS_REQUIRED }),
        phone: Joi.string().min(10).max(10).required().messages({ 'string.empty': "Phone Number " + message.messages.IS_REQUIRED }),
        password: Joi.string().min(3).max(15).required(),
        confirm: Joi.string().required().valid(Joi.ref('password')),
        // permissions: Joi.array().min(1).required(),
        company: Joi.array().min(1).required(),
        dateOfBirth: Joi.string(),
        Address: Joi.string(),
        isActive: Joi.boolean().valid(true, false)

    });
    const result = update.validate(req.body, { abortEarly: false });
    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
        res.status(423).json({
            message: 'Invalid request',
            data: error.details
        })
    } else {
        next()
    }
}

exports.updateAdminUser = (req, res, next) => {
    var update = Joi.object().keys({
        name: Joi.string().messages({ 'string.empty': "Name " + message.messages.IS_REQUIRED }),
        email: Joi.string().messages({ 'string.empty': "Email " + message.messages.IS_REQUIRED }),
        phone: Joi.string().min(10).max(10).messages({ 'string.empty': "Phone Number " + message.messages.IS_REQUIRED }),
        password: Joi.string(),
        confirm: Joi.string().valid(Joi.ref('password')),
        // permissions: Joi.array().min(1),
        company: Joi.array().min(1),
        dateOfBirth: Joi.string(),
        isActive: Joi.boolean().valid(true, false)

    });
    const result = update.validate(req.body, { abortEarly: false });
    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
        res.status(422).json({
            message: 'Invalid request',
            data: error.details
        })
    } else {
        next()
    }
}