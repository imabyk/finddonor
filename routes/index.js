var express = require("express");
var router = express.Router();
var userModule = require("../models/users");
var recieveModel = require("../models/recieve");
var { transporter } = require("../modules/mail");
var nodemailer = require("nodemailer");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const mail = require("../modules/mail");
var session = require("express-session");
// var session;
var isloggedin = "";
const cryptoRandomString = require("crypto-random-string");
const voluteerModel = require("../models/volunteer");
global.secureRoute = cryptoRandomString({ length: 16, type: "url-safe" });

/* GET home page. */
router.get("/", function (req, res, next) {
  session = req.session;

  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
      var name = user[0].name.split(" ")[0];
      res.render("Home/index", { isloggedin: name });
    });
  } else res.render("Home/index", { isloggedin: "login" });
});

//post home page
router.post("/", function (req, res, next) {
  var name = req.body.firstname + " " + req.body.lastname;
  var bloodgroup = req.body.bloodgroup;
  var mobileno = req.body.mobileno;
  var country = req.body.country;
  var state = req.body.state;
  var district = req.body.district;
  var city = req.body.city;
  var needy = new recieveModel({
    name,
    bloodgroup,
    mobileno,
    country,
    state,
    district,
    city,
  });
  console.log(needy);
  needy.save((err, data) => {
    if (err) throw err;
    if (bloodgroup === "O+") {
      bloodgroup = ["O+", "O-"];
    } else if (bloodgroup === "A+") {
      bloodgroup = ["A+", "A-", "O+", "O-"];
    } else if (bloodgroup == "B+") {
      bloodgroup = ["B+", "B-", "O+", "O-"];
    } else if (bloodgroup == "AB+") {
      bloodgroup = ["AB-", "B+", "AB+", "A-", "B-", "O-", "O+"];
    } else if (bloodgroup == "O-") {
      bloodgroup = ["O-"];
    } else if (bloodgroup == "A-") {
      bloodgroup = ["A-", " O-"];
    } else if (bloodgroup == "B-") {
      bloodgroup = ["B-", " O-"];
    } else if ((bloodgroup = "AB-")) {
      bloodgroup = ["AB-", " A-", "B-", "O-"];
    }
    userModule
      .find({
        bloodgroup: bloodgroup,
        country: country,
        state: state,
        district: district,
        status: 1,
      })
      .exec((err, data) => {
        if (err) throw err;
        // console.log(data);
        session = req.session;
        console.log(data);
        data.forEach((data) => {
          var mailOptions = {
            from: "finddonorglobal@gmail.com",
            to: data.email,
            subject: "Blood Needed-Team Finddonor",
            text: `Hey donor ,Its your turn now ..Somebody is in need of blood and
                  you can help him.if you are available please reach out to the needy and save a life

                  person name:${name}
                  person phoneno:${mobileno}
                  
                  the person is in your city please contact him as soon as possible
                      
                  with love 
                  Team-finddonor`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("check email");
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        });

        if (session.uniqueId) {
          userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
            var name = user[0].name.split(" ")[0];
            res
              .status(200)
              .render("Home/searchresult", { dataa: data, bloodgroup: req.body.bloodgroup, country, state, district, isloggedin: name });
          });
        } else
          res
            .status(200)
            .render("Home/searchresult", { dataa: data, bloodgroup: req.body.bloodgroup, country, state, district, isloggedin: "login" });
      });
  });
});

// GET Login Page
router.get("/login", function (req, res, next) {
  session = req.session;

  if (session.uniqueId) {
    res.redirect("/dashboard");
  } else res.render("Home/login", { message: "", isloggedin: "login" });
});

//GET user dashboard
router.get("/dashboard", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, data) => {
      var name = data[0].name.split(" ")[0];

      res.render("Home/dashboard", {
        user: data[0],
        msg: "",
        isloggedin: name,
      });
    });
  } else {
    res.render("Home/login", { message: "", isloggedin: "login" });
  }
});

//post login
router.post("/login", function (req, res, next) {
  var mobileno = req.body.mobileno;
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(mobileno)) {
    var checkuser = userModule.findOne({ email: mobileno });
  } else {
    var checkuser = userModule.findOne({ mobileno: mobileno });
  }
  var password = req.body.password;
  checkuser.exec((err, data) => {
    if (err) throw err;
    if (data) {
      var userid = data._id;
      var getpassword = data.password;
      var mobileno = data.mobileno;
      session = req.session;
      if (bcrypt.compareSync(password, getpassword)) {
        session.uniqueId = mobileno;
        // console.log(session.uniqueId);

        res.redirect("/redirect");
      } else {
        res.render("Home/login", {
          message: "Invalid username and password",
          isloggedin: "login",
        });
      }
    } else {
      res.render("Home/login", {
        message: "Invalid username and password",
        isloggedin: "login",
      });
    }
  });
});
router.get("/redirect", (req, res) => {
  session = req.session;
  // console.log(session.uniqueId);

  if (session.uniqueId) {
    res.redirect("/dashboard");
  } else {
    res.render("Home/login", {
      message: "",
      isloggedin: "login",
    });
  }
});
router.post("/reportmodal", (req, res) => {
  var mobileno = req.body.mobileno;
  // console.log(mobileno)
  userModule.find({ mobileno: mobileno }).exec((err, data) => {
    if (err) throw err;
    // console.log(data);
    res.send(data[0]);
  });
});
router.get("/logout", function (req, res, next) {
  req.session.destroy((err) => {
    // console.log(err);
    res.redirect("/login");
  });
});

//reset password page
router.get("/forgot-password", function (req, res) {
  req.session.destroy((err) => {
    res.render("Home/forgotpassword");
  });
});

//get data from forgot password email and send otp
router.post("/forgot-password", function (req, res) {
  let email = req.body.email;
  // console.log(email)
  let otp = Math.floor(100000 + Math.random() * 900000);
  // console.log(otp);
  global.userData = {
    otp: otp,
    email: email,
  };
  // find user whose email is passed and update its otp(otp attribut is created in schema)
  userModule.find({ email: email }).exec((err, user) => {
    if (err) return res.redirect("/forgot-password");
    console.log("user ", user[0]);
    userModule
      .findByIdAndUpdate(user[0]._id, { otp: otp })
      .exec((err, data) => {
        var mailOptions = {
          from: "finddonorglobal@gmail.com",
          to: email,
          subject: "OTP verification-Team Finddonor",
          text: `Warning: Don't share OTP with anyone else.
              your OTP is : -    ${otp}
                  
                  
              with love 
              Team-finddonor`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.send({ msg: "check email" });
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.render("Home/verifyotp", { user: user[0]._id });
      });
  });
});

//verify otp
router.post("/verify-otp", (req, res) => {
  var id = req.body.id;
  // console.log(id);
  userModule.find({ _id: id }).exec((err, user) => {
    // console.log(user);
    if (req.body.otp == user[0].otp) {
      //userdata is global in above function
      console.log("/forgot-password/" + secureRoute);
      return res.redirect("/forgot-password/" + secureRoute);
    } else {
      return res.redirect("/forgot-password/");
    }
  });
});

// enter new password page
router.get("/forgot-password/" + secureRoute, function (req, res) {
  res.render("Home/resetpassword", { secrete: secureRoute });
});

//update password in database
router.post("/forgot-password/" + secureRoute, (req, res) => {
  // const pass = req.body.password;
  const pass = bcrypt.hashSync(req.body.password, 12);
  userModule.find({ email: userData.email }).exec((err, data) => {
    if (err) return res.render("Home/resetpassword", { secrete: secureRoute });
    userModule
      .findByIdAndUpdate(data[0]._id, { password: pass })
      .exec((data) => {
        res.redirect("/login");
      });
  });
  //update password where email is userData.email which is already global above.active
  // redirect him to login page.
});

// GET Register Page
router.get("/register", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    req.session.destroy((err) => {
      console.log(err);
      res.render("Home/register", { msg: "", isloggedin: "login" });
    });
  } else res.render("Home/register", { msg: "", isloggedin: "login" });
});
//post register
router.post("/register", function (req, res, next) {
  var name = req.body.firstname + " " + req.body.lastname;
  var bloodgroup = req.body.bloodgroup;
  var mobileno = req.body.mobileno;
  var email = req.body.email;
  var country = req.body.country;
  var state = req.body.state;
  var district = req.body.district;
  var city = req.body.city;
  var password = req.body.password;
  password = bcrypt.hashSync(req.body.password, 12);
  var user = new userModule({
    name: name,
    bloodgroup: bloodgroup,
    mobileno: mobileno,
    email: email,
    country: country,
    state: state,
    district: district,
    city: city,
    password: password,
  });
  var mailOptions = {
    from: "finddonorglobal@gmail.com",
    to: email,
    subject: "Thanks! for being donor -Find Donor",
    text: `Thank you !! For becoming a part of our blood donation community.
            We will notify you when someone will need blood.
            Keep up the good spirit.
              
              
            with love 
            Team:- Find Donor`,
  };
  user.save((err, data) => {
    if (err) {
      return res.status(200).render("Home/register", {
        msg: "fill details properly",
        isloggedin: "login",
      });
    }
    if (email.length > 1) {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("check email");
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
    res.status(200).render("Home/register", {
      msg: "user registed successfully",
      isloggedin: "login",
      mobileno: mobileno,
      password: req.body.password,
    });
  });
});

// GET Login Page
router.get("/about", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
      var name = user[0].name.split(" ")[0];

      res.render("Home/about", { isloggedin: name });
    });
  } else {
    res.render("Home/about", { isloggedin: "login" });
  }
});

// GET Team Page
router.get("/team", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, data) => {
      var name = data[0].name.split(" ")[0];

      res.render("Home/team", { isloggedin: name });
    });
  } else {
    res.render("Home/team", { isloggedin: "login" });
  }
});

// GET Search Page
router.get("/searchResult", function (req, res, next) {
  userModule.find({}).exec((err, data) => {
    res.render("Home/searchresult", { dataa: data, isloggedin: "login" });
  });
});

//some ajax routes
router.post("/checkmobileno", function (req, res, next) {
  var mobileno = req.body.mobileno;
  userModule.find({ mobileno: mobileno }).exec((err, user) => {
    if (user[0]) {
      res.send("yes");
    } else {
      res.send("");
    }
  });
});

router.post("/changestatus", function (req, res, next) {
  const { id, status } = req.body;
  userModule.findByIdAndUpdate(id, { status: status }).exec((err, data) => {
    if (err) res.send({ error: "cant change" });
    else res.send({ status: status });
  });
});
router.post("/checkemail", function (req, res, next) {
  var email = req.body.email;
  if (email.length > 2) {
    userModule.find({ email: email }).exec((err, user) => {
      if (user[0]) {
        res.send("yes");
      } else {
        res.send("email not present");
      }
    });
  } else {
    res.send("email is blank");
  }
});
router.post("/checkmobilenoupdate", function (req, res, next) {
  var mobileno = req.body.mobileno;
  var id = req.body.id;
  userModule.find({ mobileno: mobileno }).exec((err, user) => {
    if (user[0]) {
      if (user[0]._id == id) {
        res.send("he has filled his own mobileno previous one");
      } else res.send("yes");
    } else {
      res.send("");
    }
  });
});
router.post("/checkemailupdate", function (req, res, next) {
  var email = req.body.email;
  var id = req.body.id;
  if (email.length > 2) {
    userModule.find({ email: email }).exec((err, user) => {
      if (user[0]) {
        if (user[0]._id == id) {
          res.send("he has filled his own email previous one");
        } else res.send("yes");
      } else {
        res.send("email not present");
      }
    });
  } else {
    res.send("email is blank");
  }
});

// GET Volunteer Page
router.get("/volunteer", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  // var volunteers;
  voluteerModel.find({}).exec((err, data) => {
    volunteers = data;
    console.log(volunteers);
    if (session.uniqueId) {
      userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
        var name = user[0].name.split(" ")[0];

        res.render("Home/volunteer", {
          isloggedin: name,
          volunteers: volunteers,
        });
      });
    } else {
      res.render("Home/volunteer", {
        isloggedin: "login",
        volunteers: volunteers,
      });
    }
  });
});
//route for when someone reports about the donor
router.post("/reporting", (req, res) => {
  var { name, mobileno, issue, description } = req.body;
  var mailOptions = {
    from: "finddonorglobal@gmail.com",
    to: "finddonorglobal@gmail.com",
    subject: `Report against donor ${name} ${mobileno}-Team finddonor`,
    text: `Sorry we want to inform that this donor has been reported with some issue kindly check.
            issues:-${issue},
            descriptiom:-${description}
              
              
          with love 
          Team-finddonor`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send({ msg: "check email" });
    } else {
      // console.log("Email sent: " + info.response);
      res.send("done");
    }
  });
});
router.post("/volunteermodal", (req, res) => {
  var id = req.body.id;

  voluteerModel.find({ _id: id }).exec((err, data) => {
    if (err) throw err;
    res.send(data[0]);
  });
});
//update profile of donor through dashboard
router.post("/updateprofile", (req, res, next) => {
  var {
    id,
    firstname,
    lastname,
    mobileno,
    email,
    bloodgroup,
    state,
    district,
    city,
  } = req.body;
  name = firstname + " " + lastname;
  var data;
  userModule
    .findByIdAndUpdate(id, {
      name,
      mobileno,
      email,
      bloodgroup,
      state,
      district,
      city,
    })
    .exec()
    .then((err, data) => {
      userModule.findById(id).exec((err, data) => {
        data = data;
        console.log(data);
        res.render("Home/dashboard", {
          user: data,
          isloggedin: name.split(" ")[0],
          msg: "details updated successfully",
        });
      });
    });
});

// Get privacy policy page
router.get("/privacy", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
      var name = user[0].name.split(" ")[0];

      res.render("Info/privacy", { isloggedin: name });
    });
  } else {
    res.render("Info/privacy", { isloggedin: "login" });
  }
});

// Get terms and condition page
router.get("/terms", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
      var name = user[0].name.split(" ")[0];

      res.render("Info/terms", { isloggedin: name });
    });
  } else {
    res.render("Info/terms", { isloggedin: "login" });
  }
});

// Get faq page
router.get("/faq", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
      var name = user[0].name.split(" ")[0];

      res.render("Info/faq", { isloggedin: name });
    });
  } else {
    res.render("Info/faq", { isloggedin: "login" });
  }
});
//

// Get contact us page
router.get("/blood-facts", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
      var name = user[0].name.split(" ")[0];

      res.render("Info/fact", { isloggedin: name, msg: "" });
    });
  } else {
    res.render("Info/fact", { isloggedin: "login", msg: "" });
  }
});

// Get contact us page
router.get("/contact", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
      var name = user[0].name.split(" ")[0];

      res.render("Info/contact", { isloggedin: name, msg: "" });
    });
  } else {
    res.render("Info/contact", { isloggedin: "login", msg: "" });
  }
});
router.post("/contact", (req, res) => {
  var { name, email, message } = req.body;
  var mailOptions = {
    from: "finddonorglobal@gmail.com",
    to: "finddonorglobal@gmail.com",
    subject: `finddonor user-(${name}) Contacting admin`,
    text: `from:${email}
     message: ${message}
              
              
          with love 
          Team-finddonor`,
  };
  session = req.session;
  console.log(session.uniqueId);
  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
      var name = user[0].name.split(" ")[0];

      isloggedin = name;
    });
  } else {
    isloggedin = "login";
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.render("Info/contact", { isloggedin: isloggedin, msg: "" });
    } else {
      res.render("Info/contact", { isloggedin: isloggedin, msg: "mail sent" });
    }
  });
});

// Get Plasma Donor page
// router.get("/plasma_donor", function (req, res, next) {
//   session = req.session;
//   if (session.uniqueId) {
//     userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
//       var name = user[0].name.split(" ")[0];

//       res.render("Plasma/donor", { isloggedin: name, msg: "" });
//     });
//   } else {
//     res.render("Plasma/donor", { isloggedin: "login", msg: "" });
//   }
// });


// Get Plasma Recipient page
// router.get("/plasma_recipient", function (req, res, next) {
//   session = req.session;
//   // console.log(session.uniqueId);
//   if (session.uniqueId) {
//     userModule.find({ mobileno: session.uniqueId }).exec((err, user) => {
//       var name = user[0].name.split(" ")[0];

//       res.render("Plasma/recipient", { isloggedin: name, msg: "" });
//     });
//   } else {
//     res.render("Plasma/recipient", { isloggedin: "login", msg: "" });
//   }
// });

module.exports = router;
