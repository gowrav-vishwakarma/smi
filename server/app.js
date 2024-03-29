require("dotenv").config();

var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const upload = require("express-fileupload");
const mongoose = require("mongoose");
mongoose.set("debug", true);

const connect = require("./db/connectDB");
require("./auth/auth");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var questionRouter = require("./routes/questions");
var commentRouter = require("./routes/comment");
var offerRouter = require("./routes/offer");
var solutionRouter = require("./routes/solution");
var voteRouter = require("./routes/votes")
var reportRouter = require("./routes/reports")

var app = express();
app.use(
    upload({
        limits: {
            fileSize: 10000000, //10mb
        },
        abortOnLimit: true,
    })
);

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
app.use("/comment", commentRouter);
app.use("/offer", offerRouter);
app.use("/solution", solutionRouter);
app.use("/vote", voteRouter);
app.use("/report", reportRouter);

module.exports = app;
