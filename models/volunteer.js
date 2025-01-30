const mongoose = require("mongoose");

var volunteerSchema = new mongoose.Schema({
    name: {
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

    city: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    why: {
        type: String,
    },
    achievements: {
        type: String,
    },
    date: { type: Date, default: Date.now },
});
var voluteerModel = mongoose.model("Volunteer", volunteerSchema);
module.exports = voluteerModel;
