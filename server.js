'use strict';
var express = require('express');
var path = require('path');
var logger = require('morgan'); // check to see if this line is needed
var morgan = require('morgan');
var yelpRouter = require('./yelpRouter');
var cookieParser = require('cookie-parser');
var rp = require('request-promise');
var bodyParser = require('body-parser');
var hostname = 'localhost';
var port = 3000;
var app = express();
var Yelp = require('yelp');
var result;

app.use(morgan('dev'));


app.use('/yelping', yelpRouter);

app.use(express.static(__dirname));
//app.use(express.static(__dirname + '/public'));


//Todo, move this yelp call into a route
// var yelp = new Yelp({
//   consumer_key: 'BXh2TvLI9TerhMYdSxHvCw',
//   consumer_secret: 'PzeU5a8V5NltIdCldIbxGBEKtmo',
//   token: 'o07xHbkMyKyz1TmDHk0MfWEaOr4ngj4U',
//   token_secret: 'WBDdjTOkZoEZZ_w7-w4b4yAlFdQ',
// });

// // See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({ term: 'food', /*location: 'Montreal'*/ll:'37.788022,-122.399797' ,total:5})
// .then(function (data) {
//   if(data.businesses.length>= 5){
//       result = data.businesses.slice(0,5);
//   }
//   else{
//     result = data.businesses.slice();
//   }
//   /* Take this data and push into react module for when a marker is pressed and populated
//   */
//   console.log(result[0]);
// })
// .catch(function (err) {
//   console.error(err);
// });

//start listening on port 3000
//app.listen(3000);
app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`); //ES6 backtick notation
});
