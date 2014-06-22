var normalize = require('..');

var config = {
  options: {expand: true},
  files: {
    'dist/a/': 'test/fixtures/o*.js',
    'dist/b/': 'test/fixtures/t*.js',
  }
};


var result = normalize(config);
console.log(JSON.stringify(result, null, 2));


/**
 * results in:
 */

var result = {
  orig: {
    options: {expand: true},
    files: {
      'dist/a/': 'test/fixtures/o*.js',
      'dist/b/': 'test/fixtures/t*.js'
    }
  },
  files: [
    {
      src: ['test/fixtures/one.js'],
      dest: 'dist/a/test/fixtures/one.js',
      orig: {
        options: {expand: true },
        src: ['test/fixtures/o*.js'],
        dest: 'dist/a/'
      }
    },
    {
      src: ['test/fixtures/three.js'],
      dest: 'dist/b/test/fixtures/three.js',
      orig: {
        options: {expand: true },
        src: ['test/fixtures/t*.js'],
        dest: 'dist/b/'
      }
    },
    {
      src: ['test/fixtures/two.js'],
      dest: 'dist/b/test/fixtures/two.js',
      orig: {
        options: {expand: true },
        src: ['test/fixtures/t*.js'],
        dest: 'dist/b/'
      }
    }
  ]
};
