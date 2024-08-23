const mongoose = require("mongoose"),
                Schema = mongoose.Schema,
                crypto = require('crypto');

// var escapeProperty = function (value) {
// 	return _.escape(value);
// };


const Banners = mongoose.model(
  "Banners",
  new mongoose.Schema({
    
	title : {
		type: String
	},
  index_no:{
    type: Number
  },
  imageId:{
    type:Object
  },
  imagePath:{
    type:Object
  },
  status: {
    type: String,
    enum: ["on", "off"],
    default: "off"
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
    },
    updatedAt: {
        type: Date,
    },
  })
);

module.exports = Banners;