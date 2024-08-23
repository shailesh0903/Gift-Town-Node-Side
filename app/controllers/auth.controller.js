const config = require("../config/auth.config");
const db = require("../models");
const AdminUser = db.adminuser;
const responder = require('../libs/responder');
 
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  const adminUser = new AdminUser({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  adminUser.save((err, user) => {
    if (err) {
      res.status(500).send({ success: false, message: err });
      return;
    } else {
      res.status(200).send({ success: true, message: "User was registered successfully!" });
    }


  });
};

exports.signin = (req, res) => {
  console.log("/api/auth/signin",req.body)

  AdminUser.findOne({
    email: req.body.email,
    isDeleted: false,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return responder.bad(res, {
          errors: [{
            msg: ( 'account.validation.profile.not_found'),
            code: 'account.validation.password_invalid',
            param: 'password'
          }] 
        });
        // return res.status(404).send({ success: false, message: "User Not found." });
      }

      if (user.isActive == false) {
        return responder.bad(res, {
          errors: [{
            msg: "Your account is inactive.",
            code: '',
            param: 'inactive'
          }]
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        // return res.status(401).send({
        //   success: false,
        //   accessToken: null,
        //   message: "Invalid Password!"
        // });
        return responder.bad(res, {
          errors: [{
            msg: ( 'account.validation.password_invalid'),
            code: 'account.validation.password_invalid',
            param: 'password'
          }]
        });
      }

      var token = jwt.sign({ id: user.id, permissions: JSON.stringify(user.permissions) }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      // console.log(user)
      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token,
        permissions: user.permissions || [],
        company: user.company || [],
        role: user.role || "Admin",
        roleId: user.roleId || "",
        employeeId: user.employeeId || ""
      });
    });
};