var ko = require("knockout");
require("../src/knockout.zapper");

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
	people: names.map(name => new Person(name)),
	people2: names2.map(name => new Person(name))
};

ko.applyBindings(viewModel);
