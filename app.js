var express = require('express');
var app = express();
const path = require('path');
const passport = require('passport');

require('./Config/DBconnection');
require('./Models/user');
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var usersRouter = require('./routes/users');
app.use('/users', usersRouter);

module.exports = app;
