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
    mkdirp = require('mkdirp'),  //https://www.npmjs.com/package/mkdirpd
    yosay = require('yosay'),
    chalk = require('chalk');

module.exports = generators.Base.extend( {
    _createProjectFileSystem: function() {
        var destRoot = this.destinationRoot(),
            sourceRoot = this.sourceRoot(),
            appDir = destRoot + '/';

        mkdirp(appDir + '/scripts');
        mkdirp(appDir + '/test');
        mkdirp(appDir + '/img');

        // Yeoman filesystem docs - http://yeoman.io/authoring/file-system.html
        // fs.copy takes 2 arguements (source, destination) - http://computercraft.info/wiki/Fs.copy
        // copy.Tpl takes 3 args - https://github.com/sboudrias/mem-fs-editor#copytplfrom-to-context-options
        this.fs.copy(sourceRoot + '/.bowerrc', destRoot + '/.bowerrrc');
        this.fs.copy(sourceRoot + '/bower.json', destRoot + '/bower.json');
        this.fs.copy(sourceRoot + '/package.json', destRoot + '/package.json');
    },
    _getPrompts: function() {
        var prompts = [
            {
                // type: 'input',
                name: 'name',
                message: 'What is the name of this project?',
                default: this.appname // Default to current folder name
            },
            {
                name: 'description',
                message: 'Description of project'
            },
            {
                name: 'version',
                message: 'What version is this?'
            },
            {
                name: 'yourname',
                message: 'What is your name?'
            },
            {
                name: 'email',
                message: 'What is your email?'
            }
        ];
        return prompts;
    },
    _saveAnswers: function(answers, callback) {
        this.appname = answers.name;
        this.appdescription = answers.description;
        this.appversion = answers.version;
        this.applicense = answers.license;
        this.appauthor = answers.yourname;
        this.appemail = answers.email;
        callback();
    },
    initializing: function() {
        var message = chalk.yellow.bold("Welcome to the jungle baby, you gonna die!") + chalk.yellow(" Seriously you're gonna die...");
        this.log(yosay(message, { maxLength: 17 }));
    },
    prompting: function() {
        var done = this.async(); // Stops the generator until the prompts are finished
        this.prompt(this._getPrompts(), function(answers) {
            this._saveAnswers(answers, done);
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
        // this.npmInstall();
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