define(['knockout', 'jquery',"text!./template/with-both-templates.html",
  "src/knockout.zapper",
  "knockout.punches",
  "template!./template/with-both-templates.html!knockout-zapper--with-both-templates",
],
  function(ko,$,withBothTemplates) {
  	ko.punches.enableAll();

  	describe('Knockout Zapper', function() {
  		var viewModel,
  		element,
  		root,
  		model,
		scenario;

  		describe('when binding to an element', function() {
  			beforeEach(function(){
  				root = document.createElement('div');
  				document.body.appendChild(root);
  			});
  			afterEach(function() {
  				ko.cleanNode(root);
  				$(root).remove();
  			});

  			describe('with both zapped and not-zapped templates',function(){
  				beforeEach(function () {
  					scenario = 'with-both-templates';
  				});
  				
  				describe('and a starting status of not zapped',function(){
  					beforeEach(function () {
  						viewModel = {
  							isZapped: ko.observable(false)
  						};
  						element = renderScenario(root,scenario,viewModel);
  					});

  					it('should be bound', function() {
  						expect(ko.dataFor(element)).toBe(viewModel);
  					});

  					it('should show the not-zapped template', function() {
  						expect($(element).find('[data-not-zapped]').first().is(":visible")).toBe(true);
  					});

  					it('should not show the zapped template', function () {
  						expect($(element).find('[data-zapped]').first().is(":visible")).toBe(false);
  					});

  					describe('then zapping', function () {
  						beforeEach(function () {
  							viewModel.isZapped(true);
  						});

  						it('should not show the not-zapped template', function () {
  							expect($(element).find('[data-not-zapped]').first().is(":visible")).toBe(false);
  						});

  						it('should show the zapped template', function () {
  							expect($(element).find('[data-zapped]').first().is(":visible")).toBe(true);
  						});
  					});
  				});
  			});
  			
  		});

  	});
  	function renderScenario(rootElement,name,viewModel) {
  		if (!viewModel) {
  			viewModel = {};
  		}
  		viewModel.scenario = name;
  		ko.renderTemplate("knockout-zapper--" + name, viewModel, null, rootElement, "replaceChildren");
  		var element = document.getElementById('knockout-zapper__binding');
  		return element;
  	}
  });
