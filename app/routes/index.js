module.exports = function (app) {
  require("./categories.routes")(app);
  require("./brand.routes")(app);
  require("./sub-categories.routes")(app);
  require("./products.routes")(app);
  require("./faq.routes")(app);
  require("./upload.routes")(app);
  require("./thumbnailupload.routes")(app);
  require("./bannerupload.routes")(app);
  require("./signup.routes")(app);
  require("./login.routes")(app);
  require("./banners.routes")(app);
  require("./coupon.routes")(app)
  require("./address.routes")(app)
  require("./order.routes")(app)
  require("./user.routes")(app)
  require("./otp.routes")(app)
};
