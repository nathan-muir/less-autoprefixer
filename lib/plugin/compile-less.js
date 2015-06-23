var path = Npm.require('path');
var less = Npm.require('less');
var Future = Npm.require('fibers/future');
var LessPluginAutoprefixer = Npm.require('less-plugin-autoprefix');

var autoprefixerPlugin = null;

var parseAutoprefixerOptions = function(options) {
  try {
    var o = JSON.parse(options);
    if (o && typeof o === "object" && o !== null) {
      if (Object.keys(o)[0] !== "browsers"){
        console.log('\n less-autoprefixer: invalid AUTOPREFIXER_OPTIONS - "browsers" key not found, falling back to default options - { browsers: "> 1%, last 2 versions, Firefox ESR, Opera 12.1"}, more info - https://github.com/postcss/autoprefixer-core#usage');
      } else {
        return o;
      }
    }
  }
  catch (e) {
    console.log("\n less-autoprefixer: invalid JSON format in AUTOPREFIXER_OPTIONS -", e);
    console.log(' less-autoprefixer: falling back to default options - { browsers: "> 1%, last 2 versions, Firefox ESR, Opera 12.1"}, more info - https://github.com/postcss/autoprefixer-core#usage');
  }
  return {};
};

var getAutoprefixerPlugin = function() {
  if (autoprefixerPlugin) {
    return autoprefixerPlugin;
  }
  var options = {};
  if (process.env.AUTOPREFIXER_OPTIONS) {
    options = parseAutoprefixerOptions(process.env.AUTOPREFIXER_OPTIONS);
  }
  autoprefixerPlugin = new LessPluginAutoprefixer(options);
  return autoprefixerPlugin;
};

Plugin.registerSourceHandler("less", {archMatching: 'web'}, function (compileStep) {
  var source = compileStep.read().toString('utf8');
  var options = {
    filename: compileStep.inputPath,
    syncImport: true,
    paths: [path.dirname(compileStep._fullInputPath)], // for @import
    plugins: [getAutoprefixerPlugin()]
  };

  try {
    var renderFuture = new Future();
    less.render(source, options, renderFuture.resolver());
    var output = renderFuture.wait();
    if (output.css) {
      compileStep.addStylesheet({
        path: compileStep.inputPath + ".css",
        data: output.css,
        sourceMap: JSON.stringify(output.map)
      });
    }
  } catch (error) {
    compileStep.error({
      message: "Less compiler error: " + error.message,
      sourcePath: error.filename || compileStep.inputPath,
      line: error.line,
      column: error.column + 1
    });
  }
});

// Register import.less files with the dependency watcher, without actually
// processing them. There is a similar rule in the stylus package.
Plugin.registerSourceHandler("import.less", function () {
  // Do nothing
});

// Backward compatibility with Meteor 0.7
Plugin.registerSourceHandler("lessimport", function () {});
