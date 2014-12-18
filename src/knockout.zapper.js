(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["knockout", "jquery", "lodash", "./model",
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
			//element.model = new ZapperModel();
			//element.model.instanceName = allBindingsAccessor.get('id') || _.uniqueId("zapper--");
			//ko.renderTemplate("knockout-zapper-main", element.model, null, element, "replaceChildren");

			var $element = $(element),
				$zappedTemplate,
				$notZappedTemplate;

			$notZappedTemplate = $element.find("div[data-not-zapped]").first();
			$zappedTemplate = $element.find("div[data-zapped]").first();

			if (value === false) {
				$notZappedTemplate.show();
				$zappedTemplate.hide();
			} else {
				$notZappedTemplate.hide();
				$zappedTemplate.show();
			}

		},
		update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var value = ko.utils.unwrapObservable(valueAccessor());

			var settings = configureSettings(allBindingsAccessor.get('settings'));

			var $element = $(element),
				$zappedTemplate,
				$notZappedTemplate;

			$notZappedTemplate = $element.find("div[data-not-zapped]").first();
			$zappedTemplate = $element.find("div[data-zapped]").first();

			if (value === false) {
				$notZappedTemplate.show();
				$zappedTemplate.hide();
			} else {
				$notZappedTemplate.hide();
				$zappedTemplate.show();
			}
		}
	};

	ko.virtualElements.allowedBindings.zapper = true;

	function configureSettings(config) {
		if (!config) config = {};
		var settings = ko.utils.unwrapObservable(config);
		settings.zapEffect = valOrDefault(settings.zapEffect, "");
	}
	function valOrDefault(val, defValue) {
		return val || defValue;
	}

}));
