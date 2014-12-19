# Knockout Zapper
=============

knockout (bootstrap) binding to show and hide templates in an animated fashion whereby the original template is swiped right off the screen.

view the [demo](http://civicsource.github.io/knockout-zapper/)

## Usage

HTML

Note that the templates are described with data-not-zapped and data-zapped attributes. when then observable
passed is true, the data-not-zapped template (everything contained in that div) will show. and vice versa for the data-zapped template.

```html
    <ul class="list-group" data-bind="foreach: people">

		<li class="list-group-item" data-bind="zapper: myObservable">
			<div class="row" data-not-zapped>
				<div class="col-md-12">
					{{theThing}}
					<a class="btn btn-danger pull-right" href="#" data-bind="click: myObservable.bind(this,true)">Zap</a>
				</div>
			</div>
			<div class="row" data-zapped>
				<div class="col-md-12 alert-warning">
					{{theThing}} has been zapped
					<a class="btn btn-primary pull-right" href="#" data-bind="click: myObservable.bind(this,false)">Un-Zap</a>
				</div>
			</div>
		</li>

	</ul>
```

JS

```js
    ko.applyBindings({
        myObservable : ko.observable(false),
    	theThing: ko.observable("fooooooooo")
    });
```

Require
-make sure you define paths for knockout and jquery
```js
requirejs.config({
  paths: {
        'knockout-zapper': 'bower_components/knockout-zapper/src/knockout.zapper'
    },
    shim: {
    'knockout-zapper': {
      deps: ['knockout', 'jquery']
    }
  }
});
```

## Dependencies

- knockout
- Jquery
- bootstrap

## License

MIT
