var packageName = 'nathanmuir:less-autoprefixer';

Package.describe({
  name: packageName,
  version: '1.2.0',
  summary: 'The dynamic stylesheet language + Autoprefixer',
  git: 'https://github.com/nathan-muir/less-autoprefixer',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "compileLessAddAutoprefixer",
  use: ['caching-compiler@1.0.0', 'ecmascript@0.1.3', 'underscore@1.0.4'],
  sources: [
    'plugin/compile-less.js'
  ],
  npmDependencies: {
    // Fork of 2.5.0, deleted large unused files in dist directory.
    "less": "https://github.com/meteor/less.js/tarball/8130849eb3d7f0ecf0ca8d0af7c4207b0442e3f6",
    "less-plugin-autoprefix": "1.4.2"
  }
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.2');
  api.use('isobuild:compiler-plugin@1.0.0');
});

Package.onTest(function(api) {
  api.versionsFrom('METEOR@1.2');
  api.use([packageName, 'test-helpers', 'tinytest', 'templating']);
  api.add_files(['test/less_tests.less', 'test/less_tests.js', 'test/less_tests.html',
    'test/less_tests_empty.less', 'test/autoprefixer_tests.import.less'
  ], 'client');
});
