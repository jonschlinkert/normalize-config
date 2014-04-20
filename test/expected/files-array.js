module.exports = [{
  orig: {
    src: ['test/fixtures/a/*.js'],
    dest: './a'
  },
  src: ['test/fixtures/a/x.js', 'test/fixtures/a/y.js'],
  dest: './a'
}, {
  orig: {
    src: ['test/fixtures/b/*.js'],
    dest: './b'
  },
  src: ['test/fixtures/b/x.js',
    'test/fixtures/b/y.js',
    'test/fixtures/b/z.js'
  ],
  dest: './b'
}];