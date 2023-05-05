const mongoose = require("mongoose");

const bschema = mongoose.Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogDescription: {
        type: String,
        required: true

    },
    author: {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    avtar: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 1
    }
});

module.exports = mongoose.model('blogTbl', bschema);