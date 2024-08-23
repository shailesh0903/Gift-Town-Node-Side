// address.routes.js

const addressController = require("../controllers/address/index");
const Address = require('../models/address.model');
const paginate = require('../controllers/midleware/pagination');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/address/add", addressController.add);
    app.get("/api/address/list", addressController.list);
    app.get("/api/address/get/:_id", addressController.get);
    app.post("/api/address/update/:_id", addressController.update);
    app.post("/api/address/delete/:_id", addressController.delete);
    app.get("/api/getaddressbyuserid", addressController.getaddressbyuserId); // Handle GET requests

};
