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
  return require('./expected/route/' + name + '.json');
};

var writeExpected = helpers.expected('route');

describe('routes:', function () {
  it.only('should use the route to re-write the destination path.', function () {
    var fixture = {
      options: {
        expand: true,
        flatten: true,
        prefixBase: true,
        cwd: 'test/fixtures',
        destBase: 'foo/bar',
        route: ':dest/:destBase/blah/:basename.html'
      },
      src: '*.js',
      dest: 'dist/'
    };
    var actual = normalize(fixture);
    // writeExpected('dest', actual, true);
    actual.should.eql(expected('dest'));
    expect(actual.files[0].dest).to.eql('dist/foo/bar/blah/one.html');
  });

  it('should use the route to re-write the destination path.', function () {
    var fixture = {
      options: {
        expand: true,
        flatten: true,
        prefixBase: true,
        cwd: 'test/fixtures',
        destBase: 'foo/bar',
        route: ':dest/:destBase/blah/:basename.html'
      },
      src: '*.js',
      dest: 'dist/'
    };
    var actual = normalize(fixture);
    // writeExpected('route', actual, true);
    actual.should.eql(expected('route'));
    expect(actual.files[0].dest).to.eql('dist/foo/bar/blah/one.html');
  });
});