var normalize = require('..');

var config = normalize({
  expand: true,
  src: ['test/fixtures/a/*.js', 'test/fixtures/b/*.js'],
  dest: 'dist/'
});


console.log(JSON.stringify(config, null, 2));


/**
 * results in:
 */

var result = {
  orig: {
    expand: true,
    src: [
      'test/fixtures/a/*.js',
      'test/fixtures/b/*.js'
    ],
    dest: 'dist/'
  },
  files: [
    {
      src: ['test/fixtures/a/x.js'],
      dest: 'dist/test/fixtures/a/x.js',
      orig: {
        options: {
          expand: true
        },
        src: [
          'test/fixtures/a/*.js',
          'test/fixtures/b/*.js'
        ],
        dest: 'dist/'
      }
    },
    {
      src: ['test/fixtures/a/y.js'],
      dest: 'dist/test/fixtures/a/y.js',
      orig: {
        options: {
          expand: true
        },
        src: [
          'test/fixtures/a/*.js',
          'test/fixtures/b/*.js'
        ],
        dest: 'dist/'
      }
    },
    {
      src: ['test/fixtures/b/x.js'],
      dest: 'dist/test/fixtures/b/x.js',
      orig: {
        options: {
          expand: true
        },
        src: [
          'test/fixtures/a/*.js',
          'test/fixtures/b/*.js'
        ],
        dest: 'dist/'
      }
    },
    {
      src: ['test/fixtures/b/y.js'],
      dest: 'dist/test/fixtures/b/y.js',
      orig: {
        options: {
          expand: true
        },
        src: [
          'test/fixtures/a/*.js',
          'test/fixtures/b/*.js'
        ],
        dest: 'dist/'
      }
    },
    {
      src: ['test/fixtures/b/z.js'],
      dest: 'dist/test/fixtures/b/z.js',
      orig: {
        options: {
          expand: true
        },
        src: [
          'test/fixtures/a/*.js',
          'test/fixtures/b/*.js'
        ],
        dest: 'dist/'
      }
    }
  ]
};
