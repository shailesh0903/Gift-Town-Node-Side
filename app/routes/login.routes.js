const userController = require("../controllers/loginuser/index");
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

  app.post('/api/login',userController.add
  );
  
  app.post('/profile', userController.authMiddleware, (req, res) => {
    // Access user data attached to req.user
    const userData = req.user;
    console.log(req.body); // Log request body to see parameters
    res.json(userData);
  });
  app.post('/editprofile',  userController.editProfile);
  
};