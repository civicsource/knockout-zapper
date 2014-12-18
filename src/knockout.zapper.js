(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["knockout", "jquery"], factory);
	} else {
		// Browser globals
		factory(ko, $);
	}
}(this, function (ko, $) {

	ko.bindingHandlers.zapper = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

		},
		update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

			element.value = ko.utils.unwrapObservable(valueAccessor());
		}
	};
}));
