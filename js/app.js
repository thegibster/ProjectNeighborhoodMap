'use strict';
//KnockOut controlls are in this file.
var NeighborhoodList = function() {
    this.itemToAdd = ko.observable('');
    this.allItems = ko.observableArray(locationsArrayNames); // Initial items
    this.selectedItems = ko.observableArray(['Chelsea Loft']); // Initial selection
    this.query = ko.observable('');


    this.search = ko.computed(function() {
        var filter = this.query().toLowerCase();

        //If there is no typing happening in the search box then the list is shown in the current search match
        if (!filter) {
            filteredListing = this.allItems();
            applyFilter();
            return this.allItems();
        } else {
        //Else the view will have a filtered list from which to draw from
            applyFilter();
            filteredListing = ko.utils.arrayFilter(this.allItems(), function(item) {
                return item.toLowerCase().indexOf(filter) !== -1;
            });
            return ko.utils.arrayFilter(this.allItems(), function(item) {
                return item.toLowerCase().indexOf(filter) !== -1;
            });
        }

        applyFilter();
    }, this);
};
//applyFilter runs everytime a keyup event happens and goes through a viewlist to see if a markers matches by name and if not it is set to null and out of the view.
function applyFilter() {
    for (var y in markers) {
        if (filteredListing.indexOf(markers[y].title) < 0) {
            markers[y].setMap(null);
            console.log(markers[y].title);
        } else {
            markers[y].setMap(map);
        }
    }

};

ko.applyBindings(new NeighborhoodList());
