const config = require("../../config/auth.config");
const db = require("../../models");
const Categories = db.Categories;
const responder = require('../../libs/responder');
 let bcrypt = require("bcryptjs");
const { currency } = require("../../models");
const Currency = db.currency
const Upload = db.upload;
const Bannerupload =db.bannerupload
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    let where = {
        _id: req.params._id,
        isDeleted: false
    };
    let select = {
        _id: 1,
        cat_name: 1,
        brandId:1,   
        imageId:1,
        banner_id:1    
    };
    Categories.findOne(where,select).exec(async (err, data) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else if (!data) {
            return responder.bad(res, {
                errors: [{
                    msg: ( 'Categories.validation.not_found'),
                    code: 'Categories.validation.not_found',
                    param: null
                }]
            });
        } else {
            const banner_id = data?.banner_id;
            var imageId = data?.imageId;
            var url ='';
            let bannerUrl = '';
            if(imageId!=null && imageId !=''){
                var uploadData = await Upload.findById(mongoose.Types.ObjectId(imageId));
            console.log(uploadData);
                
                if(uploadData){
                    url = uploadData.url;
                }
            }
            
            if (banner_id) {
                const banneruploadData = await Bannerupload.findById(mongoose.Types.ObjectId(banner_id));
                console.log(banneruploadData)
                if (banneruploadData) {
                    bannerUrl = banneruploadData.url;
                }
            }
            var banner={
                _id : data._id,
                cat_name : data.cat_name,
                brandId:data.brandId,
                url : url,
                bannerUrl:bannerUrl
            };
        
        
            return responder.success(res, { banner });
        }

    });

}