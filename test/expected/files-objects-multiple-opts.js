module.exports = [{
  src: ['test/fixtures/a/x.js'],
  dest: 'test/fixtures/a/x.js'
}, {
  src: ['test/fixtures/a/y.js'],
  dest: 'test/fixtures/a/y.js'
}, {
  orig: {
    src: ['test/fixtures/a/*.js'],
    dest: 'a',
    options: {
      mapping: true
    }
  }
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
  orig: {
    src: ['test/fixtures/b/*.js'],
    dest: 'b',
    options: {
      mapping: true
    }
  }
}, {
  src: ['test/fixtures/c/x.js'],
  dest: 'test/fixtures/c/x.js'
}, {
  src: ['test/fixtures/c/y.js'],
  dest: 'test/fixtures/c/y.js'
}, {
  orig: {
    src: ['test/fixtures/c/*.js'],
    dest: 'c',
    options: {
      mapping: true
    }
  }
}];