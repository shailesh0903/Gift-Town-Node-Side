const couponController= require("../controllers/coupon/index");

const Coupon = require('../models/coupon.model');
const paginate = require('../controllers/midleware/pagination');

module.exports = paginate(Coupon);

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/coupon/add",
    
  couponController.add
  );

  app.get("/api/coupon/list",
    
  couponController.list
  );

  

  

  app.post("/api/coupon/update/:_id",
     
  couponController.update
  );

  app.post("/api/coupon/delete/:_id",
     
  couponController.delete
  );

 

};