const yomUserModel = require("../../models/userModels/user.Model");
const postModel = require("../../models/userModels/post.model");
const BlogModel = require("../../models/userModels/blog.model");
const blogModel = require("../../models/userModels/blog.model");
const contactModel = require("../../models/userModels/contact.Model");

const home = async (req, res) => {
    try {
        const data = await yomUserModel.find({});
        const postData = await postModel.find({}).sort({ _id: -1 });
        const blogData = await BlogModel.find({});
        if (data) {
            return res.render("user/index", { data, postData, blogData });
        }

    } catch (error) {
        console.log(error.message);
    }
}

const readMorePage = async (req, res) => {
    try {
        const { params: { _id } } = req;
        const data = await blogModel.findById({ _id });
        return res.render("user/readmore", { data });
    } catch (error) {
        console.log(error.message);
    }
}

const contact = async (req, res) => {
    try {
        return res.render("user/contact");
    } catch (error) {
        console.log(error.message);
    }
}


const contactData = async (req, res) => {
    try {

        const { body: { name, email, subject, message } } = req;

        const addData = await contactModel.create({ name, email, subject, message });

        if (addData) {
            return res.redirect("back");
        }

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { home, readMorePage, contact, contactData }