module.exports = {
  options: {base: 'foo'},
  assemble: {
    options: {cwd: 'fixtures'},
    site: {
      src: 'a/*.js',
      dest: 'site/'
    },
    blog: {
      src: ['b/*.js'],
      dest: 'site/blog'
    },
    docs: {
      options: {
        cwd: 'templates'
      },
      files: {
        src: '*.hbs',
        dest: 'docs/'
      }
    },
  },
  a: {src: 'a/*.js'},
  b: {src: ['a/*.js']},
  c: {src: ['a/*.js', 'b/*.js']},
  d: {src: ['a/*.js', 'b/*.js']},
  e: {files: ['a/*.js', 'b/*.js']},
  f: {files: [{src: 'a/*.js', dest: 'dist/a/'}, {src: 'b/*.js', dest: 'dist/b/', cwd: 'foo'}]},
  g: {files: [{src: 'a/*.js'}, {src: 'b/*.js'}]},
}