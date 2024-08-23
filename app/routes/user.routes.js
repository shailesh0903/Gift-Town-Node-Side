const userController = require("../controllers/user/index");

const Faq = require('../models/user.model');
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

  app.get('/api/user',userController.list
  );

  
};