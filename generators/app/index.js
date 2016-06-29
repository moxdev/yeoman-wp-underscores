'use strict';

var generators = require('yeoman-generator'),
    mkdirp = require('mkdirp');  //https://www.npmjs.com/package/mkdirpd

module.exports = generators.Base.extend( {
    createProjectFileSystem: function() {
        var destRoot = this.destinationRoot(),
            sourceRoot = this.sourceRoot(),
            appDir = destRoot + '/';

        mkdirp(appDir + '/scripts');
        mkdirp(appDir + '/test');
        mkdirp(appDir + '/img');

        // fs.copy takes 2 arguements (source, destination) - http://computercraft.info/wiki/Fs.copy
        this.fs.copy(sourceRoot + '/.bowerrc', destRoot + '/.bowerrrc')
        this.fs.copy(sourceRoot + '/bower.json', destRoot + '/bower.json')
    }
});


// will check for conflicts before overwriting files