Less + Autoprefixer
===================

This meteor package compiles your `.less` files into CSS, adds vendor prefixes to CSS rules and includes the results in the client CSS bundle.

Installation
------------

    meteor add flemay:less-autoprefixer

Usage
-----

You can pass custom options to `autoprefixer` by setting `AUTOPREFIXER_OPTIONS` environment variable: `export AUTOPREFIXER_OPTIONS='{ "browsers": ["Chrome 36", "iOS 7"]}'`

To unset environment variable run: `unset AUTOPREFIXER_OPTIONS`

If no `AUTOPREFIXER_OPTIONS` environment variable is found it fallbacks to `autoprefixer` default options: `["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1"]`

For more info on `autoprefixer` options please check https://github.com/ai/browserslist#queries

Dependencies
------------

This package uses the following npm modules:

- [less](https://www.npmjs.com/package/less)
- [less-plugin-autoprefix](https://www.npmjs.com/package/less-plugin-autoprefix)

How to test this package
------------------------

1. `$ meteor create test-less-autoprefixer`
2. `$ mkdir test-less-autoprefixer/packages`
3. `$ cd test-less-autoprefixer/packages`
4. `$ git clone https://github.com/flemay/less-autoprefixer.git`
5. `$ meteor test-packages`

References
----------

### less package

This package is based on the [less package](https://github.com/meteor/meteor/tree/devel/packages/less) from Meteor. However it does not cut down [less npm module]([less](https://www.npmjs.com/package/less) and it uses the function `less.render` instead of the combination of `less.Parser` and `toCSS` as suggested by [less usage documentation](http://lesscss.org/usage/#programmatic-usage).

### lauricio:less-autoprefixer

It is also based on [lauricio:less-autoprefixer]( https://atmospherejs.com/lauricio/less-autoprefixer). I wasn't able to use it to compile [semantic-ui](http://semantic-ui.com/) and after debugging and debugging I decided to start from fresh and created this package.

#### Differences

- test uses my package to test
- same structure as less package
  - Use of Fiber/Future
  - Exception handling
