module.exports = [{
  src: ['a/x.js'],
  dest: 'a/x.txt'
}, {
  src: ['a/y.js'],
  dest: 'a/y.txt'
}, {
  src: ['b/x.js'],
  dest: 'b/x.txt'
}, {
  src: ['b/y.js'],
  dest: 'b/y.txt'
}, {
  src: ['b/z.js'],
  dest: 'b/z.txt'
}, {
  src: ['c/x.js'],
  dest: 'c/x.txt'
}, {
  src: ['c/y.js'],
  dest: 'c/y.txt'
}, {
  src: ['config.js'],
  dest: 'config.txt'
}, {
  orig: {
    src: ['**/*.js'],
    dest: './',
    options: {
      mapping: true,
      cwd: 'test/fixtures',
      ext: '.txt'
    }
  }
}];