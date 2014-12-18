(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["knockout", "jquery", "lodash","./model",
        "knockout.punches",
        'template!./template/index.html!knockout-zapper-main'
		], factory);
	} else {
		// Browser globals
		factory(ko, $, _, ZapperModel);
	}
}(this, function (ko, $, _, ZapperModel) {

	ko.bindingHandlers.zapper = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			element.model = new ZapperModel();
			element.model.instanceName = allBindingsAccessor.get('id') || _.uniqueId("zapper--");
			ko.renderTemplate("knockout-zapper-main", element.model, null, element, "replaceChildren");
			return {
				controlsDescendantBindings: true
			};
		},
		update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

			var value = ko.utils.unwrapObservable(valueAccessor());
		}
	};

	ko.virtualElements.allowedBindings.zapper = true;

}));
