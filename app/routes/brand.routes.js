const brandController = require("../controllers/brand/index");
const paginate = require('../controllers/midleware/pagination');
const Brand  = require("../models/brand.model");
// const CategoriesValidater = require("../validater/")

module.exports = paginate(Brand);



module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/brand/add",
  // CategoriesValidater.saveCategories,
    
    brandController.add
  );

  app.get("/api/brand/list",
    
  brandController.list
  );

  

  app.get("/api/brand/get/:_id",
     
  brandController.get
  );

  app.post("/api/brand/update/:_id",
     
  brandController.update
  );

  app.post("/api/brand/delete/:_id",
     
  brandController.delete
  );

 

};