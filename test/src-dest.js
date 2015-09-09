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

var inspect = function(obj) {
  return util.inspect(obj, null, 10);
};

var expected = function(name) {
  return require('./expected/src-dest/' + name + '.json');
};

var writeExpected = helpers.expected('src-dest');


describe('src-dest pairings:', function () {
  describe('when only `src` is passed:', function () {
    it('should return a normalized files array with a src-dest pairing.', function () {
      var fixture = {src:  'test/fixtures/*.js'};
      var actual = normalize(fixture);
      // writeExpected('src-only', actual, true);
      actual.should.eql(expected('src-only'));
    });
  });

  describe('when only a `dest` is passed:', function () {
    it('should return a normalized files array with a src-dest pairing.', function () {
      var fixture = {dest:  'a/', route: ':dest/foo/bar'};
      var actual = normalize(fixture);
      // writeExpected('dest-only', actual, true);
      actual.should.eql(expected('dest-only'));
    });
  });

  describe('when `src` and `dest` are passed:', function () {
    it('should return a normalized files array with a src-dest pairing.', function () {
      var fixture = {src:  'test/fixtures/a/*.js', dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('src-and-dest', actual, true);
      actual.should.eql(expected('src-and-dest'));
    });
  });

  describe('when `src`, `dest` and `expand` are passed:', function () {
    it('should expand `src` patterns and return a normalized files array with src-dest pairings.', function () {
      var fixture = {expand: true, src:  'test/fixtures/**/*.js', dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('src-dest-expand', actual, true);
      actual.should.eql(expected('src-dest-expand'));
    });
  });

  describe('when `options`, `src` and `dest` are passed:', function () {
    it('should normalize the options and extend the options to each src-dest pairing.', function () {
      var fixture = {options: {flatten: true}, src:  'test/fixtures/a/*.js', dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('src-dest-options1', actual, true);
      actual.should.eql(expected('src-dest-options1'));
    });

    it('should normalize the options and extend the options to each src-dest pairing.', function () {
      var fixture = {options: { flatten: true }, src: ['test/fixtures/a/*.js'], dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('src-dest-options2', actual, true);
      actual.should.eql(expected('src-dest-options2'));
    });
  });

  describe('when an options object does not exist, but non src-dest properties are in the object:', function () {
    it('should normalize the non-src-dest properties to an options object, and try to use the options.', function () {
      var fixture = {expand: true, src: ['test/fixtures/a/*.js', 'test/fixtures/b/*.js'], dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('src-dest-non-opts', actual, true);
      actual.should.eql(expected('src-dest-non-opts'));
    });

    it('should normalize the non-src-dest properties to an options object, and try to use the options.', function () {
      var fixture = {expand: true, flatten: true, src: ['test/fixtures/a/*.js', 'test/fixtures/b/*.js'], dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('src-dest-non-opts-flat', actual, true);
      actual.should.eql(expected('src-dest-non-opts-flat'));
    });
  });
});


describe('expand:', function () {
  describe('when `options`, `src` and `dest` are passed:', function () {
    it('should normalize the options and extend the options onto each src-dest pairing.', function () {
      var fixture = {options: {expand: true }, src: 'test/fixtures/*.js', dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('expand-true', actual, true);
      actual.should.eql(expected('expand-true'));
    });
  });

  describe('expand-cwd:', function () {
    it('should normalize the options and extend the options onto each src-dest pairing.', function () {
      var fixture = {options: {expand: true, cwd: 'test/fixtures'}, src: '*.js', dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('expand-true-cwd', actual, true);
      actual.should.eql(expected('expand-true-cwd'));
    });

    it('should normalize the options and extend the options onto each src-dest pairing.', function () {
      var fixture = {options: {expand: true, flatten: true, cwd: 'test/fixtures'}, src: '*.js', dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('expand-true-cwd-flatten', actual, true);
      actual.should.eql(expected('expand-true-cwd-flatten'));
    });
  });

  describe('expand-flatten:', function () {
    it('should normalize the options and extend the options onto each src-dest pairing.', function () {
      var fixture = {options: {expand: true, flatten: true}, src: 'test/fixtures/*.js', dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('expand-true-flatten', actual, true);
      actual.should.eql(expected('expand-true-flatten'));
    });
  });

  describe('cwd:', function () {
    it('should normalize the options and extend the options onto each src-dest pairing.', function () {
      var fixture = {options: {cwd: 'test/fixtures'}, src: '*.js', dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('cwd', actual, true);
      actual.should.eql(expected('cwd'));
    });
  });

  describe('when an options object does not exist, but non src-dest properties are in the object:', function () {
    it('should move the non-src-dest properties to an options object.', function () {
      var fixture = {options: {flatten: true}, src: ['test/fixtures/*.js'], dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('flatten', actual, true);
      actual.should.eql(expected('flatten'));
    });
  });

  describe('when an options object does not exist, but non src-dest properties are in the object:', function () {
    it('should move the non-src-dest properties to an options object.', function () {
      var fixture = {src: ['test/fixtures/*.js'], dest: 'dist/'};
      var actual = normalize(fixture);
      // writeExpected('basic', actual, true);
      actual.should.eql(expected('basic'));
    });
  });
});

