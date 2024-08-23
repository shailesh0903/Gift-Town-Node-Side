const bannersController = require("../controllers/banners/index");
const Banners = require('../models/banners.model');
const paginate = require('../controllers/midleware/pagination');

module.exports = paginate(Banners);

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 

  app.post("/api/banners/add",
    
  bannersController.add
  );
  app.post("/api/toggle/:id", bannersController.toggleStatus);
  app.get("/api/banners/list",
    
  bannersController.list
  );

  app.get("/api/banners/get/:_id",
     
  bannersController.get
  );

  app.post("/api/banners/update/:_id",
     
  bannersController.update
  );

  app.post("/api/banners/delete/:_id",
     
  bannersController.delete
  );

 

};