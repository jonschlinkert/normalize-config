module.exports = {
  orig: {
    options: { expand: true },
    files:
      { 'a/': [ 'test/fixtures/a/*.js' ],
        'b/': [ 'test/fixtures/b/*.js' ],
        'c/': [ 'test/fixtures/c/*.js' ] } },
  files: [
    { src: [ 'test/fixtures/a/x.js' ],
      dest: 'a/test/fixtures/a/x.js',
      orig:
      { options: { expand: true },
        src: [ 'test/fixtures/a/*.js' ],
        dest: 'a' } },
    { src: [ 'test/fixtures/a/y.js' ],
      dest: 'a/test/fixtures/a/y.js',
      orig:
      { options: { expand: true },
        src: [ 'test/fixtures/a/*.js' ],
        dest: 'a' } },
    { src: [ 'test/fixtures/b/x.js' ],
      dest: 'b/test/fixtures/b/x.js',
      orig:
      { options: { expand: true },
        src: [ 'test/fixtures/b/*.js' ],
        dest: 'b' } },
    { src: [ 'test/fixtures/b/y.js' ],
      dest: 'b/test/fixtures/b/y.js',
      orig:
      { options: { expand: true },
        src: [ 'test/fixtures/b/*.js' ],
        dest: 'b' } },
    { src: [ 'test/fixtures/b/z.js' ],
      dest: 'b/test/fixtures/b/z.js',
      orig:
      { options: { expand: true },
        src: [ 'test/fixtures/b/*.js' ],
        dest: 'b' } },
    { src: [ 'test/fixtures/c/x.js' ],
      dest: 'c/test/fixtures/c/x.js',
      orig:
      { options: { expand: true },
        src: [ 'test/fixtures/c/*.js' ],
        dest: 'c' } },
    { src: [ 'test/fixtures/c/y.js' ],
      dest: 'c/test/fixtures/c/y.js',
      orig:
      { options: { expand: true },
        src: [ 'test/fixtures/c/*.js' ],
        dest: 'c' } } ] };