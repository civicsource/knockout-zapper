define(['knockout', 'jquery', "text!./template/with-both-templates.html", "src/knockout.zapper",
  "knockout.punches",
  "template!./template/with-both-templates.html!knockout-zapper--with-both-templates",
],
  function (ko, $) {
  	ko.punches.enableAll();

  	describe('Knockout Zapper', function () {
  		var viewModel,
  		element,
  		root,
  		model,
		scenario;
  		function notZappedIsVisible() {
  			return $(element).find('[data-not-zapped]').first().is(":visible");
  		}
  		function zappedIsVisible() {
  			return $(element).find('[data-zapped]').first().is(":visible");
  		}
  		function clonedElementIsVisible() {
  			return $("html").find('#knockout-zapper__binding__clone').first().is(":visible");
  		}

  		describe('when binding to an element', function () {
  			beforeEach(function () {
  				root = document.createElement('div');
  				document.body.appendChild(root);
  			});
  			afterEach(function () {
  				ko.cleanNode(root);
  				$(root).remove();
  			});

  			describe('with both zapped and not-zapped templates', function () {
  				beforeEach(function () {
  					scenario = 'with-both-templates';
  				});

  				describe('and a starting status of not zapped', function () {
  					beforeEach(function () {
  						viewModel = {
  							isZapped: ko.observable(false)
  						};
  						element = renderScenario(root, scenario, viewModel);
  					});

  					it('should be bound', function () {
  						expect(ko.dataFor(element)).toBe(viewModel);
  					});

  					it('should show the not-zapped template', function () {
  						expect(notZappedIsVisible()).toBe(true);
  					});

  					it('should not show the zapped template', function () {
  						expect(zappedIsVisible()).toBe(false);
  					});

  					describe('then zapping', function () {
  						beforeEach(function () {
  							viewModel.isZapped(true);
  						});

  						it('should not show the not-zapped template', function () {
  							expect(notZappedIsVisible()).toBe(false);
  						});

  						it('should show the zapped template', function () {
  							expect(zappedIsVisible()).toBe(true);
  						});

  						it('should show the cloned element animating', function () {
  							expect(clonedElementIsVisible()).toBe(true);
  						});

  						describe('after the duration', function () {
  							beforeEach(function (done) {
  								setTimeout(function () {
  									done();
  								}, 10); //set to 5 but give it an extra few millis
  							});

  							it('should not show the cloned element', function (done) {
  								expect(clonedElementIsVisible()).toBe(false);
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
  		ko.renderTemplate("knockout-zapper--" + name, viewModel, null, rootElement, "replaceChildren");
  		var element = document.getElementById('knockout-zapper__binding');
  		return element;
  	}
  });
