'use strict';
var YOUR_API_KEY = 'AIzaSyCbt1MzT95dG4Tg9C-wF8BPH48Lyio3gok&v=3&callback=initMap',
    revLat,
    ajaxGeoCodeLatLng;

$(document).ready(function() {
    // Calling showListing() here cause the markers to load without user interaction and when the page is ready so that the buttons could have been removed .
    showListings();
});

/*
function geoCode takes the lat and long passed in and pass it to an ajax request which returns a response from the geocode google maps
api and from there the corresponding zip code is extracted
*/
function geoCode(lat, long) {
    revLat = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=' + YOUR_API_KEY;
    // console.log(revLat);
    ajaxGeoCodeLatLng = $.ajax(revLat)
        .done(function(htmlString) {
            // console.log(htmlString)
            var address = htmlString.results[0].address_components;
            var zipcode = address[address.length - 2].long_name;
            console.log(zipcode);
            return zipcode;
        })
        .fail(function(err) {
            console.log('error', err);
        })
        .always(function() {
            console.log('complete');
        });
}
