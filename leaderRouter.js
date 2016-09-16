var express = require('express');
var bodyParser = require('body-parser');
var leaderRouter = express.Router();
var fetch = require('node-fetch');
var Yelp = require('yelp');
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){

        var result;
        var yum;
        // res.end('Will send all the leaders to you!');
        var yelp = new Yelp({
          consumer_key: 'BXh2TvLI9TerhMYdSxHvCw',
          consumer_secret: 'PzeU5a8V5NltIdCldIbxGBEKtmo',
          token: 'o07xHbkMyKyz1TmDHk0MfWEaOr4ngj4U',
          token_secret: 'WBDdjTOkZoEZZ_w7-w4b4yAlFdQ',
        });


         Promise.resolve(
            // See http://www.yelp.com/developers/documentation/v2/search_api
            // ll:'37.788022,-122.399797'

            yelp.search({ term: 'food', /*location: 'Montreal'*/ll:req.query.lat+','+req.query.lng ,total:5})
            .then(function (data) {
              if(data.businesses.length>= 5){
                  result = data.businesses.slice(0,5);
                  return result;
              }
              else{
                result = data.businesses.slice();
                return result;
              }
              /* Take this data and push into react module for when a marker is pressed and populated
              */
              console.log(result[0]);
            })
            .catch(function (err) {
              console.error(err);
            })


          ).then(s =>  res.end(JSON.stringify(s[0])));
         /*
          !!!!!
              This is where the data gets to the front from the back, the return data needed
              to be converted to json to fix the error that was persisting until now.
          !!!!!
         */

})

.post(function(req, res, next){
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting all leaders');
});

leaderRouter.route('/:leaderId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){

        res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');

})

.put(function(req, res, next){
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;
