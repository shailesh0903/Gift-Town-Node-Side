const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.Categories = require("./categories.model");
db.Products = require("./products.model");
db.Brand = require("./brand.model");
db.Sub_cat = require("./sub-categories.model");
db.Faq = require("./faq.model");
db.upload = require("./upload.model")
db.thumbnailupload =require("./thumbnailupload.model")
db.bannerupload=require("./bannerupload");
db.User=require("./user.model")
db.Banners=require("./banners.model")
db.Coupon=require("./coupon.model")
db.Address=require("./address.model")
db.Order=require("./order.model")
module.exports = db;
