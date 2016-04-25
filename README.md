* This plugin was originally called [grunt-autoupdate](https://github.com/erwanjegouzo/grunt-autoupdate) and written by Erwan Jegouzo.

# grunt-local-deps-update [![npm version](https://badge.fury.io/js/grunt-local-deps-update.svg)](https://badge.fury.io/js/grunt-local-deps-update)

> Detects and updates local dependencies if package.json or bower.json version changed.  
Why? If your node_modules or bower_components folder is not under version control, then you would probably have to notify the team that the package.json or bower.json changed and everyone would have to run "npm install" or "bower install". While this workflow could work, this is not very reliable!  
Now you have grunt-local-deps-update which notfies a team member with outdated dependencies and auto install them if enabled.


## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-local-deps-update --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-local-deps-update');
```



## The "depsupdate" task

### Overview
The task doesn't require any configuration.  
Simply add it to your default task, or make sure it's the first task being executed.

```
grunt.registerTask('default', ['depsupdate']);
```

### Log example
In case the package.json or bower.json version changed, this is what you can expect to see:
```
$ grunt
Running "depsupdate" task

New package.json version detected (from 0.0.2 to 0.0.3)
Running npm update...
... done!
>> Please run 'grunt' again

Done, without errors.
```

### Options

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  depsupdate: {
    options: {
      pkgFile : '.pkg',
      npmCheck: true,
      bowerCheck: true,
      warnOnly: false
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2016 Erwan Jegouzo and David Virtser. Licensed under the MIT license.
