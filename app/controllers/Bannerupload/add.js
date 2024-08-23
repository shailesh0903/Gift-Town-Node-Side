const config = require("../../config/auth.config");
const db = require("../../models");
const responder = require('../../libs/responder');
const multer = require('multer');
const path = require('path');

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const Bannerupload = require('../../models/bannerupload'); // Adjust the path based on your project structure

module.exports = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Create a new Upload document in the database
    const newUpload = new Bannerupload({
      url: `/uploads/${req.file.filename}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      isActive: true,
    });

    // Save the new Upload document
    const savedUpload = await newUpload.save();

    // Access the uploaded file details through req.file
    const imagePath = `/uploads/${req.file.filename}`;

    // Include the image ID and path in the success response
    return responder.success(res, { banner_id: savedUpload._id, imagePath });
  } catch (error) {
    // Handle any database or other errors
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};