/*!
 * normalize-config <https://github.com/jonschlinkert/normalize-config>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

var util = require('util');
var file = require('fs-utils');
var helpers = require('./helpers/utils');
var should = require('should');
var normalize = require('..');

var inspect = function (obj) {
  return util.inspect(obj, null, 10);
};

var expected = function (name) {
  return require('./expected/files-object/' + name + '.json');
};

var writeExpected = helpers.expected('files-object');

describe('when a files object is passed:', function () {
  it('should normalize the key to `dest` and the value to `src`.', function () {
    var fixture = {
      files: {
        'dist/': 'test/fixtures/*.js'
      }
    };
    var actual = normalize(fixture);
    // writeExpected('filesObj', actual, true);
    actual.should.eql(expected('filesObj'));
  });

  it('should pass options to globule.', function () {
    var fixture = {
      options: {
        flatten: true,
        cwd: 'test/fixtures'
      },
      files: {
        'dist/a/': '*.js'
      }
    };
    var actual = normalize(fixture);
    // writeExpected('files-object', actual, true);
    actual.should.eql(expected('files-object'));
  });

  it('should pass options to globule.', function () {
    var fixture = {
      options: {
        cwd: 'test/fixtures',
        prefixBase: true,
        flatten: true
      },
      files: {
        'dist/a/': ['a/*.js'],
        'dist/b/': ['b/*.js']
      }
    };
    var actual = normalize(fixture);
    // writeExpected('files-object-multiple', actual, true);
    actual.should.eql(expected('files-object-multiple'));
  });

  it('should pass options to globule.', function () {
    var fixture = {
      options: {
        flatten: true
      },
      files: {
        'dist/': 'test/fixtures/*.js'
      }
    };
    var actual = normalize(fixture);
    // writeExpected('filesObj-flatten', actual, true);
    actual.should.eql(expected('filesObj-flatten'));
  });

  it('should pass options to globule.', function () {
    var fixture = {
      options: {
        expand: true,
        flatten: true
      },
      files: {
        'dist/': 'test/fixtures/*.js'
      }
    };
    var actual = normalize(fixture);
    // writeExpected('filesObj-expand-flatten', actual, true);
    actual.should.eql(expected('filesObj-expand-flatten'));
  });

  it('should pass options to globule.', function () {
    var fixture = {
      options: {
        expand: true,
        flatten: true
      },
      files: {
        'dist/a/': 'test/fixtures/o*.js',
        'dist/b/': 'test/fixtures/t*.js',
      }
    };
    var actual = normalize(fixture);
    // writeExpected('filesObj-expand-multi1', actual, true);
    actual.should.eql(expected('filesObj-expand-multi1'));
  });

  it('should pass options to globule.', function () {
    var fixture = {
      options: {
        expand: true
      },
      files: {
        'dist/a/': 'test/fixtures/a/*.js',
        'dist/b/': 'test/fixtures/b/*.js',
      }
    };
    var actual = normalize(fixture);
    // writeExpected('filesObj-expand-multi2', actual, true);
    actual.should.eql(expected('filesObj-expand-multi2'));
  });

  it('should pass options to globule.', function () {
    var fixture = {
      options: {
        expand: true
      },
      files: [{
        src: 'test/fixtures/a/*.js',
        dest: 'dist/a/'
      }, {
        expand: false,
        src: 'test/fixtures/b/*.js',
        dest: 'dist/b/'
      }, ]
    };
    var actual = normalize(fixture);
    // writeExpected('filesArr-expand-multi', actual, true);
    actual.should.eql(expected('filesArr-expand-multi'));
  });

});