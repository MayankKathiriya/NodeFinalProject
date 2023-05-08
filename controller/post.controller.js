const postModel = require("../models/userModels/post.model");
const path = require("path");
const fs = require("fs");
let imgPath = path.join("uploads");
const posts = async (req, res) => {
    try {
        const data = await postModel.find({});
        return res.render("recentpost", { data });
    } catch (error) {
        console.log(error.message);
    }
}
const add = async (req, res) => {
    try {
        let avtar = `${imgPath}/${req.file.filename}`;
        const adds = await postModel.create(Object.assign({ avtar }, req.body));
        if (adds) {
            return res.redirect("back");
        }
    } catch (error) {
        return console.log(error.message);
    }
}
const destroys = async (req, res) => {
    try {
        const { params: { _id } } = req;
        const del = await postModel.findByIdAndDelete({ _id });
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
        const Status = await postModel.findByIdAndUpdate(id, {
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
        const Status = await postModel.findByIdAndUpdate(id, {
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
        const data = await postModel.findById({ _id });
        if (data) {
            return res.render("editPost", { data });
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
            const update = await postModel.findByIdAndUpdate(_id, Object.assign({ avtar }, req.body));
            if (update) {
                if (update.avtar !== "uploads/defaultIMg.png") {
                    fs.unlinkSync(update.avtar);
                }
            }
            return res.redirect("/resentPost");
        } else {
            const updatess = await postModel.findByIdAndUpdate(_id, req.body);
            if (updatess) {
                return res.redirect("/resentPost");
            }
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
module.exports = { posts, add, destroys , deactives ,actives, edit, updates }
