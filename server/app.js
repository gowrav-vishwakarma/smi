var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const connect = require('./db/connectDB')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
connect();

const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})


module.exports = app;
