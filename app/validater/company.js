const Joi = require('joi');
const message = require('../message/message')

exports.saveCompany = (req, res, next) => {
    var update = Joi.object().keys({
        name: Joi.string().required().messages({ 'string.empty': "Name " + message.messages.IS_REQUIRED }),
        baseUrl: Joi.string().required().messages({ 'string.empty': "Base Url " + message.messages.IS_REQUIRED }),
        website: Joi.string().required().messages({ 'string.empty': "Base Url " + message.messages.IS_REQUIRED }),
        logo: Joi.object().required().messages({ 'string.empty': "Base Url " + message.messages.IS_REQUIRED }),
        code: Joi.string().required().messages({ 'string.empty': "Code " + message.messages.IS_REQUIRED }),

        contectBusiness: Joi.array().required().messages({ 'string.empty': "Code " + message.messages.IS_REQUIRED }),
        contectTech: Joi.array().required().messages({ 'string.empty': "Code " + message.messages.IS_REQUIRED }),
        contectOperation: Joi.array().required().messages({ 'string.empty': "Code " + message.messages.IS_REQUIRED }),
        contectMarketing: Joi.array().required().messages({ 'string.empty': "Code " + message.messages.IS_REQUIRED }),
        hackerBanCount: Joi.number().required().messages({ 'string.empty': "Code " + message.messages.IS_REQUIRED }),




        host: Joi.string().required().messages({ 'string.empty': "Name " + message.messages.IS_REQUIRED }),
        userName: Joi.string().required().messages({ 'string.empty': "Name " + message.messages.IS_REQUIRED }),
        password: Joi.string().required().messages({ 'string.empty': "Name " + message.messages.IS_REQUIRED }),

        // description: Joi.string().required().messages({'string.empty' : "Description "+message.messages.IS_REQUIRED}),
        // contactDetails: Joi.string().required().messages({'string.empty' : "Contact Details "+message.messages.IS_REQUIRED}),
        // info: Joi.string().required().messages({'string.empty' : "Info "+message.messages.IS_REQUIRED}),
        // settings: Joi.string().required().messages({'string.empty' : "settings "+message.messages.IS_REQUIRED}),


        // gameTypes: Joi.array().required().messages({'string.empty' : "Code "+message.messages.IS_REQUIRED}),
        // country: Joi.array().required().messages({'string.empty' : "Code "+message.messages.IS_REQUIRED}),
        // games: Joi.array().min(1).required().messages({'array.empty' : "games "+message.messages.IS_REQUIRED}),

        // gameTypes: Joi.array().min(1).required(),
        // country: Joi.string(),
        country: Joi.array().min(1).required(),
        // currency: Joi.string().required(),
        currency: Joi.array().min(1).required(),
        rewardsProductCurrency: Joi.array().min(1).required(),
        games: Joi.array().min(1).required(),


        isSharedWith: Joi.array(),
        isShared: Joi.boolean().required(),
        isB2BPartner: Joi.boolean().required(),
        isActive: Joi.boolean().required(),
        companyId: Joi.any(),
        clientId: Joi.any()

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