'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var yelpRouter = express.Router();
var fetch = require('node-fetch');
var Yelp = require('yelp');
yelpRouter.use(bodyParser.json());

yelpRouter.route('/')
    .all(function(req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next();
    })
    /*calling the get route for the yelp router will trigger a call to the yelp api
    returning a promise in JSON format that is called from js.js during the map populate function
    */
    .get(function(req, res, next) {

        var result;
        var yum;
        var yelp = new Yelp({
            consumer_key: 'BXh2TvLI9TerhMYdSxHvCw',
            consumer_secret: 'PzeU5a8V5NltIdCldIbxGBEKtmo',
            token: 'o07xHbkMyKyz1TmDHk0MfWEaOr4ngj4U',
            token_secret: 'WBDdjTOkZoEZZ_w7-w4b4yAlFdQ',
        });


        Promise.resolve(
            // See http://www.yelp.com/developers/documentation/v2/search_api
            // ll:'37.788022,-122.399797'
            /*The yelp search takes the request parameters from the location of the map marker
              and grabs up to 5 restaurants from that location
            */
            //Commented upper code is for testing purposes
            yelp.search({
                term: 'food',
                /*location: 'Montreal'*/ ll: req.query.lat + ',' + req.query.lng,
                total: 5 // Only return the top 5 results
            })
            .then(function(data) {
                if (data.businesses.length >= 5) {
                    result = data.businesses.slice(0, 5);
                    return result;
                } else {
                    result = data.businesses.slice();
                    return result;
                }

                console.log(result[0]);
            })
            .catch(function(err) {
                console.error(err);
            })


        ).then(s => res.end(JSON.stringify(s)));
        /*
         !!!!!
             This is where the data gets to the front from the back, the return data needed
             to be converted to json to fix the error that was persisting until now.
         !!!!!
        */

    })

module.exports = yelpRouter;
