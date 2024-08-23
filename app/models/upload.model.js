const { string } = require("joi");

const mongoose = require("mongoose"),
                Schema = mongoose.Schema;
                

// var escapeProperty = function (value) {
// 	return _.escape(value);
// };


const Upload = mongoose.model(
  "Upload",
  new mongoose.Schema({
    
    url:{
        type:String
    },

    
    createdAt: {
        type: Date,
        index: true,
        default: Date.now
    },
    updatedAt: {
      type: Date,
      required: false,
      index: true,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  })
);

module.exports = Upload;