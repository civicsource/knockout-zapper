define(["jquery", "knockout", "../src/knockout.zapper"],
    function($, ko) {
        var viewModel = {
        	value: ko.observable()
        };
        ko.applyBindings(viewModel);
    });
