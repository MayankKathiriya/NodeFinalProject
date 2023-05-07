require("dotenv").config();
const express = require("express");
const path = require("path");

const port = process.env.PORT || 9500;

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public/Admin")));
app.use(express.static(path.join(__dirname, "public/user")));
app.use("/uploads", express.static(path.join("uploads")));

const mongodb = require("mongodb");
const passport = require("passport");
const passportLocal = require("./config/Passport.local.strategy");
const session = require("express-session");
const nodemailer = require("nodemailer");
const cookie = require("cookie-parser");
const connectDB = require("./config/connectDB");

const connect_session = require("connect-mongo");

app.use(session({
    secret: "MayankKAthiriya",
    saveUninitialized: true,
    resave: true,
    store : new connect_session({
        mongoUrl : "mongodb+srv://mayankkathiriya008:36MgeSx1QkbV3e2z@nodejs.exnjezb.mongodb.net/FinalProject?retryWrites=true&w=majority",
        collectionName : "sessions"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60  // 1 hour
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use(cookie());

app.use(express.urlencoded({ extended: true }));


app.use("/", require("./routes/user/yom.routes"));
const StartServer = async () => {
    app.listen(port, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Server Listening on Port:- ${port}`);
    });
    await connectDB();
}
StartServer();  