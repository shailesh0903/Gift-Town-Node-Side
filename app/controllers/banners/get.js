const config = require("../../config/auth.config");
const db = require("../../models");
const Banners = db.Banners;
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
        title: 1,
        index_no:1,   
        imageId:1    
    };
    Banners.findOne(where,select).exec(async (err, data) => {
        if (err) {
            return responder.handleInternalError(res, err, next);
        } else if (!data) {
            return responder.bad(res, {
                errors: [{
                    msg: ( 'Banners.validation.not_found'),
                    code: 'Banners.validation.not_found',
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
            var newData={
                _id : data._id,
                title : data.title,
                index_no:data.index_no,
                url : url
            };
        
          
            return responder.success(res, { newData });
        }

    });

};