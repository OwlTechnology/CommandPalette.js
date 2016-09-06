[![Build Status](https://travis-ci.org/OwlTechnology/CommandPalette.js.svg?branch=master)](https://travis-ci.org/OwlTechnology/CommandPalette.js) 
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/354/badge)](https://bestpractices.coreinfrastructure.org/projects/354)

#CommandPalette.js

A pure JavaScript client side implementation of Sublime's and Atom's command palette tool for general use, for web pages. Allows you to map functions and objects so that methods can be called from the palette.

This project is licensed under the MIT open source license.

##How to Download

Either run

```
bower install command-palette
```

or, to install manually, clone the project, then from the project root, run

```
gulp build --prod
```

The finished, minified files will be available in the `dist/prod/` folder.

##Documentation

Basic documentation and use of the code is provided under [the GitHub wiki](https://github.com/OwlTechnology/CommandPalette.js/wiki).

##Bug Reporting, Feature Requests

Submit any bug reports, feature requests, or feedback on our [issue tracker](https://github.com/OwlTechnology/CommandPalette.js/issues). If you'd like to contribute, we accept pull requests. Follow the developer documentation below for more information.

##Developer Setup

To clone and run the project, you'll need gulp installed globally.

```
npm install --global gulp
```

And you'll need to install Mocha and the Mocha PhantomJS extension for testing. The testing uses the in-browser Mocha tests, which can be run by opening the testing harness in `/test/harnesses/` in your browser, or by running the `mocha-phantomjs` extension.

```
npm install -g mocha
npm install -g mocha-phantomjs
```

And finally, install all required Node packages from the root of the project.

```
npm install
```

##Running Mocha/PhantomJS Tests

If you followed the developer setup above, just run the `mocha-phantomjs`, passing the url to the running server that is serving the testing harness. The project must be built once, using the `gulp build --develop` command first, however.

Ex:

```
mocha-phantomjs http://localhost:8080/test/harnesses/test.html
```

##Building the Project

For development builds, and for the build that works with the unit tests, run:

```
gulp build --develop
```

or, for realtime updates:

```
gulp watch --develop
```

Use the `--prod` flag for production builds. All builds are put in the `dist/` directory.
