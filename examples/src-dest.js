var normalize = require('..');

/**
 * EXAMPLE #1
 */

var config1 = normalize({src: '*.js', dest: 'dist/'});
console.log(JSON.stringify(config1, null, 2));

var result = {
  orig: {
    src: '*.js',
    dest: 'dist/'
  },
  files: [
    {
      src: ['index.js'],
      dest: 'dist/',
      orig: {
        options: {},
        src: ['*.js'],
        dest: 'dist/'
      }
    }
  ]
};




/**
 * EXAMPLE #2
 */


var config2 = normalize({
  src: ['test/fixtures/a/*.js', 'test/fixtures/b/*.js'],
  dest: 'dist/'
});
console.log(JSON.stringify(config2, null, 2));

var result = {
  orig: {
    src: [
      'test/fixtures/a/*.js',
      'test/fixtures/b/*.js'
    ],
    dest: 'dist/'
  },
  files: [
    {
      src: [
        'test/fixtures/a/x.js',
        'test/fixtures/a/y.js',
        'test/fixtures/b/x.js',
        'test/fixtures/b/y.js',
        'test/fixtures/b/z.js'
      ],
      dest: 'dist/',
      orig: {
        options: {},
        src: [
          'test/fixtures/a/*.js',
          'test/fixtures/b/*.js'
        ],
        dest: 'dist/'
      }
    }
  ]
};
