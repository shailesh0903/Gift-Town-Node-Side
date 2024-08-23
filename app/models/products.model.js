

const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    crypto = require('crypto');


const Products = mongoose.model(
    "Products",
    new mongoose.Schema({
        brandId: {  // Reference to the School model
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand'
        },
        sub_cat_Id: {  // Reference to the School model
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subcategories'
        },
        categoriesId: {  // Reference to the School model
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories'
        },
       product_name: {
            type: String
        },
       product_price:{
            type:Number
        },
        discount_price:{
            type:Number
        },
       img_1_url:{
            type:String
       },
       img_2_url:{
        type:String
       },
       imageId:{
        type:Object
       },
        description:{
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

// const upload = multer({ storage: storage });
module.exports = Products;