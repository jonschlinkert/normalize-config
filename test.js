'use strict';

/* deps: mocha */
var util = require('util');
var assert = require('assert');
var should = require('should');

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
var toMapping = inspect({debug: false});

describe('toMapping', function () {
  it('should convert an object of src-dest mappings to a file array:', function () {
    var config = toMapping({
      'foo/': 'lib/*.js',
      'bar/': '*.md'
    });

    assert(Array.isArray(config.files));
    assert(Array.isArray(config.files[0].src));
    assert(config.files[0].src[0] === 'lib/*.js');
    assert(config.files[0].dest === 'foo/');

    assert(config.files[1].src[0] === '*.md');
    assert(config.files[1].dest === 'bar/');
  });

  it('should convert arguments to a files array:', function () {
    var config = toMapping('lib/*.js', 'foo/');

    assert(Array.isArray(config.files));
    assert(Array.isArray(config.files[0].src));
    assert(config.files[0].src[0] === 'lib/*.js');
    assert(config.files[0].dest === 'foo/');
  });

  it('should arrayify src when args are converted:', function () {
    var config = toMapping('lib/*.js', 'foo/');

    assert(Array.isArray(config.files[0].src));
    assert(config.files[0].src[0] === 'lib/*.js');
  });

  it('should support src and dest being passed on options:', function () {
    // this allows a default src/dest to be passed from main options
    // of consuming libraries
    var config = toMapping({options: {src: 'lib/*.js', dest: 'foo/'}});
    assert(Array.isArray(config.files[0].src));
    assert(config.files[0].src[0] === 'lib/*.js');
  });

  it('should convert an object with src-dest to a files array:', function () {
    var config = toMapping({dest: 'foo/', src: 'lib/*.js'});

    assert(Array.isArray(config.files));
    assert(Array.isArray(config.files[0].src));
    assert(config.files[0].src[0] === 'lib/*.js');
    assert(config.files[0].dest === 'foo/');
  });

  it('should support passing a files array:', function () {
    var config = toMapping({files: ['*.js']});
    assert(config.files[0].src[0] === '*.js');
  });

  it('should extend "target" options onto objects:', function () {
    var config = toMapping({dest: 'foo/', src: 'lib/*.js'}, {process: true});

    assert(Array.isArray(config.files));
    assert(Array.isArray(config.files[0].src));
    assert(config.files[0].src[0] === 'lib/*.js');
    assert(config.files[0].dest === 'foo/');
    assert(config.process === true);
  });
});
