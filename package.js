var packageName = 'nathanmuir:less-autoprefixer';

Package.describe({
  name: packageName,
  version: '1.0.2-1',
  summary: 'The dynamic stylesheet language + Autoprefixer',
  git: 'https://github.com/nathan-muir/less-autoprefixer',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "compileLessAddAutoprefixer",
  use: [],
  sources: [
    'lib/plugin/compile-less.js'
  ],
  npmDependencies: {
    "less": "2.5.1",
    "less-plugin-autoprefix": "1.4.2"
  }
});

Package.onTest(function(api) {
  api.use([packageName, 'test-helpers', 'tinytest', 'templating']);
  api.add_files(['test/less_tests.less', 'test/less_tests.js', 'test/less_tests.html',
    'test/less_tests_empty.less', 'test/autoprefixer_tests.import.less'
  ], 'client');
});
