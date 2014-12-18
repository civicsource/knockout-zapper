/*jshint node:true, es3:false*/
/*jshint node:true, es3:false*/
(function() {
    'use strict';

    var _ = require('cloneextend');
    var noCache = require("connect-nocache")();

    module.exports = function(grunt) {
        require('load-grunt-tasks')(grunt); // Load grunt tasks automatically
        // Project configuration.
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            jshint: {
                all: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js', 'demo/**/*.js']
            },
            watch: {
                options: {
                    spawn: false
                },
                //watches all scripts an rerun hinting and the tests immediately
                scripts: {
                    files: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js', 'demo/**/*.js'],
                    tasks: ['jshint', 'test:headless']
                }
            },
            connect: {
                options: {
                    port: 8000,
                    base: "./",
                    middleware: function(connect, options) {
                        return [noCache, connect.static(options.base[0])];
                    }
                },
                temp: {},
                persist: {
                    options: {
                        keepalive: true,
                        open: "http://localhost:8000/_SpecRunner.html"
                    }
                }
            },
            jasmine: {
                test: {
                    options: {
                        host: "http://localhost:8000/",
                        specs: ["spec/knockout.zapper.js"],
                        "--web-security": false,
                        keepRunner: true,
                        template: require("grunt-template-jasmine-requirejs"),
                        templateOptions: {
                            requireConfig: _.cloneextend(require("./spec/require-config"), require("./require-config"))
                        }
                    }
                }
            }

        });

        grunt.loadNpmTasks('grunt-contrib-jasmine');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks("grunt-contrib-requirejs");


        grunt.registerTask('default', ['jshint']);
        grunt.registerTask('test', ['jshint', "jasmine:test:build", "connect:persist"]);
        grunt.registerTask('test:headless', ["connect:temp", "jasmine"]);
    };
})();
