const config = require("../../config/auth.config");
const db = require("../../models");
const Upload = db.upload;
const Products = db.Products;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

var bcrypt = require("bcryptjs");
const Brand = require("../../models/brand.model");
const Categories = require("../../models/categories.model");
const Subategories = require("../../models/sub-categories.model");

module.exports = async (req, res) => {
    let where = { isDeleted: false }; // Modify to filter only non-deleted products
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    var count = await Products.countDocuments(where); // Count only non-deleted products
    Products.find(where).skip(skip).limit(limit).select('brandId sub_cat_Id categoriesId product_name product_price discount_price description  img_1_url img_2_url imageId ').exec(async (err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
            return responder.handleInternalError(res, err, next);
        } else if (!data) {
            return responder.bad(res, {
                errors: [{
                    msg: ('Products.validation.not_found'),
                    code: 'Products.validation.not_found',
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
                var Branddata = await Brand.findById(mongoose.Types.ObjectId(data[i].brandId))
                console.log("hello",Branddata);
                var Categoriesdata = await Categories.findById(mongoose.Types.ObjectId(data[i].categoriesId))
                console.log("hello",Categoriesdata);
                var Subcategoriesdata = await Subategories.findById(mongoose.Types.ObjectId(data[i].sub_cat_Id))
                console.log("hello jd",Subcategoriesdata);
                newDataArray.push({
                    _id: data[i]._id,
                    brand: Branddata,
                    subcategory: Subcategoriesdata,
                    category: Categoriesdata,
                    product_name: data[i].product_name,
                    product_price: data[i].product_price,
                    discount_price: data[i].discount_price,
                    description: data[i].description,
                    img_1_url: data[i].img_1_url,
                    img_2_url: data[i].img_2_url,
                    url: url
                });
            }
            console.log(data);

            return responder.success(res, { totalRecords: count, data: newDataArray });
        }
    });
};

// To handle the deletion of a product, you can add another endpoint in your application
// and utilize the HTTP DELETE method to delete a product by its ID.
// For example:
// router.delete('/products/:productId', async (req, res) => {
//     try {
//         const productId = req.params.productId;
//         const deletedProduct = await Products.findByIdAndUpdate(productId, { isDeleted: true }, { new: true });
//         if (!deletedProduct) {
//             return responder.notFound(res, 'Product not found.');
//         }
//         return responder.success(res, 'Product deleted successfully.');
//     } catch (error) {
//         console.error(error);
//         return responder.handleInternalError(res, error);
//     }
// });
