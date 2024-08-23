const categoriesController = require("../controllers/categories/index");
const paginate = require('../controllers/midleware/pagination');
const Categories  = require("../models/brand.model");
// const CategoriesValidater = require("../validater/")

module.exports = paginate(Categories);
// const CategoriesValidater = require("../validater/")


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/categories/add",
  // CategoriesValidater.saveCategories,
    
    categoriesController.add
  );

  app.get("/api/categories/list",
    
  categoriesController.list
  );
  
  app.get("/api/categories/get/:_id",
     
  categoriesController.get
  );

  app.post("/api/categories/update/:_id",
     
  categoriesController.update
  );

  app.post("/api/categories/delete/:_id",
     
  categoriesController.delete
  );

  app.get("/api/homepageList",
  // CategoriesValidater.saveCategories,
    
    categoriesController.HomepageList
  );

  app.get("/api/search",
     
  categoriesController.Searchcategory
  );

};