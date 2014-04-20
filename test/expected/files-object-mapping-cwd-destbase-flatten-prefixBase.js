module.exports = [{
  src: ['test/fixtures/a/a.md',
    'test/fixtures/a/a.txt',
    'test/fixtures/b/a.md',
    'test/fixtures/b/a.txt',
    'test/fixtures/c/a.md',
    'test/fixtures/c/a.txt'
  ],
  dest: 'foo/a.txt'
}, {
  src: ['test/fixtures/a/b.md',
    'test/fixtures/a/b.txt',
    'test/fixtures/b/b.md',
    'test/fixtures/b/b.txt',
    'test/fixtures/c/b.md',
    'test/fixtures/c/b.txt'
  ],
  dest: 'foo/b.txt'
}, {
  src: ['test/fixtures/a/c.txt',
    'test/fixtures/b/c.txt',
    'test/fixtures/c/c.txt'
  ],
  dest: 'foo/c.txt'
}, {
  src: ['test/fixtures/a/d.hbs', 'test/fixtures/c/d.coffee'],
  dest: 'foo/d.txt'
}, {
  src: ['test/fixtures/a/e.hbs'],
  dest: 'foo/e.txt'
}, {
  src: ['test/fixtures/a/m.coffee'],
  dest: 'foo/m.txt'
}, {
  src: ['test/fixtures/a/x.js',
    'test/fixtures/b/x.js',
    'test/fixtures/c/x.js'
  ],
  dest: 'foo/x.txt'
}, {
  src: ['test/fixtures/a/y.js',
    'test/fixtures/b/y.js',
    'test/fixtures/c/y.js'
  ],
  dest: 'foo/y.txt'
}, {
  src: ['test/fixtures/b/f.hbs'],
  dest: 'foo/f.txt'
}, {
  src: ['test/fixtures/b/z.js', 'test/fixtures/c/z.coffee'],
  dest: 'foo/z.txt'
}, {
  src: ['test/fixtures/c/g.hbs'],
  dest: 'foo/g.txt'
}, {
  src: ['test/fixtures/config.js'],
  dest: 'foo/config.txt'
}, {
  orig: {
    src: ['**/*'],
    dest: './',
    options: {
      mapping: true,
      flatten: true,
      cwd: 'test/fixtures',
      filter: 'isFile',
      ext: '.txt',
      destBase: 'foo',
      prefixBase: true
    }
  }
}];