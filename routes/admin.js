var express = require('express');
var router = express.Router();
var adminModule = require("../models/admins");
var bcrypt = require("bcryptjs")
var { transporter } = require("../modules/mail");
var nodemailer = require("nodemailer");
const mail = require("../modules/mail");
var session1 = require("express-session");
const userModel = require('../models/users');
const voluteerModel = require('../models/volunteer');
const recieveModel = require('../models/recieve');
var session1;

/* GET admin dashboard. */
router.get('/dashboard', function (req, res, next) {
  session1 = req.session;
  console.log(session1.vid);
  userModel.count().exec((err, data) => {
    donors = data
    recieveModel.count().exec((err, data) => {
      requests = data
      todayrequests = requests

      voluteerModel.count().exec((err, data) => {
        volunteers = data
        if (session1.vid == "finddonorglobal@gmail.com") {
          res.render("Admin/dashboard", { donors, requests, volunteers, todayrequests })
        } else {
          res.render("Admin/login", {
            message: "you need to login first",
          });
        }
      });
    });
  });
});
/* GET admin login page */
router.get('/login', function (req, res, next) {
  session1 = req.session;
  if (session1.vid == "finddonorglobal@gmail.com") {
    res.redirect("/admin/dashboard");
  }
  else
    res.render("Admin/login", { message: "" });
});
router.post('/signup', function (req, res, next) {
  var email = req.body.email;
  var password = bcrypt.hashSync(req.body.password, 12);
  new adminModule({
    email, password
  }).save((err, data) => {
    if (err) throw err;
    res.status(200).json({ message: "admin saved" })
  })
})

router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  var checkuser = adminModule.findOne({ email: email });
  checkuser.exec((err, data) => {
    if (err) console.log(err);
    if (data) {
      var userid = data._id;
      var getpassword = data.password;
      session1 = req.session;
      if (password == "finddonor@bloodlink") {
        session1.vid = email;
        console.log(session1.vid);
        var mailOptions = {
          from: "finddonorglobal@gmail.com",
          to: "finddonorglobal@gmail.com",
          subject: "Admin panel logged in -Team finddonor",
          text: `Somebody logged in into admin account of finddonor.change password as soon as you can.


          `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("check mail");
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        res.redirect("/admin/redirect");
        res.render("Admin/dashboard")
      }

      else {
        var mailOptions = {
          from: "finddonorglobal@gmail.com",
          to: "finddonorglobal@gmail.com",
          subject: "Admin panel logged in attempt -Team finddonor",
          text: `Somebody try to logged in into admin account of finddonor.change password as soon as you can.
            with email :${email} and ${password} as credentials beaware        

          `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("check email");
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        // console.log("jii")
        res.render("Admin/login", {
          message: "Invalid username and password"
        });
      }
    }
    else {
      var mailOptions = {
        from: "finddonorglobal@gmail.com",
        to: "finddonorglobal@gmail.com",
        subject: "Admin panel logged in attempt -Team finddonor",
        text: `Somebody try to logged in into admin account of Finddonor.change password as soon as you can.
          with email :${email} and ${password} as credentials beaware        

        `,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("check email");
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.render("Admin/login", {
        message: "Invalid username and password"
      });
    }
  });
})
router.get("/redirect", (req, res) => {
  session1 = req.session;
  console.log(session1.vid);

  if (session1.vid == "finddonorglobal@gmail.com") {
    res.redirect("/admin/dashboard");
  } else {
    res.render("Admin/login", {
      message: "you need to login first",
    });
  }
});
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/admin/login");
  });
})

router.get("/donors", (req, res) => {
  userModel.find({}).exec((err, data) => {
    res.send(data);
  })
})
router.get("/requests", (req, res) => {
  recieveModel.find({}).exec((err, data) => {
    res.send(data);
  })
})
router.get("/volunteer", (req, res) => {
  voluteerModel.find({}).exec((err, data) => {
    res.send(data);
  })
})

router.post('/volunteer', (req, res) => {
  var { name, mobileno, email, country, state, city, about, why, achievements } = req.body;
  var volunteer = new voluteerModel({
    name: name, mobileno: mobileno, email: email, country: country, state: state, city: city, about: about, why: why, achievements: achievements
  });
  volunteer.save((err, data) => {
    if (err) throw err;
    console.log("volunteer saved")
    res.redirect("/admin/dashboard")
  })
})

module.exports = router;