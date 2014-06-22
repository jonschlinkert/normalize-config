module.exports = {
  a: {
    options: { flatten: true },
    files: {
      'dist/': '*.js' // or  ['*.js']
    }
  },

  b: {
    options: { flatten: true },
    files: {
      'foo/': 'a/*.js',
      'bar/': 'b/*.js'
    }
  },

  c: {
    options: { flatten: true },
    files: {
      'foo/': ['a/*.js'],
      'bar/': ['b/*.js']
    }
  },

  d: {
    options: { flatten: true },
    files: [
      {src: ['a/*.js'], dest: 'dist/'},
      {src: ['b/*.js'], dest: 'dist/'}
    ]
  },

  e: {
    options: { flatten: true },
    files: [
      {src: ['a/*.js'], dest: 'dist/'},
      {flatten: false, src: ['b/*.js'], dest: 'dist/'}
    ]
  },

  l: {
    options: { flatten: true },
    src: ['a/*.js'],
    dest: 'dist/'
  },

  m: {
    flatten: true,
    src: ['a/*.js'],
    dest: 'dist/'
  }
};