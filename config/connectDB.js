const mongoose = require("mongoose");

const connectdb = async () => {
  // const db = await mongoose.connect("mongodb://127.0.0.1:27017/FinalProject");
  const db = await mongoose.connect("mongodb+srv://mayankkathiriya008:36MgeSx1QkbV3e2z@nodejs.exnjezb.mongodb.net/FinalProject?retryWrites=true&w=majority");

  if(db){
    console.log("db connected");
  }else{
    console.log("db not connected");
  }

}

module.exports = connectdb;