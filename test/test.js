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
  foo: {
    options: {
      task: true
    },
    a: {
      src: 'test/fixtures/a/*.md',
      one: 'two',
      three: 'four',
      dest: 'combined.md'
    },
    b: {
      options: {target: true},
      src: ['test/fixtures/b/*.txt'],
      dest: './combined.txt'
    },
    c: {
      files: {
        './': ['test/fixtures/**/*.coffee']
      }
    }
  },
  bar: {
    options: {
      task: false
    },
    d: {
      options: {
        target: true
      },
      files: {
        './a': ['test/fixtures/a/*.js'],
        './b': ['test/fixtures/b/*.js'],
        './c': ['test/fixtures/c/*.js']
      }
    },
    e: {
      files: [
        { mapping: true, cwd: 'test/fixtures/a', src: ['*.md'], dest: 'one/', ext: '.html' },
        { mapping: true, cwd: 'test/fixtures/b', src: ['*.md'], dest: 'two/', ext: '.html' },
        { mapping: true, cwd: 'test/fixtures/c', src: ['*.md'], dest: 'three/', ext: '.html' }
      ]
    },
    f: {
      options: {
        prefixBase: true
      },
      files: [
        { mapping: true, cwd: 'test/fixtures/a', src: ['*.hbs'], dest: 'one/', ext: '.md' },
        { mapping: true, cwd: 'test/fixtures/b', src: ['*.hbs'], dest: 'two/', ext: '.md' },
        { mapping: true, flatten: true, cwd: 'test/fixtures/c', src: ['*.hbs'], dest: 'three/', ext: '.md' }
      ]
    }
  }
};


normalize(config);

// describe('normalize.target():', function () {
//   describe('when an object with only an `options` property is passed:', function () {
//     it('should return a normalized target', function (done) {
//       var actual = normalize.target(config.foo.options);
//       var expected = result('actual-opts.js', actual, false);
//       expect(actual).to.eql(require(expected));
//       done();
//     });
//   });

//   describe('when an object with only an `options` property is directly passed in:', function () {
//     it('should expand files in src, and return an object with `orig`, `src` and `dest` properties', function (done) {
//       var actual = normalize.target(config.foo.a);
//       var expected = result('actual-a.js', actual, false);
//       expect(actual).to.deep.equal(require(expected));
//       done();
//     });
//   });

//   describe('when an object with a src-dest definition is passed in:', function () {
//     it('should expand files in src, and return an object with `orig`, `src` and `dest` properties', function (done) {
//       var actual = normalize.target(config.foo.b);
//       var expected = result('actual-b.js', actual, false);
//       expect(actual).to.deep.equal(require(expected));
//       done();
//     });
//   });
// });

// describe('normalize.target():', function () {

//   describe('when an object with a files-object definition is passed in:', function () {
//     it('should expand files and return an object with `orig`, `src` and `dest` properties', function (done) {
//       var actual = normalize.target(config.foo.c);
//       var expected = result('actual-c.js', actual, false);
//       expect(actual).to.deep.equal(require(expected));
//       done();
//     });
//   });

//   describe('when an object with a files-object definition is passed in:', function () {
//     it('should expand files and return an object with `orig`, `src` and `dest` properties', function (done) {
//       var actual = normalize.target(config.bar.d);
//       var expected = result('actual-d.js', actual, false);
//       expect(actual).to.deep.equal(require(expected));
//       done();
//     });
//   });

//   describe('when an object with a files-object definition is passed in:', function () {
//     it('should expand files and return an object with `orig`, `src` and `dest` properties', function (done) {
//       var actual = normalize.target(config.bar.e);
//       var expected = result('actual-e.js', actual, false);
//       expect(actual).to.deep.equal(require(expected));
//       done();
//     });
//   });

//   describe('when an object with a files-object definition is passed in:', function () {
//     it('should expand files and return an object with `orig`, `src` and `dest` properties', function (done) {
//       var actual = normalize.target(config.bar.f);
//       var expected = result('actual-f.js', actual, false);
//       expect(actual).to.deep.equal(require(expected));
//       done();
//     });
//   });
// });


// describe('normalize.task():', function () {
//   describe('when an object with a src-dest definition is passed in:', function () {
//     it('should expand files in src, and return an object with `orig`, `src` and `dest` properties', function (done) {
//       var actual = normalize.task(config.foo);
//       var expected = result('actual-task-foo.js', actual, false);
//       expect(actual).to.deep.equal(require(expected));
//       done();
//     });
//   });

//   describe('when an object with a files-object definition is passed in:', function () {
//     it('should expand files and return an object with `orig`, `src` and `dest` properties', function (done) {
//       var actual = normalize.task(config.bar);
//       var expected = result('actual-task-bar.js', actual, false);
//       expect(actual).to.deep.equal(require(expected));
//       done();
//     });
//   });
// });


// describe('normalize():', function () {
//   describe('when an object with a src-dest definition is passed in:', function () {
//     it('should expand files in src, and return an object with `orig`, `src` and `dest` properties', function (done) {
//       var actual = normalize(config);
//       var expected = result('actual-config.js', actual, false);
//       expect(actual).to.deep.equal(require(expected));
//       done();
//     });
//   });
// });