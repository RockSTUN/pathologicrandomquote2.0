var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser'); //changed
var cors = require('cors'); //changed
var dotenv = require('dotenv')
dotenv.config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var charAPIRouter = require("./routes/charactersAPI"); //changed
var randomQuoteRouter = require('./routes/randomQuoteAPI');//changed
var changeDatabaseRouter = require('./routes/changeDatabaseAPI');//changed
//music test
var audioRouter = require('./routes/rythm');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors()); //changed
app.use('/', function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", '*');
    next();
})

app.use(logger('dev'));
app.use(bodyParser.json()); //changed express -> body-parser
app.use(bodyParser.urlencoded({ extended: false })); //changed express -> body-parser
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);

app.use('/charactersAPI',charAPIRouter); //changed
app.use('/randomQuoteAPI', randomQuoteRouter); //changed
app.use('/changeDatabaseAPI', changeDatabaseRouter); //changed
//music test
app.use('/audio', audioRouter);




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
