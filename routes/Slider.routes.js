const route = require("express").Router();

const { slider_page, slider, destroy, active, deactive, edit, updates} = require("../controller/Slider.Controller");
const passport = require("passport");
const imgUploads = require("../middleware/fileUpload");


// yom routes
route.get("/slider", passport.checkAuthentication, slider_page);
route.post("/addSliderData", imgUploads, slider)
route.get("/deleteData/:_id", destroy);
route.get("/activeSlider/:id", active);
route.get("/deactiveSlider/:id", deactive);
route.get("/editData/:_id", edit);
route.post("/updateSlider/:_id",imgUploads, updates);


module.exports = route;