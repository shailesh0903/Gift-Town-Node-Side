const config = require("../../config/auth.config");
const db = require("../../models");
const Upload = db.upload;
const Faq = db.Faq;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
    let where = { isDeleted: false }; // Query condition to filter deleted documents
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        // Count total FAQs excluding deleted ones
        const count = await Faq.countDocuments(where);
        
        // Find FAQs with pagination and filtering deleted ones
        const data = await Faq.find(where)
            .skip(skip)
            .limit(limit)
            .select('index_no question answer imageId')
            .exec();

        if (!data || data.length === 0) {
            return responder.bad(res, {
                errors: [{
                    msg: 'Faq.validation.not_found',
                    code: 'Faq.validation.not_found',
                    param: null
                }]
            });
        }

        const newDataArray = [];
        for (const faq of data) {
            let url = '';
            if (faq.imageId) {
                const uploadData = await Upload.findById(mongoose.Types.ObjectId(faq.imageId));
                if (uploadData) {
                    url = uploadData.url;
                }
            }
            newDataArray.push({
                _id: faq._id,
                question: faq.question,
                answer: faq.answer,
                index_no: faq.index_no,
            });
        }

        return responder.success(res, { totalRecords: count, data: newDataArray });
    } catch (err) {
        console.log(err);
        return responder.handleInternalError(res, err, next);
    }
};
