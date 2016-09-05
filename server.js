var express     = require('express');
var path        = require('path');

var logger        = require('morgan');
var cookieParser = require('cookie-parser');
var rp           = require('request-promise');
var bodyParser = require('body-parser');

app = express();


app.use(express.static(__dirname));






var urlTerm = "https://gist.githubusercontent.com/erichurst/7882666/raw/5bdc46db47d9515269ab12ed6fb2850377fd869e/US%2520Zip%2520Codes%2520from%25202013%2520Government%2520Data";
var YOUR_API_KEY ="AIzaSyCbt1MzT95dG4Tg9C-wF8BPH48Lyio3gok&v=3&callback=initMap";
var revLat ="https://maps.googleapis.com/maps/api/geocode/json?latlng=40.7180628,-73.9961237&key=" + YOUR_API_KEY;
rp(revLat)
    .then(function (htmlString) {
        // Process html...
        // var collectLoc = htmlString;
        // var hotPoata = collectLoc.split('\n');
        // // console.log( hotPoata);
        // for(var l in hotPoata){
        //   if(hotPoata[l].split(",")[0] == "90018"){
        //     console.log(hotPoata[l])
        //   }
        // }
        //console.log(hotPoata[hotPoata.length-2].split(",")[0]);
        var address = JSON.parse(htmlString).results[0].address_components;
        var zipcode = address[address.length -2].long_name;
        console.log(zipcode);
          // console.log( JSON.parse(htmlString).results[0].address_components.length - 1.long_name);
    })
    .catch(function (err) {
        // Crawling failed...
        console.log("F for failed");
    });

//start listening on port 3000
app.listen(3000);
