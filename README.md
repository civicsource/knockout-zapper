# Knockout Zapper
=============

# knockout binding to show and hide templates in an animated fashion

## Usage

HTML

```html
    <input data-bind="zapper: myObservable" >
```

JS

```js
    ko.applyBindings({
        myObservable : ko.observable()
    });
```
Require

```js
requirejs.config({
  paths: {
        'knockout-zapper': 'bower_components/knockout-zapper/knockout.zapper'
    },
    shim: {
    'knockout-zapper': {
      deps: ['knockout', 'jquery']
    }
  }
});
```

## Behaviour

TODO:

## Dependencies

- knockout
- Jquery
