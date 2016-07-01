require("jsdom-global")();

var ko = require("knockout");
var $ = require("jquery");
require("../src/knockout.zapper");
require("knockout-punches");
var expect = require("chai").expect;
require("knockout-template-loader/lib/string-template-engine");

ko.punches.enableAll();

var TEST_TEMPLATE = `
<div id="knockout-zapper__binding" data-bind="zapper: isZapped, settings:{animateDuration:5}">
	<div data-not-zapped>
		not-zapped
	</div>
	<div data-zapped>
		zapped
	</div>
</div>
`;

ko.templates.test1 = TEST_TEMPLATE;

describe("Knockout Zapper", function () {
	var viewModel,
		element,
		root,
		scenario;
	function notZappedIsVisible() {
		return $(element).find("[data-not-zapped]").first().is(":visible");
	}
	function zappedIsVisible() {
		return $(element).find("[data-zapped]").first().is(":visible");
	}
	function clonedElementIsVisible() {
		return $("html").find("#knockout-zapper__binding__clone").first().is(":visible");
	}

	describe("when binding to an element", function () {
		beforeEach(function () {
			root = document.createElement("div");
			document.body.appendChild(root);
		});
		afterEach(function () {
			ko.cleanNode(root);
			$(root).remove();
		});

		describe("with both zapped and not-zapped templates", function () {
			beforeEach(function () {
				scenario = "with-both-templates";
			});

			describe("and a starting status of not zapped", function () {
				beforeEach(function () {
					viewModel = {
						isZapped: ko.observable(false)
					};
					element = renderScenario(root, scenario, viewModel);
				});

				it("should be bound", function () {
					expect(ko.dataFor(element)).to.eql(viewModel);
				});

				it("should show the not-zapped template", function () {
					expect(notZappedIsVisible()).to.be.true;
				});

				it("should not show the zapped template", function () {
					expect(zappedIsVisible()).to.be.false;
				});

				describe("then zapping", function () {
					beforeEach(function () {
						viewModel.isZapped(true);
					});

					it("should not show the not-zapped template", function () {
						expect(notZappedIsVisible()).to.be.false;
					});

					it("should show the zapped template", function () {
						expect(zappedIsVisible()).to.be.true;
					});

					it("should show the cloned element animating", function () {
						expect(clonedElementIsVisible()).to.be.true;
					});

					describe("after the duration", function () {
						beforeEach(function (done) {
							setTimeout(function () {
								done();
							}, 10); //set to 5 but give it an extra few millis
						});

						it("should not show the cloned element", function (done) {
							expect(clonedElementIsVisible()).to.be.false;
							done();
						});
					});
				});
			});
		});

	});

});
function renderScenario(rootElement, name, viewModel) {
	if (!viewModel) {
		viewModel = {};
	}
	viewModel.scenario = name;
	ko.templates[name] = TEST_TEMPLATE;
	ko.renderTemplate(name, viewModel, null, rootElement, "replaceChildren");
	var element = document.getElementById("knockout-zapper__binding");
	return element;
}
