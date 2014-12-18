var require = (function (root) {

	var cfg = {
		baseUrl: "./",
		paths: {
			"app": "./",
			"jquery": "/bower_components/jquery/dist/jquery",
			"lodash": "/bower_components/lodash/dist/lodash",
			"knockout": "/bower_components/knockout.js/knockout",
			"bootstrap": "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min",
			"knockout.punches": "/bower_components/knockout.punches/knockout.punches",
			"template": "/bower_components/knockout-require-templates/template",
			"text": "/bower_components/requirejs-text/text",
			"stringTemplateEngine": "/bower_components/knockout-require-templates/stringTemplateEngine"
		},
		map: {
			"*": {
				'css': '../bower_components/require-css/css'
			}
		},
		shim:{
			"bootstrap": {
				deps:["jquery","css!https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"]
			}
		}
	};

	return cfg;
})(this);

if (typeof (exports) === "object") {
	module.exports = require;
}