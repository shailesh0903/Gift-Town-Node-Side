const config = require("../../config/auth.config");
const db = require("../../models");
const Upload = db.upload;
const Banners = db.Banners;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        // Count total number of banners
        const count = await Banners.countDocuments({ isDeleted: false });
        
        if (count === 0) {
            // Log an error for debugging
            console.error("No banners found in the database.");
            return responder.bad(res, {
                errors: [{
                    msg: 'No banners found.',
                    code: 'Banners.validation.not_found',
                    param: null
                }]
            });
        }

        // Fetch banners with pagination, excluding deleted ones
        const data = await Banners.find({ isDeleted: false }).skip(skip).limit(limit).select('_id title index_no  imageId').exec();

        // Format banners with associated image URLs
        const newDataArray = await Promise.all(data.map(async (item) => {
            const imageId = item?.imageId;
            let url = '';

            if (imageId) {
                const uploadData = await Upload.findById(mongoose.Types.ObjectId(imageId));
                
                if (uploadData) {
                    url = uploadData.url;
                } else {
                    // Log an error if associated image not found
                    console.error(`Image not found for banner with ID: ${item._id}`);
                }
            }

            return {
                _id: item._id,
                title: item.title,
                index_no: item.index_no,
                url: url
            };
        }));

        // Send formatted data as response
        return responder.success(res, { totalRecords: count, data: newDataArray });
    } catch (error) {
        // Log any unexpected errors
        console.error('Error fetching banners:', error);
        return responder.handleInternalError(res, error);
    }
};
