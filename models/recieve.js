const mongoose = require("mongoose");

var recieveSchema = new mongoose.Schema({
  name: {
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

  date: { type: Date, default: Date.now },
});
var recieveModel = mongoose.model("Recieve", recieveSchema);
module.exports = recieveModel;
