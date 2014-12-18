//any custom test dependencies to override the main config
var require = (function (root) {

	var cfg = {
		baseUrl: "./",
		paths: {

		},
		map: {

		},
		shim:{

		}
	};

	return cfg;
})(this);

if (typeof (exports) === "object") {
	module.exports = require;
}