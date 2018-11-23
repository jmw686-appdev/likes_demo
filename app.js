require('dotenv').config();
const createError = require('http-errors');
const express = require('express'),
  passport = require('passport'),
  passportConfig = require('./passport'),
  session = require('express-session'),
  grant = require('grant-express')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

let tumblrConfig = {
  "tumblr": {
    "key": process.env.TUMBLR_CONSUMER_KEY,
    "secret": process.env.TUMBLR_CONSUMER_SECRET,
    "scope": ["scope1", "scope2", ...],
    "callback": "/tumblr/callback"
  }
}

// mongoose.connect('mongodb://localhost:27017/mlab-test',
//   { useNewUrlParser: true,
//     useCreateIndex: true
//   });
mongoose.connect('mongodb://' + process.env.MLAB_USER + ':' + process.env.MLAB_PW + process.env.MLAB_DB,
  { useNewUrlParser: true,
    useCreateIndex: true
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("this world has been connected");
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
   cookie: {},
    saveUninitialized: true, resave: false
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.basedir = app.get('views');

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
