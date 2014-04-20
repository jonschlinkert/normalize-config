/**
 * normalize <https://github.com/jonschlinkert/normalize>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const expect = require('chai').expect;
const normalize = require('../');
const result = require('./helpers/utils').result;
const config = require('./fixtures/config');

describe('normalize.target():', function () {
  describe('task-options:', function () {
    describe('when a task-level options object is passed:', function () {
      xit('should return the options cloned in an `orig` object', function (done) {
        var actual = normalize.target({ process: true });
        var expected = {orig: {options: {process: true }}};
        expect(actual).to.eql(expected);
        done();
      });
    });
  });

  describe('src-dest:', function () {
    describe('when a src-dest config object is passed:', function () {
      it('should return an `orig` object with the original src and dest properties', function (done) {
        var actual = normalize.target({
          src: 'test/fixtures/a/*.md',
          dest: 'combined.md'
        });
        // var expected = result('src-dest-config.js', actual, false);

        expect(actual[0]).to.have.deep.property('orig.dest', 'combined.md');
        expect(actual[0]).to.have.deep.property('orig.src', 'test/fixtures/a/*.md');
        expect(actual[0]).to.have.deep.property('dest', 'combined.md');
        expect(actual[0].src).to.deep.equal(['test/fixtures/a/a.md', 'test/fixtures/a/b.md']);
        done();
      });
    });

    describe('when src has glob patterns', function () {
      it('should expand glob patterns and return an array of filepaths', function (done) {
        var actual = normalize.target({
          src: 'test/fixtures/a/*.md',
          dest: 'combined.md'
        });

        expect(actual[0].src).to.deep.equal(['test/fixtures/a/a.md', 'test/fixtures/a/b.md']);
        done();
      });
    });

    describe('when a config object with unknown properties is passed:', function () {
      it('should copy the properties over to an options object', function (done) {
        var actual = normalize.target({
          one: 'two',
          three: 'four',
        });
        var expected = {orig: {one: 'two', three: 'four'} };

        expect(actual[0]).to.deep.equal(expected);
        done();
      });
    });

    describe('when a config object with both "known" and unknown properties is passed:', function () {
      it('should move unknown properties to the options object', function (done) {
        var actual = normalize.target({
          src: 'test/fixtures/a/*.md',
          one: 'two',
          three: 'four',
          dest: 'foo.md'
        });
        var expected = result('known-unknown.js', actual, false);

        expect(actual).to.deep.equal(require(expected));
        expect(actual[0]).to.have.deep.property('orig.dest', 'foo.md');
        expect(actual[0]).to.have.deep.property('orig.src', 'test/fixtures/a/*.md');
        done();
      });
    });
  });

  describe('target-orig', function () {
    describe('when a config object is passed:', function () {
      it('should clone the original config to the orig object', function (done) {
        var fixture = {
          options: { copy: true, process: false },
          src: ['test/fixtures/b/*.txt'],
          dest: './combined.txt'
        };

        // Return orig object only
        var actual = normalize.target(fixture);
        expect(actual[0].orig).to.deep.equal(fixture);
        done();
      });
    });
  });

  describe('files-object:', function () {
    describe('when a config object with a files object is passed:', function () {
      it('should normalize the files object to a src-dest object', function (done) {
        var actual = normalize.target({
          files: {
            './': ['test/fixtures/a/*.coffee']
          }
        });
        var expected = result('files-object.js', actual, false);

        expect(actual[0].src).to.deep.equal(['test/fixtures/a/m.coffee']);
        expect(actual[0].dest).to.deep.equal('./');
        done();
      });

      it('should clone the original config to the orig object', function (done) {
        var actual = normalize.target({
          files: {
            './': ['test/fixtures/a/*.coffee']
          }
        });
        expect(actual[0].orig.src).to.deep.equal(['test/fixtures/a/*.coffee']);
        expect(actual[0].orig.dest).to.deep.equal('./');
        done();
      });

      it('should clone the src to the orig object', function (done) {
        var actual = normalize.target({
          options: {concat: true },
          files: {
            'foo.coffee': ['test/fixtures/a/*.coffee']
          }
        });
        expect(actual[0].orig.src).to.deep.equal(['test/fixtures/a/*.coffee']);
        done();
      });

      it('should clone the dest to the orig object', function (done) {
        var actual = normalize.target({
          options: {concat: true },
          files: {
            'foo.coffee': ['test/fixtures/a/*.coffee']
          }
        });
        expect(actual[0].orig.dest).to.deep.equal('foo.coffee');
        done();
      });

      it('should create a new src property with expanded filepaths', function (done) {
        var actual = normalize.target({
          options: {concat: true },
          files: {
            'foo.coffee': ['test/fixtures/a/*.coffee']
          }
        });
        expect(actual[0].src).to.deep.equal(['test/fixtures/a/m.coffee']);
        done();
      });

      it('should create a new dest property with the original destination', function (done) {
        var actual = normalize.target({
          options: {concat: true },
          files: {
            'foo.coffee': ['test/fixtures/a/*.coffee']
          }
        });
        expect(actual[0].dest).to.deep.equal('foo.coffee');
        done();
      });

      describe('when the target also has an options object:', function () {
        it('should clone the options to the orig object', function (done) {
          var actual = normalize.target({
            options: {concat: true },
            files: {
              'foo.coffee': ['test/fixtures/a/*.coffee']
            }
          });
          var expected = result('files-object-options.js', actual, false);
          expect(actual[0].orig.options).to.deep.equal({concat: true});
          done();
        });
      });

      describe('when `mapping` is defined in the options:', function () {
        it('should return an array of src-dest file mapping objects', function (done) {
          var actual = normalize.target({
            options: {mapping: true},
            files: {
              './': ['test/fixtures/**/*.js']
            }
          });
          var expected = result('files-object-mapping.js', actual, false);

          expect(actual).to.deep.equal(require(expected));
          done();
        });
      });
    });

    describe('when multiple files objects are passed:', function () {
      it('should normalize the files object to a src-dest object', function (done) {
        var actual = normalize.target({
          files: {
            'a': ['test/fixtures/a/*.js'],
            'b': ['test/fixtures/b/*.js'],
            'c': ['test/fixtures/c/*.js']
          }
        });

        var expected = result('files-objects-multiple.js', actual, false);

        expect(actual).to.deep.equal(require(expected));
        done();
      });
    });


    describe('when multiple files objects are passed, and mapping is defined in the options:', function () {
      it('should normalize the files object to a src-dest object', function (done) {
        var actual = normalize.target({
          options: {mapping: true},
          files: {
            'a': ['test/fixtures/a/*.js'],
            'b': ['test/fixtures/b/*.js'],
            'c': ['test/fixtures/c/*.js']
          }
        });

        var expected = result('files-objects-multiple-opts.js', actual, false);

        expect(actual).to.deep.equal(require(expected));
        done();
      });
    });

    describe('when `mapping` and `cwd` are defined in the options:', function () {
      it('should return an array of src-dest file mapping objects', function (done) {
        var actual = normalize.target({
          options: {mapping: true, cwd: 'test/fixtures'},
          files: {
            './': ['**/*.js']
          }
        });
        var expected = result('files-object-mapping-cwd.js', actual, false);

        expect(actual).to.deep.equal(require(expected));
        done();
      });
    });

    describe('when `mapping`, `cwd` and `ext` are defined in the options:', function () {
      it('should return an array of src-dest file mapping objects', function (done) {
        var actual = normalize.target({
          options: {mapping: true, cwd: 'test/fixtures', ext: '.txt'},
          files: {
            './': ['**/*.js']
          }
        });
        var expected = result('files-object-mapping-cwd-ext.js', actual, false);

        expect(actual).to.deep.equal(require(expected));
        done();
      });
    });

    describe('when multiple globule options are defined in the options:', function () {
      it('should return an array of src-dest file mapping objects', function (done) {
        var actual = normalize.target({
          options: {mapping: true, cwd: 'test/fixtures', flatten: true},
          files: {
            './': ['**/*.js']
          }
        });
        var expected = result('files-object-mapping-flatten.js', actual, false);

        expect(actual).to.deep.equal(require(expected));
        done();
      });
    });

    describe('when multiple globule options are defined in the options:', function () {
      it('should return an array of src-dest file mapping objects', function (done) {
        var actual = normalize.target({
          options: {
            mapping: true,
            cwd: 'test/fixtures',
            filter: 'isFile',
            ext: '.txt',
            prefixBase: true
          },
          files: {
            './': ['**/*']
          }
        });
        var expected = result('files-object-mapping-cwd-prefixBase.js', actual, false);

        expect(actual).to.deep.equal(require(expected));
        done();
      });
    });

    describe('when multiple globule options are defined in the options:', function () {
      it('should return an array of src-dest file mapping objects', function (done) {
        var actual = normalize.target({
          options: {
            mapping: true,
            flatten: true,
            cwd: 'test/fixtures',
            filter: 'isFile',
            ext: '.txt',
            prefixBase: true
          },
          files: {
            './': ['**/*']
          }
        });
        var expected = result('files-object-mapping-cwd-flatten-prefixBase.js', actual, false);

        expect(actual).to.deep.equal(require(expected));
        done();
      });
    });

    describe('when multiple globule options are defined in the options:', function () {
      it('should return an array of src-dest file mapping objects', function (done) {
        var actual = normalize.target({
          options: {
            mapping: true,
            flatten: true,
            cwd: 'test/fixtures',
            filter: 'isFile',
            ext: '.txt',
            destBase: 'foo',
            prefixBase: true
          },
          files: {
            './': ['**/*']
          }
        });
        var expected = result('files-object-mapping-cwd-destbase-flatten-prefixBase.js', actual, false);

        expect(actual).to.deep.equal(require(expected));
        done();
      });
    });
  });

  describe('files-array:', function () {
    describe('when a config object with a files array is passed:', function () {
      it('should normalize each files object in the array to src-dest objects', function (done) {
        var actual = normalize.target({
          files: [
            {src: ['test/fixtures/a/*.js'], dest: './a'},
            {src: ['test/fixtures/b/*.js'], dest: './b'},
          ]
        });
        var expected = result('files-array.js', actual, false);
        expect(actual).to.deep.equal(require(expected));
        done();
      });

      it('should use options defined in the src-dest objects', function (done) {
        var actual = normalize.target({
          files: [
            {mapping: true, cwd: 'test/fixtures/', src: ['**/*.js'], dest: './public/txt/', ext: '.txt'},
            {mapping: true, cwd: 'test/fixtures/', src: ['**/*.js'], dest: './public/js/', ext: '.js'},
            {mapping: true, cwd: 'test/fixtures/', src: ['**/*.js'], dest: './assets/txt/', ext: '.txt'}
          ]
        });
        var expected = result('files-array-options.js', actual, false);
        expect(actual).to.deep.equal(require(expected));
        done();
      });
    });
  });
});


describe('normalize.task():', function () {
  describe('when an object with a src-dest definition is passed in:', function () {
    it('should expand files in src, and return an object with `orig`, `src` and `dest` properties', function (done) {
      var actual = normalize.task(config.foo);
      var expected = result('task-foo.js', actual, false);
      expect(actual).to.deep.equal(require(expected));
      done();
    });
  });

  describe('when an object with a files-object definition is passed in:', function () {
    it('should expand files and return an object with `orig`, `src` and `dest` properties', function (done) {
      var actual = normalize.task(config.bar);
      var expected = result('task-bar.js', actual, false);
      expect(actual).to.deep.equal(require(expected));
      done();
    });
  });
});

describe('normalize():', function () {
  describe('when an object with a src-dest definition is passed in:', function () {
    it('should expand files in src, and return an object with `orig`, `src` and `dest` properties', function (done) {
      var actual = normalize(config);
      var expected = result('config.js', actual, false);
      expect(actual).to.deep.equal(require(expected));
      done();
    });
  });
});