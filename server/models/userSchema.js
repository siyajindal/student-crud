const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    roll: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
       
    },
    classes: {
        type: String,
        required: true
    },
    enrol: {
        type: Date,
        required: true,
        unique: true
    },
    fees: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    intro: {
        type: String,
        required: true
    }
});

const users = new mongoose.model("users",userSchema);


module.exports = users;