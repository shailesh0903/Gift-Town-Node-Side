const mongoose = require("mongoose"),
                Schema = mongoose.Schema,
                crypto = require('crypto');

// var escapeProperty = function (value) {
// 	return _.escape(value);
// };


const Brand = mongoose.model(
  "Brand",
  new mongoose.Schema({
    
	brand_name : {
		type: String
	},
  thumbnail_id:{
    type: Object
  },
  imageId:{
    type:Object
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

module.exports = Brand;