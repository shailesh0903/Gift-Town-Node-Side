const config = require("../../config/auth.config");
const db = require("../../models");
const Products = db.Products;
const responder = require('../../libs/responder');
 let bcrypt = require("bcryptjs");
const { currency } = require("../../models");
const Currency = db.currency
const Upload = db.upload;
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    let where = {
        _id: req.params._id,
        isDeleted: false
    };
    let select = {
        _id: 1,
        product_name: 1,
        // brandId:1,   
        imageId:1,
        product_price:1,
        discount_price:1,
        description:1,
        categoriesId:1

          
    };
    Products.findOne(where,select).exec(async (err, data) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else if (!data) {
            return responder.bad(res, {
                errors: [{
                    msg: ( 'Products.validation.not_found'),
                    code: 'Products.validation.not_found',
                    param: null
                }]
            });
        } else {
            
            var imageId = data?.imageId;
            var url ='';
            
            if(imageId!=null && imageId !=''){
                var uploadData = await Upload.findById(mongoose.Types.ObjectId(imageId));
            console.log(uploadData);
                
                if(uploadData){
                    url = uploadData.url;
                }
            }
            
         
            var product={
                _id : data._id,
                product_name : data.product_name,
                product_price:data.product_price,
                description:data.description,
                discount_price:data.discount_price,
                categoriesId:data.categoriesId,
                url : url,
                
            };
        
        
            return responder.success(res, { product });
        }

    });

}