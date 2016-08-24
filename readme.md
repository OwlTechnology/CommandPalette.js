#CommandPalette.js

A pure JavaScript client side implementation of Sublime's and Atom's command palette tool.

##Developer Setup

To clone and run the project, you'll need gulp installed globally.

```
npm install --global gulp
```

And you'll need to install Mocha for testing.

```
npm install --global mocha
```

And finally, install all required Node packages from the root of the project.

```
npm install
```

##Running Mocha Tests

If you followed the developer setup above, just run the `mocha` command from the root of the project. The project must be built once, using the `gulp build --develop` command first, however.

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
