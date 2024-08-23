const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const dbConfig = require("./app/config/db.config.js");
const db = require("./app/models");
var bcrypt = require("bcryptjs");
// const formData = require('express-form-data');
const Categories = db.Categories;
const Relation=db.Relation;
const Student=db.student;
const School=db.school;
const Subject=db.subject;
const bodyParser = require('body-parser')

// app.use(bodyParser()) // support encoded bodies

// app.use(formData.parse());  
// var fileupload = require("express-fileupload");
// app.use(fileupload());

var corsOptions = {
    origin: "http://localhost:3006"
};
app.use('/uploads', express.static('uploads'));

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 9158;
const HOST = 'localhost'
app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}.`);
});
app.get("/live", (req, res) => {
    res.sendFile(path.join(__dirname + '/preview.html'));
});
// add all routes file
require('./app/routes/index')(app);
// connect mongoose Db
db.mongoose.connect(dbConfig.mongoAtlasUri,
    err => {
        if (err) throw err;
        console.log('DB connected Successfully')
    });
