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
    // _ = require('lodash');

module.exports = generators.Base.extend({
    _createProjectFileSystem: function() {
        var destRoot = this.destinationRoot(),
            sourceRoot = this.sourceRoot(),
            appDir = destRoot + '/',
            templateContext = {
                appname: this.appname,
                appdescription: this.appdescription,
                appversion: this.appversion,
                appauthor: this.appauthor,
                applicense: this.applicense
            };

        mkdirp(appDir + '/fonts');
        mkdirp(appDir + '/img';
        mkdirp(appDir + '/css/vendor-css');
        mkdirp(appDir + '/js/vendor-js');

        // fs.copy takes 2 arguements (source, destination) - http://computercraft.info/wiki/Fs.copy
        this.fs.copy(sourceRoot + '/.bowerrc', destRoot + '/.bowerrrc')
        this.fs.copyTpl(sourceRoot + '/bower.json', destRoot + '/bower.json', templateContext),
            this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext)
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
            default: this.appname, // Default to current folder name
            store: true
        }, {
            type: 'input',
            name: 'description',
            message: 'Description of generator',
            store: true
        }, {
            type: 'input',
            name: 'version',
            message: 'Version of generator',
            default: '0.0.0',
            store: true
        }, {
            type: 'input',
            name: 'author',
            message: 'App author',
            store: true
        }, {
            type: 'input',
            name: 'license',
            message: 'App license',
            default: 'MIT',
            store: true
        }]).then(function(answers) {
            this.appname = answers.name;
            this.appdescription = answers.description;
            this.appversion = answers.version;
            this.appauthor = answers.author;
            this.applicense = answers.license;
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