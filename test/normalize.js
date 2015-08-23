/**
 * normalize-config <https://github.com/jonschlinkert/normalize-config>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

var util = require('util');
var should = require('should');
var normalize = require('..');

var inspect = function(obj) {
  return util.inspect(obj, null, 10);
};


describe('normalize():', function () {
  describe('task-options:', function () {
    describe('when a task-level options object is passed:', function () {
      it('should return the options cloned in an `orig` object', function () {
        var actual = normalize({ process: true });
        var expected = {orig: {process: true }, files: []};
        actual.should.eql(expected);
      });
    });
  });

  describe('src-dest:', function () {
    describe('when a src-dest config object is passed:', function () {
      it('should return an `orig` object with the original src and dest properties', function () {
        var actual = normalize({
          src: 'test/fixtures/a/*.md',
          dest: 'combined.md'
        });

        actual.should.have.deep.property('orig.dest', 'combined.md');
        actual.should.have.deep.property('orig.src', 'test/fixtures/a/*.md');
        expect(actual.files[0]).to.have.deep.property('dest', 'combined.md');
        expect(actual.files[0].src).to.eql(['test/fixtures/a/a.md', 'test/fixtures/a/b.md']);
      });
    });

    describe('when src has glob patterns', function () {
      it('should expand glob patterns and return an array of filepaths', function () {
        var actual = normalize({
          src: 'test/fixtures/a/*.md',
          dest: 'combined.md'
        });
        expect(actual.files[0].src).to.eql(['test/fixtures/a/a.md', 'test/fixtures/a/b.md']);
      });
    });

    describe('when a config object with unknown properties is passed:', function () {
      it('should copy the properties over to an options object', function () {
        var actual = normalize({
          one: 'two',
          three: 'four',
        });
        actual.should.have.deep.property('orig.one', 'two');
        expect(actual.files).to.eql([]);
      });
    });

    describe('when a config object with both "known" and unknown properties is passed:', function () {
      it('should move unknown properties to the options object', function () {
        var actual = normalize({
          src: 'test/fixtures/a/*.md',
          one: 'two',
          three: 'four',
          dest: 'foo.md'
        });

        actual.should.have.deep.property('orig.dest', 'foo.md');
        actual.should.have.deep.property('orig.one', 'two');
        actual.should.have.deep.property('orig.three', 'four');
        actual.should.have.deep.property('orig.src', 'test/fixtures/a/*.md');
        expect(actual.files[0]).to.have.deep.property('dest', 'foo.md');
        expect(actual.files[0].src).to.eql(['test/fixtures/a/a.md', 'test/fixtures/a/b.md']);
      });
    });
  });

  describe('files-object:', function () {
    describe('when a config object with a files object is passed:', function () {
      it('should normalize the files object to a src-dest object', function () {
        var actual = normalize({
          files: {
            './': ['test/fixtures/a/*.coffee']
          }
        });
        expect(actual.files[0].src).to.eql(['test/fixtures/a/m.coffee']);
        expect(actual.files[0]).to.have.deep.property('dest', './');
      });

      it('should clone the options to the orig object', function () {
        var actual = normalize({
          options: {concat: true },
          files: {
            'foo.coffee': ['test/fixtures/a/*.coffee']
          }
        });

        expect(actual.orig).to.have.deep.property('options.concat', true);
        expect(actual.files[0]).to.have.deep.property('dest', 'foo.coffee');
        expect(actual.files[0].src).to.eql(['test/fixtures/a/m.coffee']);
        expect(actual.files[0].orig.options).to.have.deep.property('concat', true);
      });

      describe('when `expand` is defined in the options:', function () {
        it('should return an array of src-dest files mappings', function () {
          var actual = normalize({
            options: {expand: true},
            files: {
              './': ['test/fixtures/**/*.js']
            }
          });
          expect(actual.files).to.have.length.above(9);
        });
      });
    });

    describe('when multiple files objects are passed:', function () {
      it('should normalize the files object to a src-dest object', function () {
        var actual = normalize({
          files: {
            'a': ['test/fixtures/a/*.js'],
            'b': ['test/fixtures/b/*.js'],
            'c': ['test/fixtures/c/*.js']
          }
        });

        expect(actual.files).to.have.length(3);
        expect(actual.files[0].src).to.have.length(2);
        expect(actual.files[1].src).to.have.length(3);
        expect(actual.files[2].src).to.have.length(2);
      });
    });


    describe('when multiple files objects are passed, and mapping is defined in the options:', function () {
      it('should normalize the files object to a src-dest object', function () {
        var actual = normalize({
          options: {expand: true},
          files: {
            'a': ['test/fixtures/a/*.js'],
            'b': ['test/fixtures/b/*.js'],
            'c': ['test/fixtures/c/*.js']
          }
        });

        var expected = require('./expected/files-objects-expand.js');

        expect(actual.files).to.have.length(7);
        expect(actual.files[0].src).to.have.length(1);
        expect(actual.files[1].src).to.have.length(1);
        expect(actual.files[2].src).to.have.length(1);
        expect(actual.files[6].src).to.have.length(1);
      });
    });


  });

});
