const config = require("../../config/auth.config");
const db = require("../../models");
const Upload = db.upload;
const Brand = db.Brand;
const Thumbnailupload=db.thumbnailupload;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        const count = await Brand.countDocuments({ isDeleted: false });

        if (count === 0) {
            return responder.bad(res, {
                errors: [{
                    msg: 'No brands found.',
                    code: 'Brand.validation.not_found',
                    param: null
                }]
            });
        }

        const data = await Brand.find({ isDeleted: false }).skip(skip).limit(limit).select('brand_name thumbnail_id imageId').exec();

        const newDataArray = await Promise.all(data.map(async (item) => {
            const thumbnail_id = item?.thumbnail_id;
            const imageId = item?.imageId;
            let url = '';
            let thumbnailUrl = '';

            if (imageId) {
                const uploadData = await Upload.findById(mongoose.Types.ObjectId(imageId));
                if (uploadData) {
                    url = uploadData.url;
                }
            }

            if (thumbnail_id) {
                const thumbnailUploadData = await Thumbnailupload.findById(mongoose.Types.ObjectId(thumbnail_id));
                console.log(thumbnailUploadData)
                if (thumbnailUploadData) {
                    thumbnailUrl = thumbnailUploadData.url;
                }
            }

            return {
                _id: item._id,  
                brand_name: item.brand_name,
                url: url,
                thumbnailUrl: thumbnailUrl
            };
        }));

        return responder.success(res, { totalRecords: count, data: newDataArray });
    } catch (error) {
        console.error(error);
        return responder.handleInternalError(res, error);
    }
};