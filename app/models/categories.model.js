const mongoose = require("mongoose"),
                Schema = mongoose.Schema,
                crypto = require('crypto');

// var escapeProperty = function (value) {
// 	return _.escape(value);
// };


const Categories = mongoose.model(
  "Categories",
  new mongoose.Schema({
    brandId: {  // Reference to the School model
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand'
  },
	cat_name : {
		type: String
	},
  banner_id:{
    type: Object
  },
  imageId:{
    type:Object
  },
  tag:{
    type:String
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

module.exports = Categories;