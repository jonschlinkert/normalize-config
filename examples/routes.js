var normalize = require('..');

var config = normalize({
  options: {
    expand: true,
    cwd: 'test/fixtures',
    destBase: 'foo/bar',
    route: ':dest/:destBase/blah/:basename.html'
  },
  src: ['a/*.js', 'b/*.js'],
  dest: 'dist/'
});

console.log(JSON.stringify(config, null, 2));



/**
 * results in:
 */

var result = {
  orig: {
    options: {
      expand: true,
      cwd: 'test/fixtures',
      destBase: 'foo/bar',
      route: ':dest/:destBase/blah/:basename.html'
    },
    src: ['a/*.js', 'b/*.js'],
    dest: 'dist/'
  },
  files: [
    {
      src: ['a/x.js'],
      // each `dest` was generated from the specified `route`
      dest: 'dist/foo/bar/blah/x.html',
      orig: {
        options: {
          expand: true,
          cwd: 'test/fixtures',
          destBase: 'foo/bar',
          route: ':dest/:destBase/blah/:basename.html'
        },
        src: ['a/*.js', 'b/*.js'],
        dest: 'dist/'
      }
    },
    {
      src: ['a/y.js'],
      dest: 'dist/foo/bar/blah/y.html',
      orig: {
        options: {
          expand: true,
          cwd: 'test/fixtures',
          destBase: 'foo/bar',
          route: ':dest/:destBase/blah/:basename.html'
        },
        src: ['a/*.js', 'b/*.js'],
        dest: 'dist/'
      }
    },
    {
      src: ['b/x.js'],
      dest: 'dist/foo/bar/blah/x.html',
      orig: {
        options: {
          expand: true,
          cwd: 'test/fixtures',
          destBase: 'foo/bar',
          route: ':dest/:destBase/blah/:basename.html'
        },
        src: ['a/*.js', 'b/*.js'],
        dest: 'dist/'
      }
    },
    {
      src: ['b/y.js'],
      dest: 'dist/foo/bar/blah/y.html',
      orig: {
        options: {
          expand: true,
          cwd: 'test/fixtures',
          destBase: 'foo/bar',
          route: ':dest/:destBase/blah/:basename.html'
        },
        src: ['a/*.js', 'b/*.js'],
        dest: 'dist/'
      }
    },
    {
      src: ['b/z.js'],
      dest: 'dist/foo/bar/blah/z.html',
      orig: {
        options: {
          expand: true,
          cwd: 'test/fixtures',
          destBase: 'foo/bar',
          route: ':dest/:destBase/blah/:basename.html'
        },
        src: ['a/*.js', 'b/*.js'],
        dest: 'dist/'
      }
    }
  ]
};
