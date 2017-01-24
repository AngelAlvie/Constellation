var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var passport = require('passport');
var expressSession = require('express-session');
var initPassport = require('./passport/passport-init');

var app = express();

// connect to the database
mongoose.connect('mongodb://constellation-mit:lMpYHmqG8dr6g2LG9CyxeXYh4FUVw1nGiGm87cIhx9HFaobkbqIvYp1gWm7R0MiADOKqS1TdKKJCXEBictD6JQ==@constellation-mit.documents.azure.com:10250/?ssl=true');

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'database connection error:'));
connection.on('connected', function() {
  console.log("database connected!");
});

var mongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://constellation-mit:lMpYHmqG8dr6g2LG9CyxeXYh4FUVw1nGiGm87cIhx9HFaobkbqIvYp1gWm7R0MiADOKqS1TdKKJCXEBictD6JQ==@constellation-mit.documents.azure.com:10250/?ssl=true", function (err, db) {
  db.close();
});

//initialize passport
app.use(expressSession({secret: 'someSecretKey'}));
app.use(passport.initialize());
app.use(passport.session());


initPassport(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
