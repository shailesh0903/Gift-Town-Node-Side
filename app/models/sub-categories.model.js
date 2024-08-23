const mongoose = require("mongoose");

const subcategories = new mongoose.Schema({
  categoriesId: {  // Reference to the Category model
    type: mongoose.Types.ObjectId,
    ref: 'Categories'
  },
  sub_cat_name: {
    type: String
  },
  thumbnail_url: {
    type: String
  },
  imageId: {
    type: Object
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("subcategories", subcategories);