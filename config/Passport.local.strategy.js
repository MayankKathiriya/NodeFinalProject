const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const RegisterModel = require("../models/Register.Model");
passport.use(new passportLocal({
    usernameField: "email"
}, async (email, password, done) => {
    try {
        const add = await RegisterModel.findOne({ email });
        if (!add || add.password != password) {
            return done(null, false);
        }
        return done(null, add);
    } catch (error) {
        console.log(error.message);
    }
}));
passport.serializeUser((add, done) => {
    return done(null, add.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const data = await RegisterModel.findById(id);
        if (!data) {
            return done(null, false)
        }
        return done(null, data);
    } catch (error) {
        console.log(error.message);
    }
});
passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/");
}
passport.setAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.saveLoginData = req.user;
    }
    return next();
}
module.exports = passport;
