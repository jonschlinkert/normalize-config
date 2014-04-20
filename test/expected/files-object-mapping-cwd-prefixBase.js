module.exports = [{
  src: ['test/fixtures/a/a.md', 'test/fixtures/a/a.txt'],
  dest: 'test/fixtures/a/a.txt'
}, {
  src: ['test/fixtures/a/b.md', 'test/fixtures/a/b.txt'],
  dest: 'test/fixtures/a/b.txt'
}, {
  src: ['test/fixtures/a/c.txt'],
  dest: 'test/fixtures/a/c.txt'
}, {
  src: ['test/fixtures/a/d.hbs'],
  dest: 'test/fixtures/a/d.txt'
}, {
  src: ['test/fixtures/a/e.hbs'],
  dest: 'test/fixtures/a/e.txt'
}, {
  src: ['test/fixtures/a/m.coffee'],
  dest: 'test/fixtures/a/m.txt'
}, {
  src: ['test/fixtures/a/x.js'],
  dest: 'test/fixtures/a/x.txt'
}, {
  src: ['test/fixtures/a/y.js'],
  dest: 'test/fixtures/a/y.txt'
}, {
  src: ['test/fixtures/b/a.md', 'test/fixtures/b/a.txt'],
  dest: 'test/fixtures/b/a.txt'
}, {
  src: ['test/fixtures/b/b.md', 'test/fixtures/b/b.txt'],
  dest: 'test/fixtures/b/b.txt'
}, {
  src: ['test/fixtures/b/c.txt'],
  dest: 'test/fixtures/b/c.txt'
}, {
  src: ['test/fixtures/b/f.hbs'],
  dest: 'test/fixtures/b/f.txt'
}, {
  src: ['test/fixtures/b/x.js'],
  dest: 'test/fixtures/b/x.txt'
}, {
  src: ['test/fixtures/b/y.js'],
  dest: 'test/fixtures/b/y.txt'
}, {
  src: ['test/fixtures/b/z.js'],
  dest: 'test/fixtures/b/z.txt'
}, {
  src: ['test/fixtures/c/a.md', 'test/fixtures/c/a.txt'],
  dest: 'test/fixtures/c/a.txt'
}, {
  src: ['test/fixtures/c/b.md', 'test/fixtures/c/b.txt'],
  dest: 'test/fixtures/c/b.txt'
}, {
  src: ['test/fixtures/c/c.txt'],
  dest: 'test/fixtures/c/c.txt'
}, {
  src: ['test/fixtures/c/d.coffee'],
  dest: 'test/fixtures/c/d.txt'
}, {
  src: ['test/fixtures/c/g.hbs'],
  dest: 'test/fixtures/c/g.txt'
}, {
  src: ['test/fixtures/c/x.js'],
  dest: 'test/fixtures/c/x.txt'
}, {
  src: ['test/fixtures/c/y.js'],
  dest: 'test/fixtures/c/y.txt'
}, {
  src: ['test/fixtures/c/z.coffee'],
  dest: 'test/fixtures/c/z.txt'
}, {
  src: ['test/fixtures/config.js'],
  dest: 'test/fixtures/config.txt'
}, {
  orig: {
    src: ['**/*'],
    dest: './',
    options: {
      mapping: true,
      cwd: 'test/fixtures',
      filter: 'isFile',
      ext: '.txt',
      prefixBase: true
    }
  }
}];