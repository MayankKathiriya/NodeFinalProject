const yomModel = require("../models/userModels/user.Model");

const path = require("path");
const fs = require("fs");
let imgPath = path.join("uploads");

const slider_page = async (req, res) => {
    try {
        const data = await yomModel.find({});

        return res.render("sliderForm", { data });
    } catch (error) {
        console.log(error.message);
    }
}

const slider = async (req, res) => {
    try {

        let avtar = `${imgPath}/${req.file.filename}`;
        const adds = await yomModel.create(Object.assign({ avtar }, req.body));
        if (adds) {
            return res.redirect("back");
        }

    } catch (error) {
        return console.log(error.message);
    }
}


const destroy = async (req, res) => {
    try {
        const { params: { _id } } = req;
        const del = await yomModel.findByIdAndDelete({ _id });
        fs.unlinkSync(del.avtar);
        return res.redirect("back");
    } catch (error) {
        console.log(error.message);
    }
}

const active = async (req, res) => {
    try {
        const { params: { id } } = req;
        let values = "0";
        const Status = await yomModel.findByIdAndUpdate(id, {
            status: values
        });
        return res.redirect("back");

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const deactive = async (req, res) => {
    try {
        const { params: { id } } = req;
        let values = "1";
        const Status = await yomModel.findByIdAndUpdate(id, {
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
        const data = await yomModel.findById({ _id });
        if (data) {
            return res.render("editSlider", { data });
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
            const update = await yomModel.findByIdAndUpdate(_id, Object.assign({ avtar }, req.body));
            if (update) {
                if (update.avtar !== "uploads/defaultIMg.png") {
                    fs.unlinkSync(update.avtar);
                }
            }
            return res.redirect("/slider");
        } else {
            // const oldAvtar = res.locals.saveLoginData.avtar;
            const updatess = await yomModel.findByIdAndUpdate(_id, req.body);
            if (updatess) {
                return res.redirect("/slider");
            }
        }


    } catch (error) {
        console.log(error.message);
        return false;
    }
}



module.exports = {
    slider_page,
    slider,
    destroy,
    active,
    deactive,
    edit,
    updates
}