/**
 * normalize <https://github.com/jonschlinkert/normalize>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const expect = require('chai').expect;
const normalize = require('../');
const result = require('./helpers/utils').result;

var config = {
  task: {
    options: {
      task: true
    },
    a: {
      src: 'test/fixtures/a/*.md',
      dest: './'
    },
    b: {
      options: {target: true},
      src: ['test/fixtures/b/*.txt'],
      dest: './'
    },
    c: {
      files: {
        './': ['test/fixtures/**/*.coffee']
      }
    },
    d: {
      files: {
        './a': ['test/fixtures/a/*.js'],
        './b': ['test/fixtures/b/*.js'],
        './c': ['test/fixtures/c/*.js']
      }
    },
    e: {
      files: [
        { cwd: 'test/fixtures/a', src: ['*.md'], dest: 'one/', ext: '.html' },
        { cwd: 'test/fixtures/b', src: ['*.md'], dest: 'two/', ext: '.html' },
        { cwd: 'test/fixtures/c', src: ['*.md'], dest: 'three/', ext: '.html' }
      ]
    },
    f: {
      options: {
        prefixBase: true
      },
      files: [
        { cwd: 'test/fixtures/a', src: ['*.hbs'], dest: 'one/', ext: '.md' },
        { cwd: 'test/fixtures/b', src: ['*.hbs'], dest: 'two/', ext: '.md' },
        { cwd: 'test/fixtures/c', src: ['*.hbs'], dest: 'three/', ext: '.md' }
      ]
    }
  }
};


describe('normalize.target():', function () {
  describe('when an object with only an `options` property is directly passed in:', function () {
    it('should return an empty', function (done) {
      var actual = normalize.target(config.task.options);
      var expected = result('actual-opts.js', actual, false);
      expect(actual).to.eql(require(expected));
      done();
    });
  });

  describe('when an object with a src-dest definition is passed in:', function () {
    it('should expand files in src, and return an object with `orig`, `src` and `dest` properties', function (done) {
      var actual = normalize.target(config.task.a);
      var expected = result('actual-a.js', actual, false);
      expect(actual).to.deep.equal(require(expected));
      done();
    });
  });

  describe('when an object with a files-object definition is passed in:', function () {
    it('should expand files and return an object with `orig`, `src` and `dest` properties', function (done) {
      var actual = normalize.target(config.task.c);
      var expected = result('actual-c.js', actual, false);
      expect(actual).to.deep.equal(require(expected));
      done();
    });
  });

  describe('when an object with a files-object definition is passed in:', function () {
    it('should expand files and return an object with `orig`, `src` and `dest` properties', function (done) {
      var actual = normalize.target(config.task.d);
      var expected = result('actual-d.js', actual, false);
      expect(actual).to.deep.equal(require(expected));
      done();
    });
  });

  describe('when an object with a files-object definition is passed in:', function () {
    it('should expand files and return an object with `orig`, `src` and `dest` properties', function (done) {
      var actual = normalize.target(config.task.e);
      var expected = result('actual-e.js', actual, false);
      expect(actual).to.deep.equal(require(expected));
      done();
    });
  });

  describe('when an object with a files-object definition is passed in:', function () {
    it('should expand files and return an object with `orig`, `src` and `dest` properties', function (done) {
      var actual = normalize.target(config.task.f);
      var expected = result('actual-f.js', actual, false);
      expect(actual).to.deep.equal(require(expected));
      done();
    });
  });
});