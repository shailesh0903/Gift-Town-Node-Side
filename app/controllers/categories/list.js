const config = require("../../config/auth.config");
const db = require("../../models");
const Upload = db.upload;
const Categories = db.Categories;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

var bcrypt = require("bcryptjs");
const Brand = require("../../models/brand.model");
const Bannerupload = require("../../models/bannerupload");

module.exports = async (req, res) => {
    let where = { isDeleted: false }; // Modify to filter only non-deleted categories
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    var count = await Categories.countDocuments(where); // Count only non-deleted categories
    Categories.find(where).skip(skip).limit(limit).select('_id cat_name tag banner_id brandId imageId ').exec(async (err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
            return responder.handleInternalError(res, err, next);
        } else if (!data) {
            return responder.bad(res, {
                errors: [{
                    msg: ('Categories.validation.not_found'),
                    code: 'Categories.validation.not_found',
                    param: null
                }]
            });
        } else {
            var newDataArray = [];
            for (var i = 0; i < data.length; i++) {
                const banner_id = data[i]?.banner_id;
                var imageId = data[i]?.imageId;
                var url = '';
                let bannerUrl = '';
                if (imageId != null && imageId != '') {
                    var uploadData = await Upload.findById(mongoose.Types.ObjectId(imageId));
                    console.log(uploadData);
                    if (uploadData) {
                        url = uploadData.url;
                    }
                }

                if (banner_id) {
                    const banneruploadData = await Bannerupload.findById(mongoose.Types.ObjectId(banner_id));
                    console.log(banneruploadData)
                    if (banneruploadData) {
                        bannerUrl = banneruploadData.url;
                    }
                }
                var Branddata = await Brand.findById(mongoose.Types.ObjectId(data[i].brandId))
                console.log("hello",Branddata);
                newDataArray.push({
                    _id: data[i]._id,
                    brand:Branddata,
                    cat_name: data[i].cat_name,
                    tag:data[i].tag,
                    url: url,
                    bannerUrl:bannerUrl
                });
            }
            console.log(data);

            return responder.success(res, { totalRecords: count, data: newDataArray });
        }
    });
};

// To handle the deletion of a category, you can add another endpoint in your application
// and utilize the HTTP DELETE method to delete a category by its ID.
// For example:
// router.delete('/categories/:categoryId', async (req, res) => {
//     try {
//         const categoryId = req.params.categoryId;
//         const deletedCategory = await Categories.findByIdAndUpdate(categoryId, { isDeleted: true }, { new: true });
//         if (!deletedCategory) {
//             return responder.notFound(res, 'Category not found.');
//         }
//         return responder.success(res, 'Category deleted successfully.');
//     } catch (error) {
//         console.error(error);
//         return responder.handleInternalError(res, error);
//     }
// });
