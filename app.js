'use strict'

//requires
var express = require('express');
var bodyParser = require('body-parser');

//express
var app = express();


//load file routes
var user_routes = require('./routes/user');
var client_routes = require('./routes/client');
var policy_routes = require('./routes/policy');

var email = require('./services/email.js');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

//rewrite routes
app.use('/api', user_routes);
app.use('/api', client_routes);
app.use('/api', policy_routes);

//export module
module.exports = app;