// controllers/bannerController.js
const config = require("../../config/auth.config");
const db = require('../../models');
const Banners = db.Banners;
const responder = require('../../libs/responder');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  try {
    const bannerId = req.params.id; // Assuming the banner ID is passed as a route parameter
    const banner = await Banners.findById(bannerId);

    if (!banner) {
      return responder.notFound(res, {
        data: [{
          msg: 'Banner not found',
        }]
      });
    }

    // Toggle the status
    banner.status = banner.status === 'on' ? 'off' : 'on';
    await banner.save();

    // Determine the current status
    const currentStatus = banner.status === 'on' ? 'active' : 'inactive';

    // Include current status in response data
    const responseData = {
      banner: banner,
      status: currentStatus
    };

    return responder.success(res, {
      data: responseData
    });
  } catch (error) {
    return responder.handleInternalError(res, error, next);
  }
};
