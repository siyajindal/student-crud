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
       
    },
    fees: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        
    },
    intro: {
        type: String,
        required: true
    }
});

const users = new mongoose.model("Newusers",userSchema);


module.exports = users;