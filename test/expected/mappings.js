module.exports = {
  orig: {
    options: { expand: true },
    files: { './': [ 'test/fixtures/**/*.js' ] } },
  files: [
    { src: [ 'test/fixtures/a/x.js' ],
      dest: 'test/fixtures/a/x.js',
      orig:
       { options: { expand: true },
         src: [ 'test/fixtures/**/*.js' ],
         dest: './' } },
    { src: [ 'test/fixtures/a/y.js' ],
      dest: 'test/fixtures/a/y.js',
      orig:
       { options: { expand: true },
         src: [ 'test/fixtures/**/*.js' ],
         dest: './' } },
    { src: [ 'test/fixtures/b/x.js' ],
      dest: 'test/fixtures/b/x.js',
      orig:
       { options: { expand: true },
         src: [ 'test/fixtures/**/*.js' ],
         dest: './' } },
    { src: [ 'test/fixtures/b/y.js' ],
      dest: 'test/fixtures/b/y.js',
      orig:
       { options: { expand: true },
         src: [ 'test/fixtures/**/*.js' ],
         dest: './' } },
    { src: [ 'test/fixtures/b/z.js' ],
      dest: 'test/fixtures/b/z.js',
      orig:
       { options: { expand: true },
         src: [ 'test/fixtures/**/*.js' ],
         dest: './' } },
    { src: [ 'test/fixtures/c/x.js' ],
      dest: 'test/fixtures/c/x.js',
      orig:
       { options: { expand: true },
         src: [ 'test/fixtures/**/*.js' ],
         dest: './' } },
    { src: [ 'test/fixtures/c/y.js' ],
      dest: 'test/fixtures/c/y.js',
      orig:
       { options: { expand: true },
         src: [ 'test/fixtures/**/*.js' ],
         dest: './' } },
    { src: [ 'test/fixtures/one.js' ],
      dest: 'test/fixtures/one.js',
      orig:
       { options: { expand: true },
         src: [ 'test/fixtures/**/*.js' ],
         dest: './' } },
    { src: [ 'test/fixtures/three.js' ],
      dest: 'test/fixtures/three.js',
      orig:
       { options: { expand: true },
         src: [ 'test/fixtures/**/*.js' ],
         dest: './' } },
    { src: [ 'test/fixtures/two.js' ],
      dest: 'test/fixtures/two.js',
      orig:
       { options: { expand: true },
         src: [ 'test/fixtures/**/*.js' ],
         dest: './' } } ] };