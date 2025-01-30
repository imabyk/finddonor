const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  bloodgroup: {
    type: String,
    required: true,
  },

  mobileno: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },

  country: {
    type: String,
    required: true,
  },
  
  state: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },
  
  city: {
    type: String,
    required: true,
  },

  otp: {
    type: Number,
  },

  status: {
    type: Number, default: 1
  },
  
  date: { type: Date, default: Date.now },
});
var userModel = mongoose.model("User", userSchema);
module.exports = userModel;
