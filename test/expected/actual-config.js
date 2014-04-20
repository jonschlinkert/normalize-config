module.exports = [{
    options: {
      task: true
    }
  },
  {
    orig: {
      src: 'test/fixtures/a/*.md',
      one: 'two',
      three: 'four',
      dest: 'combined.md'
    },
    options: {
      one: 'two',
      three: 'four',
      task: true
    },
    src: ['test/fixtures/a/a.md', 'test/fixtures/a/b.md'],
    dest: 'combined.md'
  },
  {
    orig: {
      options: {
        target: true
      },
      src: ['test/fixtures/b/*.txt'],
      dest: './combined.txt'
    },
    options: {
      target: true,
      task: true
    },
    src: ['test/fixtures/b/a.txt',
       'test/fixtures/b/b.txt',
       'test/fixtures/b/c.txt'],
    dest: './combined.txt'
  },
  {
    orig: {
      src: ['test/fixtures/**/*.coffee'],
      dest: './'
    },
    options: {
      task: true
    },
    src: ['test/fixtures/a/m.coffee',
       'test/fixtures/c/d.coffee',
       'test/fixtures/c/z.coffee'],
    dest: './'
  },
  {
    options: {
      task: false
    }
  },
  {
    orig: {
      src: ['test/fixtures/a/*.js'],
      dest: './a'
    },
    options: {
      task: false,
      target: true
    },
    src: ['test/fixtures/a/x.js', 'test/fixtures/a/y.js'],
    dest: './a'
  },
  {
    orig: {
      src: ['test/fixtures/b/*.js'],
      dest: './b'
    },
    options: {
      task: false,
      target: true
    },
    src: ['test/fixtures/b/x.js', 'test/fixtures/b/y.js'],
    dest: './b'
  },
  {
    orig: {
      src: ['test/fixtures/c/*.js'],
      dest: './c'
    },
    options: {
      task: false,
      target: true
    },
    src: ['test/fixtures/c/x.js', 'test/fixtures/c/y.js'],
    dest: './c'
  },
  {
    orig: {
      mapping: true,
      cwd: 'test/fixtures/a',
      src: ['*.md'],
      dest: 'one/',
      ext: '.html'
    },
    options: {
      mapping: true,
      task: false
    },
    src: ['b.md'],
    dest: 'one/b.html'
  },
  {
    orig: {
      mapping: true,
      cwd: 'test/fixtures/b',
      src: ['*.md'],
      dest: 'two/',
      ext: '.html'
    },
    options: {
      mapping: true,
      task: false
    },
    src: ['b.md'],
    dest: 'two/b.html'
  },
  {
    orig: {
      mapping: true,
      cwd: 'test/fixtures/c',
      src: ['*.md'],
      dest: 'three/',
      ext: '.html'
    },
    options: {
      mapping: true,
      task: false
    },
    src: ['b.md'],
    dest: 'three/b.html'
  },
  {
    orig: {
      mapping: true,
      cwd: 'test/fixtures/a',
      src: ['*.hbs'],
      dest: 'one/',
      ext: '.md'
    },
    options: {
      mapping: true,
      task: false,
      prefixBase: true
    },
    src: ['e.hbs'],
    dest: 'one/e.md'
  },
  {
    orig: {
      mapping: true,
      cwd: 'test/fixtures/b',
      src: ['*.hbs'],
      dest: 'two/',
      ext: '.md'
    },
    options: {
      mapping: true,
      task: false,
      prefixBase: true
    },
    src: ['f.hbs'],
    dest: 'two/f.md'
  },
  {
    orig: {
      mapping: true,
      flatten: true,
      cwd: 'test/fixtures/c',
      src: ['*.hbs'],
      dest: 'three/',
      ext: '.md'
    },
    options: {
      mapping: true,
      task: false,
      prefixBase: true
    },
    src: ['g.hbs'],
    dest: 'three/g.md'
  }];