require("dotenv").config();
const mongoose = require("mongoose");

const connectdb = async () => {
  const db = await mongoose.connect(process.env.MONGO_URL);

  if(db){
    console.log("db connected");
  }else{
    console.log("db not connected");
  }

}

module.exports = connectdb;