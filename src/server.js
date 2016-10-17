'use strict';
var express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    yelpRouter = require('./yelpRouter'),
    cookieParser = require('cookie-parser'),
    rp = require('request-promise'),
    bodyParser = require('body-parser'),
    hostname = 'localhost',
    port = 3000,
    app = express(),
    Yelp = require('yelp'),
    result;

app.use(morgan('dev'));


app.use('/yelping', yelpRouter);

app.use(express.static(__dirname + '/../dist'));

app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`); //ES6 backtick notation
});
