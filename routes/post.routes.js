const route = require("express").Router();
const passport = require("passport");
const imgUploads = require("../middleware/fileUpload");

const { posts,add, destroys, actives, deactives, edit, updates } = require("../controller/post.controller");

route.get("/resentPost",passport.checkAuthentication,posts);
route.post("/addPostData",imgUploads,add);
route.get("/deleteDatas/:_id", destroys);
route.get("/activeSliders/:id", actives);
route.get("/deactiveSliders/:id", deactives);
route.get("/editDatas/:_id", edit);
route.post("/updatePost/:_id",imgUploads, updates);

module.exports = route;