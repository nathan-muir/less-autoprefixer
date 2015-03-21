Package.describe({
  name: 'flemay:less-autoprefixer',
  version: '0.0.1',
  summary: 'This meteor package compiles your `.less` files into CSS, adds vendor prefixes to CSS rules and includes the results in the client CSS bundle.',
  git: 'https://github.com/flemay/less-autoprefixer',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "compileLessAddAutoprefixer",
  use: [],
  sources: [
    'lib/plugin/compile-less.js'
  ],
  npmDependencies: {
    "less": "2.4.0",
    "less-plugin-autoprefix": "1.4.0"
  }
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.4.1');
  api.addFiles('less-autoprefixer.js');
});

Package.onTest(function(api) {
  api.use(['flemay:less-autoprefixer', 'test-helpers', 'tinytest', 'templating']);
  api.add_files(['test/less_tests.less', 'test/less_tests.js', 'test/less_tests.html',
    'test/less_tests_empty.less'
  ], 'client');
});
