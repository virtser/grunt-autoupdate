/*
 * Grunt Auto Update
 * https://github.com/erwanjegouzo/grunt-auto-update
 *
 * Copyright (c) 2014 Erwan Jegouzo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.registerTask('autoupdate', 'Auto updates the node_modules if the package.json version changed', function () {

    var options = this.options({
      pkgFile : '.pkg',
      npmCheck: true,
      bowerCheck: true,
      warnOnly: false
    });

    var pkgFileContent = {},
        prevPkgFileContent = {},
        firstTimeRun = false,
        warnArray = [];

    if(options.npmCheck) {
      var npmVersion = grunt.file.readJSON('package.json').version;
      pkgFileContent.npmVersion = npmVersion;
    }

    if(options.bowerCheck) {
      var bowerVersion = grunt.file.readJSON('bower.json').version;
      pkgFileContent.bowerVersion = bowerVersion;
    }

    if (grunt.file.exists(options.pkgFile)) {
      prevPkgFileContent = grunt.file.readJSON(options.pkgFile);
    } else {
      firstTimeRun = true;
      grunt.log.writeln('Creating configuration file for the first time: ' + options.pkgFile);
    }

    grunt.file.write(options.pkgFile, JSON.stringify(pkgFileContent, null, "\t"));

    var runShellCommand = function(cmd) {
      grunt.log.writeln('Running: ' + cmd);
      require('child_process').execSync(cmd, {stdio:[0,1,2]});

      grunt.log.writeln('Finished execution of: ' + cmd);
    };

    if(!firstTimeRun && JSON.stringify(prevPkgFileContent) !== JSON.stringify(pkgFileContent)){
      if (options.npmCheck) {
        if (prevPkgFileContent.npmVersion !== pkgFileContent.npmVersion) {
            grunt.log.subhead('New package.json version detected (from ' + prevPkgFileContent.npmVersion + ' to ' + pkgFileContent.npmVersion + ').');

          if (options.warnOnly) {
            warnArray.push('New changes detected in package.json file. Run "npm install" to update.\n');
          } else {
            runShellCommand('npm install');
          }
        }
      }

      if (options.bowerCheck) {
        if (prevPkgFileContent.bowerVersion !== pkgFileContent.bowerVersion) {
            grunt.log.subhead('New bower.json version detected (from ' + prevPkgFileContent.bowerVersion + ' to ' + pkgFileContent.bowerVersion + ').');

          if (options.warnOnly) {
            warnArray.push('New changes detected in bower.json file. Run "bower install" to update.\n');
          } else {
            runShellCommand('bower install');
          }
        }
      }

      if (warnArray.length > 0)
        grunt.warn(warnArray.toString());

      var args = process.argv.splice(2, process.argv.length);
      args.unshift('grunt');
      var command = args.join(' ');

      grunt.log.ok('Please run \''+ command +'\' again');
      grunt.util.exit(0);
    } else {
      if (options.npmCheck)
        grunt.verbose.writeln('package.json was not updated');
      if (options.bowerCheck)
        grunt.verbose.writeln('bower.json was not updated');
    }
  });
};
