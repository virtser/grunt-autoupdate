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
      pkgFile : '.pkg'
    });

    var previousPkgVersion = 'N/A',
      pkgVersion = grunt.file.readJSON('package.json').version;

    if (grunt.file.exists(options.pkgFile)) {
      previousPkgVersion = grunt.file.read(options.pkgFile);
    }

    grunt.file.write(options.pkgFile, pkgVersion);

    if( previousPkgVersion !== pkgVersion ){
      grunt.log.subhead('New package.json version detected (from '+previousPkgVersion+' to '+pkgVersion+')');
      
      grunt.log.writeln('Running npm * bower install...');
      require('child_process').execSync('npm install; bower install', {stdio:[0,1,2]});

      grunt.log.writeln('... done updating module dependencies!');

      var args = process.argv.splice(2, process.argv.length);
      args.unshift('grunt');
      var command = args.join(' ');

      grunt.log.ok('Please run \''+ command +'\' again');
      grunt.util.exit(0);
    }else{
      grunt.verbose.writeln('package.json was not updated');
    }

  });

};
