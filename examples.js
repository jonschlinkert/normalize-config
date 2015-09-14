var util = require('util');

// wrap `toMapping` to log out results
function inspect(options) {
  options = options || {};
  return function () {
    var files = require('./');
    var config = files.apply(files, arguments);
    if (options.debug === true) {
      console.log(util.inspect(config, null, 10));
    }
    return config;
  };
}

// change to `true` to log out results
var toMapping = inspect({debug: true});

toMapping('lib/*.js');
toMapping({'': 'lib/*.js'});
toMapping(['lib/*.js']);
toMapping({src: 'lib/*.js'});
toMapping({src: 'lib/*.js', dest: ''});
// { files: [ { src: [ 'lib/*.js' ], dest: '' } ] }
// { files: [ { src: [ 'lib/*.js' ], dest: '' } ] }
// { files: [ { src: [ 'lib/*.js' ], dest: '' } ] }
// { files: [ { src: [ 'lib/*.js' ], dest: '' } ] }

toMapping({src: 'lib/*.js', dest: 'foo/'});
toMapping('lib/*.js', 'foo/');
toMapping(['lib/*.js'], 'foo/');
toMapping({'foo/': 'lib/*.js'});
toMapping({src: 'lib/*.js', dest: 'foo/'});
// { files: [ { src: [ 'lib/*.js' ], dest: 'foo/' } ] }
// { files: [ { src: [ 'lib/*.js' ], dest: 'foo/' } ] }
// { files: [ { src: [ 'lib/*.js' ], dest: 'foo/' } ] }
// { files: [ { src: [ 'lib/*.js' ], dest: 'foo/' } ] }
// { files: [ { src: [ 'lib/*.js' ], dest: 'foo/' } ] }
