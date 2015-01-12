(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["knockout", "jquery"], factory);
	} else {
		// Browser globals
		factory(ko, $, _, ZapperModel);
	}
}(this, function (ko, $, _, ZapperModel) {

	ko.bindingHandlers.zapper = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var value = ko.utils.unwrapObservable(valueAccessor());

			//configire default settings
			viewModel.settings = configureSettings(allBindingsAccessor.get("settings"));

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

			//if (!$("#knockout-zapper__container__style").first())
			//$("<style id='knockout-zapper__container__style' type='text/css'>.knockout-zapper__container {position: relative;overflow: hidden;width: 100%;height: 100%;}</style>").appendTo("head");
			//if (!$("#knockout-zapper__template__style").first())
			//$("<style id='knockout-zapper__template__style' type='text/css'>.knockout-zapper__template {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}</style>").appendTo("head");

			var $container = $("<div class='knockout-zapper__container'></div>");
			$container.addClass("knockout-zapper__container");

			$notZappedTemplate.appendTo($container).addClass("knockout-zapper__template");
			$zappedTemplate.appendTo($container).addClass("knockout-zapper__template");

			$container.appendTo($element);

		},
		update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

			var value = ko.utils.unwrapObservable(valueAccessor());

			var $element = $(element),
                $zappedTemplate,
                $notZappedTemplate;

			$notZappedTemplate = $element.find("div[data-not-zapped]").first();
			$zappedTemplate = $element.find("div[data-zapped]").first();
			$container = $notZappedTemplate.parent(".knockout-zapper__container");

			if (value === false) {
				$notZappedTemplate.show();
				$zappedTemplate.hide();
			} else {
				//if it hasnt done its first update, dont do the animate to handle the case where
				//the valueaccessor is false from the start
				if (viewModel.hasDoneFirstUpdate) {
					//make a clone of the element and make it absolute and place right on top of the other.
					var $newElement = $element.clone().attr('id', $element.attr('id') + '__clone').attr('class', $element.attr('class'));
					var parentTagName = $element.parent()[0].tagName.toLowerCase();
					//if this is a list, or list group div, make sure to wrap the clone so it keeps its styles
					if (parentTagName == "ul" || $element.parent().hasClass("list-group")) {
						var $newList = $("<" + parentTagName + "></" + parentTagName + ">").attr('class', $element.parent().attr('class'));
						$newElement.appendTo($newList);
						$newElement = $newList;
					}

					$newElement.css({
						position: "absolute",
						width: "100%",
						height: "100%",
						left: $element.position().left,
						top: $element.position().top
					}).appendTo($element.parent());

					//now hide the not zapped template and show the zapped one, which will appear right under the sliding away clone
					//keep the height of the original element until the clone slides off
					var height = $notZappedTemplate.outerHeight();
					$notZappedTemplate.hide();
					$zappedTemplate.show();
					$zappedTemplate.height(height);

					//animate the clone off screen to the right and then remove it
					$newElement.animate({
						left: $(window).width() / 2,
						opacity: 0
					}, viewModel.settings.animateDuration, function () {
						$(this).remove();
						$zappedTemplate.height(getHeight($zappedTemplate));
					});
				}
			}
			viewModel.hasDoneFirstUpdate = true;
		}
	};

	ko.virtualElements.allowedBindings.zapper = true;

	function getHeight($element) {
		var $child = $element.children().first();
		var height = $child ? $child.outerHeight() : $element.outerHeight();
		return height;
	}

	function configureSettings(config) {
		if (!config) config = {};
		var settings = ko.utils.unwrapObservable(config);
		settings.animateDuration = valOrDefault(settings.animateDuration, 1000);
		return settings;
	}

	function valOrDefault(val, defValue) {
		return val || defValue;
	}

}));
