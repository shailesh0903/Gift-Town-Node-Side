const productsController = require("../controllers/products/index");
const multer = require('multer');
const path = require('path');
const paginate = require('../controllers/midleware/pagination');
const Products  = require("../models/brand.model");
// const CategoriesValidater = require("../validater/")

module.exports = paginate(Products);



module.exports = function (app) {
 
// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
  const upload = multer({ storage: storage });

  // Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Access the uploaded file details through req.file
  const imagePath = `/uploads/${req.file.filename}`;
  res.send(`File uploaded successfully. Image path: ${imagePath}`);
});

  app.post("/api/products/add", productsController.add);
  app.get("/api/products/list", productsController.list);
  app.get("/api/products/get/:_id", productsController.get);
  app.post("/api/products/update/:_id", productsController.update);
  app.post("/api/products/delete/:_id", productsController.delete);
  app.post("/api/getproductbycatid", productsController.getproductbycatid);
  app.get("/api/searchProducts",
     
  productsController.Searchcategory
  );


};
