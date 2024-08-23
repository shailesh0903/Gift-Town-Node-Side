const config = require("../../config/auth.config");
const db = require("../../models");
const Sub_cat = db.Sub_cat;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    try {
      // Check if the upload ID is provided in the request
      if (!req.body.uploadId) {
        return responder.bad(res, {
          data: [{
            msg: 'Sub_cat.messages.uploadId_missing',
          }]
        });
      }
  
      // Create a new sub-category instance
      console.log(req.body.categoriesId)
      console.log({
        categoriesId: mongoose.Types.ObjectId(req.body.categoriesId),
        sub_cat_name: req.body.sub_cat_name,
        imageId: req.body.uploadId,
      });
      const sub_cat = new Sub_cat({
        categoriesId: mongoose.Types.ObjectId(req.body.categoriesId),
        sub_cat_name: req.body.sub_cat_name,
        imageId: req.body.uploadId,
      });
  
      // Save the sub-category to the database
      const savedSubCategory = await sub_cat.save();

      console.log(savedSubCategory); // Log the saved sub-category object
  
      // Check if savedSubCategory is a mongoose document
      if (!savedSubCategory || !savedSubCategory._id) {
        throw new Error('savedSubCategory is not a valid mongoose document.');
      }
  
      // Populate the category details
      const populatedSubCategory = await Sub_cat.findById(savedSubCategory._id).populate('categoriesId', 'cat_name');
  
      // Return success response with the sub-category details including the category name
      return responder.success(res, {
        data: populatedSubCategory
      });
    } catch (error) {
      console.error('Error:', error);
      return responder.handleInternalError(res, error, next);
    }
  };