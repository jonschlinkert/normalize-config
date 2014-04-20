module.exports = [
  [{
    orig: {
      task: false,
      options: {
        task: false
      }
    }
  }],
  [{
    orig: {
      src: ['test/fixtures/a/*.js'],
      dest: './a',
      options: {
        task: false,
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
        task: false,
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
        task: false,
        target: true
      }
    },
    src: ['test/fixtures/c/x.js', 'test/fixtures/c/y.js'],
    dest: './c'
  }],
  [{
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
      ext: '.html',
      options: {
        task: false
      }
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
      ext: '.html',
      options: {
        task: false
      }
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
      ext: '.html',
      options: {
        task: false
      }
    }
  }],
  [{
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
        task: false,
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
        task: false,
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
        task: false,
        prefixBase: true
      }
    }
  }]
];