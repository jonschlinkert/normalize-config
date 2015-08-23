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
  return require('./expected/files-array/' + name + '.json');
};

var writeExpected = helpers.expected('files-array');

describe('when a files array is passed:', function () {
  describe('when options are passed:', function () {
    it('should extend options to each files object in the array.', function () {
      var fixture = {
        options: {
          flatten: true
        },
        files: [{
          src: ['test/fixtures/a/*.js'],
          dest: 'dist/'
        }, {
          src: ['test/fixtures/b/*.js'],
          dest: 'dist/'
        }]
      };

      var actual = normalize(fixture);
      // writeExpected('files-array', actual, true);
      actual.should.eql(expected('files-array'));
    });
  });

  describe('when non src-dest properties are in a files object:', function () {
    it('should move the options to an options object.', function () {
      var fixture = {
        options: {
          flatten: true
        },
        files: [{
          src: ['test/fixtures/a/*.js'],
          dest: 'dist/'
        }, {
          flatten: false,
          src: ['test/fixtures/b/*.js'],
          dest: 'dist/'
        }]
      };

      var actual = normalize(fixture);
      // writeExpected('non-src-dest-props', actual, true);
      actual.should.eql(expected('non-src-dest-props'));
    });
  });

  describe('when an options object is in a files object:', function () {
    it('should move the options object across each files object in the array.', function () {
      var fixture = {
        options: {
          flatten: true
        },
        files: [{
          options: {
            flatten: false
          },
          src: ['test/fixtures/a/*.js'],
          dest: 'dist/'
        }, {
          src: ['test/fixtures/b/*.js'],
          dest: 'dist/'
        }]
      };

      var actual = normalize(fixture);
      // writeExpected('files-object-options', actual, true);
      actual.should.eql(expected('files-object-options'));
    });
  });

  describe('when an options object is in a files object:', function () {
    it('should move the options object across each files object in the array.', function () {
      var fixture = {
        options: {
          flatten: true,
          expand: true
        },
        files: [{
          expand: false,
          src: ['test/fixtures/b/*.js'],
          dest: 'dist/',
          ext: '.html'
        }, {
          options: {
            flatten: false
          },
          src: ['test/fixtures/a/*.js', 'test/fixtures/c/*.js'],
          dest: 'dist/'
        }, ]
      };
      var actual = normalize(fixture);
      // writeExpected('files-object-expand', actual, true);
      actual.should.eql(expected('files-object-expand'));
    });
  });

  describe('when options are defined outside of the files array:', function () {
    it('should extend the options to each files object.', function () {
      var fixture = {
        options: {
          expand: true
        },
        files: [{
          src: ['test/fixtures/a/*.js'],
          dest: 'dist/'
        }, {
          src: ['test/fixtures/b/*.js'],
          dest: 'dist/'
        }]
      };

      var actual = normalize(fixture);
      // writeExpected('files-array-opts', actual, true);
      actual.should.eql(expected('files-array-opts'));
    });
  });

  describe('when options are defined both outside of the files array and in files objects:', function () {
    it('should normalize and extend the options for each files object.', function () {
      var fixture = {
        options: {
          expand: true
        },
        files: [{
          expand: false,
          src: ['test/fixtures/a/*.js'],
          dest: 'dist/'
        }, {
          options: {
            expand: false
          },
          src: ['test/fixtures/b/*.js'],
          dest: 'dist/'
        }]
      };

      var actual = normalize(fixture);
      // writeExpected('files-array-expand', actual, true);
      actual.should.eql(expected('files-array-expand'));
    });
  });

  describe('when an options object is in a files object:', function () {
    it('should normalize all of the options.', function () {
      var fixture = {
        options: {
          expand: false
        },
        files: [{
          options: {
            expand: true
          },
          src: ['test/fixtures/a/*.js', 'test/fixtures/c/*.js'],
          dest: 'dist/'
        }, {
          expand: true,
          src: ['test/fixtures/b/*.js'],
          dest: 'dist/'
        }]
      };

      var actual = normalize(fixture);
      // writeExpected('files-array-normalize-opts', actual, true);
      actual.should.eql(expected('files-array-normalize-opts'));
    });
  });
});