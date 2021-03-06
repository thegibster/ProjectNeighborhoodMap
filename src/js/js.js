'use strict';
var map;
// Create a new blank array for all the listing markers.
var markers = [];
var locations;
var filteredListing;
// var review = new Promise(function(resolve,reject){resolve($.get('/yelping'))});
var review;
var venueJson;
// var locationsArrayNames =['Park Ave Penthouse', 'Chelsea Loft', 'Union Square Open Floor Plan', 'East Village Hip Studio', 'TriBeCa Artsy Bachelor Pad', 'Chinatown Homey Space'];
var locationsArrayNames = [];
var largeInfowindow;

function initMap() {
    // Constructor creates a new map - only center and zoom are required. From Google Maps Api course in this lesson
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.7413549,
            lng: -73.9980244
        },
        zoom: 13,
        mapTypeControl: false
    });

    // These are the real estate listings that will be shown to the user.
    // Normally we'd have these in a database instead.
    locations = [{
        title: 'Park Ave Penthouse',
        location: {
            lat: 40.7713024,
            lng: -73.9632393
        }
    }, {
        title: 'Chelsea Loft',
        location: {
            lat: 40.7444883,
            lng: -73.9949465
        }
    }, {
        title: 'Union Square Open Floor Plan',
        location: {
            lat: 40.7347062,
            lng: -73.9895759
        }
    }, {
        title: 'East Village Hip Studio',
        location: {
            lat: 40.7281777,
            lng: -73.984377
        }
    }, {
        title: 'TriBeCa Artsy Bachelor Pad',
        location: {
            lat: 40.7195264,
            lng: -74.0089934
        }
    }, {
        title: 'Chinatown Homey Space',
        location: {
            lat: 40.7180628,
            lng: -73.9961237
        }
    }];
    //locationsArrayNames = locations.map(function(obj){return obj.title});
    largeInfowindow = new google.maps.InfoWindow();

    // The following group uses the location array to create an array of markers on initialize.
    (function runMap() {
        for (var i = 0; i < locations.length; i++) {
            // Get the position from the location array.
            var position = locations[i].location;
            //console.log(position);
            var title = locations[i].title;
            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                position: position,
                title: title,
                animation: google.maps.Animation.DROP,
                id: i
            });
            // Push the marker to our array of markers.
            markers.push(marker);
            //Populate the list where the user can select to filter from.
            locationsArrayNames.push(marker.title);

            // Create an onclick event to open an infowindow at each marker.
            marker.addListener('click', function() {
                populateInfoWindow(this, largeInfowindow);
                this.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                for(var y = 0; y<markers.length; y++){
                  //If the marker is not the current one, then set it to red.
                  if(markers[y] != this){
                    markers[y].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
                  }
                }
            });
            marker.addListener('click', toggleBounce);
            google.maps.event.addListener(largeInfowindow, 'closeclick', function() {
                // stop marker animation here
                console.log("closeclick testing");
                this.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            });
        }
    })();
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);

    window.onresize = function() {
      map.fitBounds(bounds); // `bounds` is a `LatLngBounds` object
      console.log("resized");
    }

    ko.applyBindings(new NeighborhoodList());
}

function toggleBounce() {
    var self = this;
    if (self.getAnimation() !== null) {
        self.setAnimation(null);
    } else {
        self.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.setAnimation(null);
        }, 1000);
    }
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        // review.then(function(value){console.log("hello yo",JSON.parse(value).rating)});
        /* review is the result of an ajax call to the back-end route passing the lat/lng as parameters
           after it has resolved the parsed JSON value is passed to venueJson
        */
        review = $.get('/yelping', {
                    lat: getLat(marker.title),
                    lng: getLng(marker.title)
                  });

        review.then(function(value) {
            venueJson = JSON.parse(value);
            // For each item up to the hard 5 limit , an item is generated with the yelp review
            var populatePlacesArray = venueJson.map(function(item) {
                // $('.fa .fa-spinner .fa-spin .fa-3x .fa-fw');
                return '<div class="yummy ">' + '<div>' + item.name + '</div>' +
                    '<div><a href=' + item.url + 'target="_blank" ><img src =' + item.image_url + '></></a>' + '</div> ' +
                    '<div><img src =' + item.rating_img_url + '></>' + '</div>' + '</div';
            });
            infowindow.setContent(
                //Should use the lat long here to  call the route to populate an iframe
                '<div id="yelp-review-container">' + populatePlacesArray + '</div>'
            );
            // Resize the drop down list dynamically
            var selectDrop = $("#dropme");
            selectDrop.size = selectDrop.length;
        }).catch(function(err){
          infowindow.setContent('<div id="yelp-review-container">' + '<div class="yummy">' +
            "Error Loading Yelp Review Content! Please check network connection." + '</div>'+ '</div>');
        });

        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
            review = null;
            venueJson = null;
        });
    }
}

// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
document.getElementById('submitted').addEventListener('submit', function(event) {
    event.preventDefault();
});

function getLat(title) {
    for (var y = 0; y < locations.length; y++) {
        if (locations[y].title == title) {
            // console.log("success lat ", locations[y].location.lat.toString());
            return locations[y].location.lat.toString();
        }
    }
}

function getLng(title) {
    for (var y = 0; y < locations.length; y++) {
        if (locations[y].title == title) {
            // console.log("success lat ", locations[y].location.lat.toString());
            return locations[y].location.lng.toString();
        }
    }
}
