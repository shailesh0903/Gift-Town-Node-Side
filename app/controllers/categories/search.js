const config = require("../../config/auth.config");
const db = require("../../models");
const Categories = db.Categories; // Assuming Categories model is exported from the models module
const responder = require('../../libs/responder');

module.exports = async (req, res, next) => {
    try {
        // Extract search query from request parameters
        const query = req.query.q;
        
        // Check if the query is provided
        if (!query) {
            return responder.bad(res, {
                data: [{ msg: 'Query is missing' }]
            });
        }

        // Perform the search based on the query
        const searchResults = await Categories.find({
            $or: [
                { cat_name: { $regex: query, $options: 'i' } }, // Case-insensitive search by category name
                { tag: { $regex: query, $options: 'i' } } // Case-insensitive search by tag
            ]
        });

        // Return the search results
        return responder.success(res, { data: searchResults });
    } catch (error) {
        // Handle any errors
        return responder.handleInternalError(res, error, next);
    }
};