var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();


const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactsRouter = require('./routes/contactUs');
var ampereRouter = require('./routes/ampere');
var inverterRouter = require('./routes/inverter');
var batteryRouter = require('./routes/battery');
var panelRouter = require('./routes/panel');
var packageRouter = require('./routes/package');
var serviceRouter = require('./routes/service-info');
var uploadRouter = require('./routes/multer');

var app = express();
app.use('/upload/images/', express.static('Images'))

mongoose
.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("successfully connected");
})
.catch(console.error);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);
app.use('/amperes', ampereRouter);
app.use('/inverters', inverterRouter);
app.use('/batteries', batteryRouter);
app.use('/panels', panelRouter);
app.use('/packages', packageRouter);
app.use('/services', serviceRouter);
app.use("/upload", uploadRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
