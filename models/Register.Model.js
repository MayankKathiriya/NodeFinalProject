const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name Is Must Be Provide"]
    },
    email : {
        type : String,
        required : [true,"Email Is Must Be Provide"]
    },
    password : {
        type : String,
        required : [true,"Password Is Must Be Provide"]
    },
    avtar : {
        type : String,
        required : true,
        default : "uploads/defaultIMg.png"
    }
});

module.exports = mongoose.model("registerData",schema);