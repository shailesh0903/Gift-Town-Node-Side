const config = require("../../config/auth.config");
const db = require("../../models");
const Upload = db.upload;
const Address = db.Address;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        // Count total number of banners
        const count = await Address.countDocuments({ isDeleted: false });
        
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
        const data = await Address.find({ isDeleted: false }).skip(skip).limit(limit).select('userId street_no street_name pincode  street_area').exec();

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
                userId: item.userId,
                street_no: item.street_no,
                street_name: item.street_name,
                street_area: item.street_area,
                pincode:item.pincode
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