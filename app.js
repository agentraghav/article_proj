var createError = require('http-errors');
var express = require('express');
var methodOverride = require('method-override')
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog', {useUnifiedTopology:true, useNewUrlParser: true }).catch((reason)=> {
    console.log('Unable to connect to the mongodb instance. Error: ', reason)});
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.use(express.urlencoded({ extended: false }));
var  homepage = require('./routes/index')
var new_article = require('./routes/article')



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',homepage)
app.use('/article',new_article)
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
