module.exports = [{
  src: ['a/x.js'],
  dest: 'a/x.js'
}, {
  src: ['a/y.js'],
  dest: 'a/y.js'
}, {
  src: ['b/x.js'],
  dest: 'b/x.js'
}, {
  src: ['b/y.js'],
  dest: 'b/y.js'
}, {
  src: ['b/z.js'],
  dest: 'b/z.js'
}, {
  src: ['c/x.js'],
  dest: 'c/x.js'
}, {
  src: ['c/y.js'],
  dest: 'c/y.js'
}, {
  src: ['config.js'],
  dest: 'config.js'
}, {
  orig: {
    src: ['**/*.js'],
    dest: './',
    options: {
      mapping: true,
      cwd: 'test/fixtures'
    }
  }
}];