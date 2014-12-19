(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["knockout", "jquery", "lodash"], factory);
    } else {
        // Browser globals
        factory(ko, $, _, ZapperModel);
    }
}(this, function(ko, $, _, ZapperModel) {

	var config = {
		animateDuration: 1000
	}

    ko.bindingHandlers.zapper = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
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
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
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

                //todo: check if this is a list etc.. if we are going to support other types of scenarios
                $newList = $("<ul></ul>").attr('class', $element.parent().attr('class'));
                var clone = $element.clone().attr('id',$element.attr('id') + '__clone').appendTo($newList);

                $newList.css({
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: $element.position().left,
                    top: $element.position().top,
                    zIndex: 1000000
                }).appendTo($element.parent());
                $notZappedTemplate.hide();
                $zappedTemplate.show();
                $newList.animate({
                    left: $(window).width()
                }, config.animateDuration, function() {
                    $(this).remove();
                });
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

    return {
		config: config
    }

}));
