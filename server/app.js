var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const connect = require("./db/connectDB");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
connect();

<<<<<<< HEAD
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login'); //authorization
app.use(logger('dev'));
=======
const cors = require("cors");
app.use(
    cors({
        origin: "*",
    })
);
app.use(logger("dev"));
>>>>>>> dbee4322ebec64ffcd81795dfe61029e81df63b5
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
