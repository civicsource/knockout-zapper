define(["jquery", "knockout", "lodash",
	"knockout.punches",
	"./src/knockout.zapper"],
    function ($, ko, _) {
    	ko.punches.enableAll();

    	function Person(firstName) {
    		this.firstName = firstName;
    		this.isZapped = ko.observable(firstName == "Brian" ? true : false);
    	}

    	Person.prototype.zap = function () {
    		this.isZapped(true);
    	};
    	Person.prototype.unZap = function () {
    		this.isZapped(false);
    	};

    	var names = [
    		"Chad",
			"DJ",
			"Brian",
			"Mark",
			"Alex"
    	];
    	var names2 = [
    		"Will",
			"Brian",
			"Tom",
			"Clark",
			"Anuj"
    	];

    	var viewModel = {
    		people: _.map(names, function (name) { return new Person(name); }),
    		people2: _.map(names2, function (name) { return new Person(name); })
    	};

    	ko.applyBindings(viewModel);
    });
