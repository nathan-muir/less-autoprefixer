Package.describe({
  name: 'flemay:less-autoprefixer',
  version: '1.0.2',
  summary: 'The dynamic stylesheet language + Autoprefixer',
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
    "less-plugin-autoprefix": "1.4.2"
  }
});

Package.onTest(function(api) {
  api.use(['flemay:less-autoprefixer', 'test-helpers', 'tinytest', 'templating']);
  api.add_files(['test/less_tests.less', 'test/less_tests.js', 'test/less_tests.html',
    'test/less_tests_empty.less', 'test/autoprefixer_tests.import.less'
  ], 'client');
});
