const RegisterModel = require("../models/Register.Model");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
let imgPath = path.join("uploads");
const login = (req, res) => {
    if (res.locals.saveLoginData) {
        return res.redirect("/dashbord");
    }
    return res.render("index");
}
const register = (req, res) => {
    if (res.locals.saveLoginData) {
        return res.redirect("/dashbord");
    }
    return res.render("register");
}
const dashbord = (req, res) => {
    return res.render("dashbord");
}
const loginData = async (req, res) => {
    if (!req.cookies.otp_obj) {
        return res.redirect("/dashbord");
    }
    return res.redirect("back");
}
const RegData = async (req, res) => {
    try {
        const email = req.body.email;
        const checkEmail = await RegisterModel.findOne({ email });
        if (!checkEmail) {
            const add = await RegisterModel.create(req.body);
            if (add) {
                return res.redirect("/admin");
            }
        } else {
            console.log("User Not Register With Same Email");
            return res.redirect("back");
        }
    } catch (error) {
        console.log(error.message);
    }
}
const logout = (req, res) => {
    req.logout((error) => {
        if (error) {
            console.log("error at logout");
            return false;
        }
        return res.redirect("/admin");
    });
}
const forgot = (req, res) => {
    return res.render("forgot");
}
const otp = (req, res) => {
    if (req.cookies.otp_obj) {
        return res.render("otp-page");
    }
    return res.redirect("back");
}
const forgotData = async (req, res) => {
    try {
        let email = req.body.email;
        const compaier = await RegisterModel.findOne({ email });
        const id = compaier.id;
        if (!compaier) {
            console.log("Email Not found");
            return false;
        }
        else {
            let otp = Math.floor(Math.random() * 1000000);
            let obj = { email, otp, id }
            const transpoter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: "mayankkathiriya008@gmail.com",
                    pass: "kzhsmlavbhbjcylc"
                }
            });
            let mailoptions = {
                from: "mayankkathiriya008@gmail.com",
                to: email,
                subject: "For Your Reset Password Mail Form Sufee Admin",
                text: `Your One Time Password(OTP) is :- ${otp}`,
            };
            transpoter.sendMail(mailoptions, (err, info) => {
                if (err) {
                    console.log(err.message);
                } else {
                    res.cookie("otp_obj", obj);
                    console.log(`Email Sent Successfully To ${email}_${info.response}`);
                    return res.redirect("/otp");
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}
const otpData = async (req, res) => {
    if (req.body.otp == req.cookies.otp_obj.otp) {
        res.cookie("check", req.body.otp);
        return res.redirect("/reset");
    }
    console.log("otp Not Match");
    return res.redirect("back");
}
const reset = (req, res) => {
    if (req.cookies.check) {
        return res.render("reset");
    }
    return res.redirect("/otp");
}
const resetData = async (req, res) => {
    try {
        let id = req.cookies.otp_obj.id;
        let password = req.body.password;
        if (req.body.password == req.body.cpassword) {
            const update = await RegisterModel.findByIdAndUpdate(id, { password });
            if (update) {
                res.clearCookie("otp_obj");
                res.clearCookie("check");
                console.log("Password Update Successfully");
                return res.redirect("/admin");
            } else {
                return res.redirect("back");
            }
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
const profile = (req, res) => {
    return res.render("profile");
}
const ProfileUpdate = async (req, res) => {
    try {
        let id = res.locals.saveLoginData._id;

        if (req.file) {
            let avtar = `${imgPath}/${req.file.filename}`;
            const update = await RegisterModel.findByIdAndUpdate(id, Object.assign({ avtar }, req.body));
            if (update) {
                if (update.avtar !== "uploads/defaultIMg.png") {
                    fs.unlinkSync(update.avtar);
                }
            }
            return res.redirect("/dashbord");
        } else {
            const oldAvtar = res.locals.saveLoginData.avtar;
            const updates = await RegisterModel.findByIdAndUpdate(id, Object.assign({ oldAvtar }, req.body));
            if (updates) {
                return res.redirect("/dashbord");
            }
        }
    } catch (error) {
        console.log(error.message);
        return res.redirect("back");
    }
}
module.exports = {
    login,
    register,
    dashbord,
    RegData,
    loginData,
    logout,
    forgot,
    otp,
    forgotData,
    otpData,
    reset,
    resetData,
    profile,
    ProfileUpdate
    
}
