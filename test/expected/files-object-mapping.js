module.exports = [{
  src: ['test/fixtures/a/x.js'],
  dest: 'test/fixtures/a/x.js'
}, {
  src: ['test/fixtures/a/y.js'],
  dest: 'test/fixtures/a/y.js'
}, {
  src: ['test/fixtures/b/x.js'],
  dest: 'test/fixtures/b/x.js'
}, {
  src: ['test/fixtures/b/y.js'],
  dest: 'test/fixtures/b/y.js'
}, {
  src: ['test/fixtures/b/z.js'],
  dest: 'test/fixtures/b/z.js'
}, {
  src: ['test/fixtures/c/x.js'],
  dest: 'test/fixtures/c/x.js'
}, {
  src: ['test/fixtures/c/y.js'],
  dest: 'test/fixtures/c/y.js'
}, {
  src: ['test/fixtures/config.js'],
  dest: 'test/fixtures/config.js'
}, {
  orig: {
    src: ['test/fixtures/**/*.js'],
    dest: './',
    options: {
      mapping: true
    }
  }
}];