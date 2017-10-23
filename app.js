var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/proba');


var login = require('./controllers/login');
var app = express();
var db = require('./db');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login',login);
app.use('/register',require('./controllers/register'))
app.use('/logout',require('./controllers/logout'))
app.use('/macCheck',require('./controllers/macCheck'))
app.use('/countContacts',require('./controllers/countContacts'))
app.use('/sendContact',require('./controllers/sendContact'))
app.use('/getContacts',require('./controllers/getContacts'))
app.use('/checkContacts',require('./controllers/checkContacts'))
app.use('/getContacts',require('./controllers/getContacts'))

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

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/proba', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    } else {
        app.listen(3001, function() {
            console.log('Listening on port 3001...')
        })
    }
})
module.exports = app;
