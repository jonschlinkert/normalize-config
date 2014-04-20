module.exports = [{
  src: ['a/x.js', 'b/x.js', 'c/x.js'],
  dest: 'x.js'
}, {
  src: ['a/y.js', 'b/y.js', 'c/y.js'],
  dest: 'y.js'
}, {
  src: ['b/z.js'],
  dest: 'z.js'
}, {
  src: ['config.js'],
  dest: 'config.js'
}, {
  orig: {
    src: ['**/*.js'],
    dest: './',
    options: {
      mapping: true,
      cwd: 'test/fixtures',
      flatten: true
    }
  }
}];