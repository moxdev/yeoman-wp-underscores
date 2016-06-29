'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend( {
    method1: function() {
        console.log('method 1 dog');
    },
    method2: function() {
        console.log('method 2 dog');
    }
});