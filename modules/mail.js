var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILPASS,
  },
});
module.exports = {
  transporter: transporter,
};
