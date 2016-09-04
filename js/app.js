var NeighborhoodList = function () {
    this.itemToAdd = ko.observable("");
    this.allItems = ko.observableArray(locationsArrayNames); // Initial items
    this.selectedItems = ko.observableArray(["Chelsea Loft"]);                                // Initial selection
    this.query = ko.observable("");

    this.search = ko.computed(function () {
        var filter = this.query().toLowerCase();

        if (!filter) {
            pleaseWork = this.allItems();
            return this.allItems();
        } else {
            // locations = ko.utils.arrayFilter(this.allItems(), function (item) {
            //     return item.toLowerCase().indexOf(filter) !== -1;
            // });
            giggle();
            pleaseWork= ko.utils.arrayFilter(this.allItems(), function (item) {
                return item.toLowerCase().indexOf(filter) !== -1;
            });
            return ko.utils.arrayFilter(this.allItems(), function (item) {
                return item.toLowerCase().indexOf(filter) !== -1;
            });
        }
        // showListings() ;
        // // Using markers[indexOfMarker].setMap(null); will remove the marker not in the to show from filter
        // for(var y in this.search){
        //   // if(locationsArrayNames.indexOf(markers[y].title) <= -1 ){
        //   // markers[y].setMap(null);
        //   // console.log(y);
        //   // }
        //   console.log(y + "mhm");
        // }
        // runMap();
         giggle();
    },this);
}

function giggle(){console.log("hehe",pleaseWork);






    this.addItem = function () {
        if ((this.itemToAdd() != "") && (this.allItems.indexOf(this.itemToAdd()) < 0)) // Prevent blanks and duplicates
            this.allItems.push(this.itemToAdd());
        this.itemToAdd(""); // Clear the text box
    };

    this.removeSelected = function () {
        this.allItems.removeAll(this.selectedItems());
        this.selectedItems([]); // Clear selection
    };

    this.sortItems = function() {
        this.allItems.sort();
    };
};

ko.applyBindings(new NeighborhoodList());

