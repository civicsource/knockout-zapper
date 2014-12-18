define(['knockout','jquery',
  "src/knockout.zapper"
  ],
  function(ko,$) {

    describe('Knockout Zapper', function() {
      var viewModel;
      var element;
      var root;

      describe('when binging to an element', function() {
        beforeEach(function() {

          root = document.createElement('div');
          root.innerHTML = '<input id="input" data-bind="zapper: obs">';
          document.body.appendChild(root);
          element = document.getElementById('input');

          viewModel = {
            obs: ko.observable()
          };

          ko.applyBindings(viewModel, root);
        });

        afterEach(function() {
          ko.cleanNode(root);
          $(root).remove();
        });

        it('should be bound', function() {
          expect(ko.dataFor(element)).toBe(viewModel);
        });
      });

    });
  });
