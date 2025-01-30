const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

var adminModule = mongoose.model("Admins", adminSchema)
module.exports = adminModule;