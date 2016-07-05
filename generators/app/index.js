/*
 *
 * Eaxmples:
 *
 * https://github.com/tutsplus/create-a-custom-yeoman-generator/blob/master/app/index.js
 *
 * https://github.com/yeoman/generator-generator
 */

'use strict';

var generators = require('yeoman-generator'),
    mkdirp = require('mkdirp'), //https://www.npmjs.com/package/mkdirpd
    yosay = require('yosay'),
    chalk = require('chalk');

module.exports = generators.Base.extend({
    _createProjectFileSystem: function() {
        var destRoot = this.destinationRoot(),
            sourceRoot = this.sourceRoot(),
            appDir = destRoot + '/';

        mkdirp(appDir + '/scripts');
        mkdirp(appDir + '/test');
        mkdirp(appDir + '/img');

        // fs.copy takes 2 arguements (source, destination) - http://computercraft.info/wiki/Fs.copy
        this.fs.copy(sourceRoot + '/.bowerrc', destRoot + '/.bowerrrc')
        this.fs.copy(sourceRoot + '/bower.json', destRoot + '/bower.json'),
            this.fs.copy(sourceRoot + '/package.json', destRoot + '/package.json')
    },
    initializing: function() {
        var message = chalk.yellow.bold("Welcome to the jungle baby, you gonna die!") + chalk.yellow(" Seriously you're gonna die...");
        this.log(yosay(message, { maxLength: 17 }));
    },
    prompting: function() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname // Default to current folder name
        }, {
            type: 'input',
            name: 'description',
            message: 'Description of generator'
        }]).then(function(answers) {
            this.appname = answers.name;
            this.appdescription = answers.description;
        }.bind(this));
    },
    configuring: function() {
        this.config.save();
    },
    writing: function() {
        this._createProjectFileSystem();
    },
    install: function() {
        this.bowerInstall();
        this.npmInstall();
    }
});


// will check for conflicts before overwriting files

// _functionname is a helper method, wont be run until invoked

/*
Run Loop Priorities:
- initializing
- prompting
- configuring
- default
- writing
- conflicts
- install
- end
 */

    // _getPrompts: function() {
    //     var prompts = [{
    //         name: 'name',
    //         message: 'Name of project?',
    //         default: this.appname
    //     }, {
    //         name: 'description',
    //         message: 'description'
    //     }];
    //     return prompts;
    //     this.log(prompts);
    // },