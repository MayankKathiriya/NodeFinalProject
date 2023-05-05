const blogModel = require("../models/userModels/blog.model");

const path = require("path");
const fs = require("fs");
let imgPath = path.join("uploads");

const blog = async (req, res) => {
    try {
        const data = await blogModel.find({});

        return res.render("blogForm", { data });
    } catch (error) {
        console.log(error.message);
    }
}

const addBlogData = async (req, res) => {
    try {
        let avtar = `${imgPath}/${req.file.filename}`;

        const adds = await blogModel.create(Object.assign({ avtar }, req.body));
        if (adds) {
            return res.redirect("back");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const destroys = async (req, res) => {
    try {
        const { params: { _id } } = req;
        const del = await blogModel.findByIdAndDelete({ _id });
        fs.unlinkSync(del.avtar);
        return res.redirect("back");
    } catch (error) {
        console.log(error.message);
    }
}

const actives = async (req, res) => {
    try {
        const { params: { id } } = req;
        let values = "0";
        const Status = await blogModel.findByIdAndUpdate(id, {
            status: values
        });
        return res.redirect("back");

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const deactives = async (req, res) => {
    try {
        const { params: { id } } = req;
        let values = "1";
        const Status = await blogModel.findByIdAndUpdate(id, {
            status: values
        });
        return res.redirect("back");

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const edit = async (req, res) => {
    try {
        const { params: { _id } } = req;
        const data = await blogModel.findById({ _id });
        if (data) {
            return res.render("editBlog", { data });
        }

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const updates = async (req, res) => {
    try {
        const { params: { _id } } = req;

        if (req.file) {
            let avtar = `${imgPath}/${req.file.filename}`;
            const update = await blogModel.findByIdAndUpdate(_id, Object.assign({ avtar }, req.body));
            if (update) {
                if (update.avtar !== "uploads/defaultIMg.png") {
                    fs.unlinkSync(update.avtar);
                }
            }
            return res.redirect("/blogPost");
        } else {
            const updatess = await blogModel.findByIdAndUpdate(_id, req.body);
            if (updatess) {
                return res.redirect("/blogPost");
            }
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

module.exports = { blog, addBlogData, destroys, edit, deactives, actives, updates };