const route = require("express").Router();
const passport = require("passport");
const imgUploads = require("../middleware/fileUpload");

const { blog, addBlogData, destroys, actives, deactives, edit, updates } = require("../controller/blog.controller");

route.get("/blogPost", passport.checkAuthentication, blog)
route.post("/addBlogData", imgUploads, addBlogData);
route.get("/deleteBlog/:_id", destroys);
route.get("/activeBlog/:id", actives);
route.get("/deactiveBlog/:id", deactives);
route.get("/editblog/:_id", edit);
route.post("/updateBlog/:_id",imgUploads, updates);

module.exports = route;
