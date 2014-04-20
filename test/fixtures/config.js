module.exports = {
  foo: {
    options: {
      process: true
    },
    a: {
      src: 'test/fixtures/a/*.md',
      one: 'two',
      three: 'four',
      dest: 'combined.md'
    },
    b: {
      options: {copy: true, process: false},
      src: ['test/fixtures/b/*.txt'],
      dest: './combined.txt'
    },
    c: {
      files: {
        './': ['test/fixtures/**/*.coffee']
      }
    }
  },
  bar: {
    options: {
      task: false
    },
    d: {
      options: {
        target: true
      },
      files: {
        './a': ['test/fixtures/a/*.js'],
        './b': ['test/fixtures/b/*.js'],
        './c': ['test/fixtures/c/*.js']
      }
    },
    e: {
      files: [
        { mapping: true, cwd: 'test/fixtures/a', src: ['*.md'], dest: 'one/', ext: '.html' },
        { mapping: true, cwd: 'test/fixtures/b', src: ['*.md'], dest: 'two/', ext: '.html' },
        { mapping: true, cwd: 'test/fixtures/c', src: ['*.md'], dest: 'three/', ext: '.html' }
      ]
    },
    f: {
      options: {
        prefixBase: true
      },
      files: [
        { mapping: true, cwd: 'test/fixtures/a', src: ['*.hbs'], dest: 'one/', ext: '.md' },
        { mapping: true, cwd: 'test/fixtures/b', src: ['*.hbs'], dest: 'two/', ext: '.md' },
        { mapping: true, flatten: true, cwd: 'test/fixtures/c', src: ['*.hbs'], dest: 'three/', ext: '.md' }
      ]
    }
  }
};