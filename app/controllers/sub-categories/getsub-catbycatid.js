// Import necessary modules
const config = require("../../config/auth.config");
const db = require('../../models');
const Categories = db.Categories;
const SubCategories = db.Sub_cat;

// Define API endpoint to get sub-categories and products by category ID
module.exports = async (req, res, next) => {
    try { 
      console.log("session")
      // Extract category ID from request parameters
      const categoryId = req.body._id;
  
      // Find category by ID
      const category = await Categories.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found.' });
      }
  
      
      // Find sub-categories by category ID
      const subCategories = await SubCategories.find({ categoriesId: categoryId });
  
      // Customize the response to exclude certain fields
      const responseData = {
        category: {
          _id: category._id,
          cat_name: category.cat_name,
          imageId: category.imageId,
          banner_id:category.banner_id
        },
        subCategories: subCategories.map(subCategory => ({

          _id: subCategory._id,
          categoriesId: subCategory.categoriesId,
          sub_cat_name: subCategory.sub_cat_name,
          imageId: subCategory.imageId
        }))
      };
  
      // Return customized response
      return res.json(responseData);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Failed to fetch data.' });
    }
  };