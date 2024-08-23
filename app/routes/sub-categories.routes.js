const sub_catController = require("../controllers/sub-categories/index");
// const CategoriesValidater = require("../validater/")
const paginate = require('../controllers/midleware/pagination');
const Sub_cat = require("../models/sub-categories.model");
// const CategoriesValidater = require("../validater/")

module.exports = paginate(Sub_cat);


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Accept"
    );
    next();
  });


  app.post("/api/subcategories/add",
    // CategoriesValidater.saveCategories,
    sub_catController.add
  );

  app.get("/api/subcategories/list",

    sub_catController.list
  );



  app.get("/api/subcategories/get/:_id",

    sub_catController.get
  );

  app.post("/api/subcategories/update/:_id",

    sub_catController.update
  );

  app.post("/api/subcategories/delete/:_id",

    sub_catController.delete
  );

  app.post("/api/getsub-catbycatid",

    sub_catController.getsub_catbycatid
  );





};