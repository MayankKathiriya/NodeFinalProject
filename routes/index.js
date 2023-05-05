const express = require("express");

const route = express.Router();

const RegisterController = require("../controller/RegisterController");
const passport = require("passport");
const imgUploads = require("../middleware/fileUpload");


route.get("/admin", RegisterController.login);
route.get("/register", RegisterController.register);
route.get("/dashbord", passport.checkAuthentication, RegisterController.dashbord);
route.get("/logout", RegisterController.logout);
route.get("/forgot", RegisterController.forgot);
route.get("/otp", RegisterController.otp);
route.get("/reset", RegisterController.reset);
route.get("/profile", passport.checkAuthentication, RegisterController.profile);

route.post("/registerData", RegisterController.RegData);
route.post("/loginData", passport.authenticate('local', { failureRedirect: '/' }), RegisterController.loginData);
route.post("/forgotData", RegisterController.forgotData);
route.post("/otpData", RegisterController.otpData);
route.post("/resetData", RegisterController.resetData);
route.post("/ProfileUpdate", imgUploads, RegisterController.ProfileUpdate);



// other Routes Require 
// route.use("/user",require("../routes/user/yom.routes"));
// route.use("/",require("../routes/Slider.routes"));
module.exports = route;