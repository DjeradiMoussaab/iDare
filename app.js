var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const http = require("http");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','X-Requested-With, Origin, Content-Type, Authorization, Form-Data');
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE');
  next();
});



var usersRouter = require('./routes/users');
app.use('/users', usersRouter);

module.exports = app;
