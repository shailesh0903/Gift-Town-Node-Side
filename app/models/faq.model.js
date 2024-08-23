const { string } = require("joi");

const mongoose = require("mongoose"),
                Schema = mongoose.Schema;
                

// var escapeProperty = function (value) {
// 	return _.escape(value);
// };


const Faq = mongoose.model(
  "Faq",
  new mongoose.Schema({

    index_no:{
        type:Number
    },
   
    question:{
        type:String
    },
    answer:{
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
   
    isDeleted: {
        type: Boolean,
        index: true,
        default: false
    },
    isActive: {
        type: Boolean,
        index: true,
        default: true
    }
  })
);

module.exports = Faq;