require("dotenv").config();

var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const upload = require("express-fileupload");
const passport = require("passport");

const connect = require("./db/connectDB");
require("./auth/auth");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var questionRouter = require("./routes/questions");

var app = express();
app.use(upload());

app.use(
    cors({
        origin: "*",
    })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connect();

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/questions", questionRouter);

module.exports = app;
