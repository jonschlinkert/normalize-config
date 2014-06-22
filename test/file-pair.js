/*!
 * normalize-config <https://github.com/jonschlinkert/normalize-config>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

var expect = require('chai').expect;
var normalize = require('..');

describe('filePair():', function () {
  describe('when an object with `src` and `dest` properties is passed to `.filePair()`:', function () {
    it('should add the properties to `filePair: [{src: ""}]', function () {
      var actual = normalize.filePair({ src: 'a', dest: 'b' });
      expect(actual).to.eql([ { options: {}, src: [ 'a' ], dest: 'b' } ]);
    });
  });

  describe('when an object with a `src` property is passed to `.filePair()`:', function () {
    it('should add the `src` property to `filePair: [{src: ""}]', function () {
      var actual = normalize.filePair({ src: 'a' });
      expect(actual).to.eql([ { options: {}, src: [ 'a' ], dest: '' } ]);
    });
  });

  describe('when an object with a non-src-dest property is passed to `.filePair()`:', function () {
    it('should extend the target-level filePair with the new value', function () {
      var actual = normalize.filePair({ b: 'c', src: 'a', dest: 'e' });
      expect(actual).to.eql([ { options: { b: 'c' }, src: [ 'a' ], dest: 'e' } ]);
    });
  });

  describe('when an object with a non-src-dest property is passed to `.filePair()`:', function () {
    it('should extend the target-level filePair with the new value', function () {
      var actual = normalize.filePair({ options: {}, b: 'c', src: 'a', dest: 'e' });
      expect(actual).to.eql([ { options: { b: 'c' }, src: [ 'a' ], dest: 'e' } ]);
    });
  });
});
