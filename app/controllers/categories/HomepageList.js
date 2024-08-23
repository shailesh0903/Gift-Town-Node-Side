const config = require("../../config/auth.config");
const db = require("../../models");
const Categories = db.Categories;
const Upload = db.upload; // Import the Upload model
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    try {
        // Retrieve all categories from the database
        const allCategories = await Categories.find();

        // Separate categories into "Bestseller" and "Toptrender" groups based on criteria
        const bestsellers = allCategories.filter(category => category.tag && category.tag.includes("Best Selling"));
        const toptrenders = allCategories.filter(category => category.tag && category.tag.includes("Trending Gifts"));
        const occasions = allCategories.filter(category => category.tag && category.tag.includes("Occasions"));

        // Prepare the response data with URL fetched using imageId
        const responseData = {
            Best_Selling: await Promise.all(bestsellers.map(async category => {
                // Fetch the URL using imageId
                const uploadData = await Upload.findById(mongoose.Types.ObjectId(category.imageId));
                // Create a new object with required fields including URL
                return {
                    _id: category._id,
                    brandId: category.brandId,
                    cat_name: category.cat_name,
                    imageId: category.imageId,
                    imageUrl: uploadData ? uploadData.url : null, // URL from uploadData
                    isActive: category.isActive,
                    isDeleted: category.isDeleted,
                    updatedAt: category.updatedAt
                };
            })),
            Trending_Gifts: await Promise.all(toptrenders.map(async category => {
                // Fetch the URL using imageId
                const uploadData = await Upload.findById(mongoose.Types.ObjectId(category.imageId));
                // Create a new object with required fields including URL
                return {
                    _id: category._id,
                    brandId: category.brandId,
                    cat_name: category.cat_name,
                    imageId: category.imageId,
                    imageUrl: uploadData ? uploadData.url : null, // URL from uploadData
                    isActive: category.isActive,
                    isDeleted: category.isDeleted,
                    updatedAt: category.updatedAt
                };
            })),
            Occasions: await Promise.all(occasions.map(async category => {
                // Fetch the URL using imageId
                const uploadData = await Upload.findById(mongoose.Types.ObjectId(category.imageId));
                // Create a new object with required fields including URL
                return {
                    _id: category._id,
                    brandId: category.brandId,
                    cat_name: category.cat_name,
                    imageId: category.imageId,
                    imageUrl: uploadData ? uploadData.url : null, // URL from uploadData
                    isActive: category.isActive,
                    isDeleted: category.isDeleted,
                    updatedAt: category.updatedAt
                };
            }))
        };

        // Return the categorized groups as a success response
        return responder.success(res, {
            data: responseData
        });
    } catch (error) {
        // Handle any errors that occur during the database query or processing
        return responder.handleInternalError(res, error, next);
    }
};