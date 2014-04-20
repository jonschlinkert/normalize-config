module.exports = [
  [{
    orig: {
      process: true,
      options: {
        process: true
      }
    }
  }],
  [{
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
  }],
  [{
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
  }],
  [{
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
  }]
];