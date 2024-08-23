const faqController = require("../controllers/faq/index");

const Faq = require('../models/faq.model');
const paginate = require('../controllers/midleware/pagination');

module.exports = paginate(Faq);

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/faq/add",
    
  faqController.add
  );

  app.get("/api/faq/list",
    
  faqController.list
  );

  app.post("/api/faq/update/:_id",
     
  faqController.update
  );

  app.post("/api/faq/delete/:_id",
     
  faqController.delete
  );

 

};