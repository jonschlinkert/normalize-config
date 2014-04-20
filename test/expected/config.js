module.exports = [{
  orig: {
    process: true,
    options: {
      process: true
    }
  }
}, {
  orig: {
    src: 'test/fixtures/a/*.md',
    one: 'two',
    three: 'four',
    dest: 'combined.md',
    options: {
      process: true
    }
  },
  src: ['test/fixtures/a/a.md', 'test/fixtures/a/b.md'],
  dest: 'combined.md'
}, {
  orig: {
    options: {
      process: false,
      copy: true
    },
    src: ['test/fixtures/b/*.txt'],
    dest: './combined.txt'
  },
  src: ['test/fixtures/b/a.txt',
    'test/fixtures/b/b.txt',
    'test/fixtures/b/c.txt'
  ],
  dest: './combined.txt'
}, {
  orig: {
    src: ['test/fixtures/**/*.coffee'],
    dest: './',
    options: {
      process: true
    }
  },
  src: ['test/fixtures/a/m.coffee',
    'test/fixtures/c/d.coffee',
    'test/fixtures/c/z.coffee'
  ],
  dest: './'
}, {
  orig: {
    src: ['test/fixtures/a/*.js'],
    dest: './a',
    options: {
      target: true
    }
  },
  src: ['test/fixtures/a/x.js', 'test/fixtures/a/y.js'],
  dest: './a'
}, {
  orig: {
    src: ['test/fixtures/b/*.js'],
    dest: './b',
    options: {
      target: true
    }
  },
  src: ['test/fixtures/b/x.js',
    'test/fixtures/b/y.js',
    'test/fixtures/b/z.js'
  ],
  dest: './b'
}, {
  orig: {
    src: ['test/fixtures/c/*.js'],
    dest: './c',
    options: {
      target: true
    }
  },
  src: ['test/fixtures/c/x.js', 'test/fixtures/c/y.js'],
  dest: './c'
}, {
  src: ['a.md'],
  dest: 'one/a.html'
}, {
  src: ['b.md'],
  dest: 'one/b.html'
}, {
  orig: {
    mapping: true,
    cwd: 'test/fixtures/a',
    src: ['*.md'],
    dest: 'one/',
    ext: '.html'
  }
}, {
  src: ['a.md'],
  dest: 'two/a.html'
}, {
  src: ['b.md'],
  dest: 'two/b.html'
}, {
  orig: {
    mapping: true,
    cwd: 'test/fixtures/b',
    src: ['*.md'],
    dest: 'two/',
    ext: '.html'
  }
}, {
  src: ['a.md'],
  dest: 'three/a.html'
}, {
  src: ['b.md'],
  dest: 'three/b.html'
}, {
  orig: {
    mapping: true,
    cwd: 'test/fixtures/c',
    src: ['*.md'],
    dest: 'three/',
    ext: '.html'
  }
}, {
  src: ['test/fixtures/a/d.hbs'],
  dest: 'one/test/fixtures/a/d.md'
}, {
  src: ['test/fixtures/a/e.hbs'],
  dest: 'one/test/fixtures/a/e.md'
}, {
  orig: {
    mapping: true,
    cwd: 'test/fixtures/a',
    src: ['*.hbs'],
    dest: 'one/',
    ext: '.md',
    options: {
      prefixBase: true
    }
  }
}, {
  src: ['test/fixtures/b/f.hbs'],
  dest: 'two/test/fixtures/b/f.md'
}, {
  orig: {
    mapping: true,
    cwd: 'test/fixtures/b',
    src: ['*.hbs'],
    dest: 'two/',
    ext: '.md',
    options: {
      prefixBase: true
    }
  }
}, {
  src: ['test/fixtures/c/g.hbs'],
  dest: 'three/g.md'
}, {
  orig: {
    mapping: true,
    flatten: true,
    cwd: 'test/fixtures/c',
    src: ['*.hbs'],
    dest: 'three/',
    ext: '.md',
    options: {
      prefixBase: true
    }
  }
}];