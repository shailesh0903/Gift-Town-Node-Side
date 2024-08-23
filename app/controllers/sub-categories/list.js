const config = require("../../config/auth.config");
const db = require("../../models");
const Upload = db.upload;
const Sub_cat = db.Sub_cat;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

var bcrypt = require("bcryptjs");
const Categories = require("../../models/categories.model");

module.exports = async (req, res) => {
    let where = { isDeleted: false }; // Modify to filter only non-deleted subcategories
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    var count = await Sub_cat.countDocuments(where); // Count only non-deleted subcategories
    Sub_cat.find(where).skip(skip).limit(limit).select('categoriesId sub_cat_name   imageId ').exec(async (err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
            return responder.handleInternalError(res, err, next);
        } else if (!data) {
            return responder.bad(res, {
                errors: [{
                    msg: ('Subcategories.validation.not_found'),
                    code: 'Subcategories.validation.not_found',
                    param: null
                }]
            });
        } else {
            var newDataArray = [];
            for (var i = 0; i < data.length; i++) {
                var imageId = data[i]?.imageId;
                var url = '';
                if (imageId != null && imageId != '') {
                    var uploadData = await Upload.findById(mongoose.Types.ObjectId(imageId));
                    console.log(uploadData);
                    if (uploadData) {
                        url = uploadData.url;
                    }
                }
                var Categoriesdata = await Categories.findById(mongoose.Types.ObjectId(data[i].categoriesId))
                console.log("hello",Categoriesdata);
                newDataArray.push({
                    _id: data[i]._id,
                    Category: Categoriesdata,
                    sub_cat_name: data[i].sub_cat_name,
                    url: url
                });
            }
            console.log(data);

            return responder.success(res, { totalRecords: count, data: newDataArray });
        }
    });
};
