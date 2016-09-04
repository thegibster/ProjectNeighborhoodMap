var NeighborhoodList = function () {
    this.itemToAdd = ko.observable("");
    this.allItems = ko.observableArray(locationsArrayNames); // Initial items
    this.selectedItems = ko.observableArray(["Chelsea Loft"]);                                // Initial selection
    this.query = ko.observable("");

    this.search = ko.computed(function () {
        var filter = this.query().toLowerCase();

        if (!filter) {
            return this.allItems();
        } else {
            return ko.utils.arrayFilter(this.allItems(), function (item) {
                return item.toLowerCase().indexOf(filter) !== -1;
            });
        }
    },this);









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
//NeighborhoodList.query.subscribe(NeighborhoodList.search);
