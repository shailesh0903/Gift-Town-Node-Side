// Import necessary modules
const config = require("../../config/auth.config");
const db = require('../../models');
const Categories = db.Categories;
const Products = db.Products;
const Upload = db.upload; // Assuming Upload is your model for storing image URLs

// Define API endpoint to get sub-categories and products by category ID
module.exports = async (req, res, next) => {
  try {
    // Extract category ID from request parameters
    const categoryId = req.body._id;

    // Find category by ID
    const category = await Categories.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    // Find products by category ID
    const products = await Products.find({ categoriesId: categoryId });

    // Customize the response to exclude certain fields
    const responseData = {
      category: {
        _id: category._id,
        cat_name: category.cat_name,
        imageId: category.imageId
      },
      products: []
    };

    // Iterate over products to fetch image URLs
    for (const product of products) {
      const url = await getImageUrl(product.imageId);
      responseData.products.push({
        _id: product._id,
        productName: product.product_name,
        product_price: product.product_price,
        discount_price: product.discount_price,
        Description: product.description,
        url: url // Include the fetched image URL
        // Include other fields you need
      });
    }

    // Return customized response
    return res.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to fetch data.' });
  }
};

// Function to retrieve image URL by imageId
async function getImageUrl(imageId) {
  try {
    // Query your database or storage system to get the URL based on imageId
    const uploadData = await Upload.findById(imageId);
    if (uploadData) {
      return uploadData.url; // Assuming there's a 'url' field in the Upload model
    } else {
      return null; // Return null if imageId is not found or URL is not available
    }
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null; // Return null in case of any errors
  }
}