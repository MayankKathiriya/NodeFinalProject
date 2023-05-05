const route = require("express").Router();

const { home, readMorePage, contact, contactData } = require("../../controller/user/yomController");

route.get("/", home);
route.get("/read_more/:_id", readMorePage);
route.get("/contact_page",contact);
route.post("/contactData",contactData);

route.use("/", require("../index"));
route.use("/", require("../Slider.routes"));
route.use("/", require("../post.routes"));
route.use("/", require("../blog.routes"));

module.exports = route;