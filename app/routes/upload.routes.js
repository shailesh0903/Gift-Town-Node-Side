const uploadController = require("../controllers/upload/index");
// Set up storage for multer
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
    const upload = multer({ storage: storage });

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/uploads/:_id",
     
  uploadController.list);
  app.post("/api/uploads",upload.single('image'),uploadController.add );
};

  