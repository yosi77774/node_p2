var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

var indexRouter = require('./routes/index');
var LoginRouter = require('./routes/Login');
var CreateAccountRouter = require('./routes/CreateAccount');
var MainRouter = require('./routes/Main');
var MovisRouter = require('./routes/Movis');
var SubscriptionsRouter = require('./routes/Subscriptions');
var UsersManagementRouter = require('./routes/UsersManagement');
var AddUserRouter = require('./routes/AddUser');
var UsersRouter = require('./routes/Users');
var Edit_uRouter = require('./routes/Edit_u');
var AllMoviesRouter = require('./routes/AllMovies');
var EditMovieRouter = require('./routes/EditMovie');
var AddMovieRouter = require('./routes/AddMovie');
var AllMembersRouter = require('./routes/AllMembers');
var AddMemberRouter = require('./routes/AddMember');
var EditMemberRouter = require('./routes/EditMember');

var app = express();

app.use(session({ secret : 'MySecret' }) )

require('./configs/database')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Login', LoginRouter);
app.use('/CreateAccount', CreateAccountRouter);
app.use('/Main', MainRouter);
app.use('/Movis', MovisRouter);
app.use('/Subscriptions', SubscriptionsRouter);
app.use('/UsersManagement', UsersManagementRouter);
app.use('/AddUser', AddUserRouter);
app.use('/Users', UsersRouter);
app.use('/Edit_u', Edit_uRouter);
app.use('/AllMovies', AllMoviesRouter);
app.use('/EditMovie', EditMovieRouter);
app.use('/AddMovie', AddMovieRouter);
app.use('/AllMembers', AllMembersRouter);
app.use('/AddMember', AddMemberRouter);
app.use('/EditMember', EditMemberRouter);

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
