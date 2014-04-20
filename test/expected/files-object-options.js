module.exports = [{
  orig: {
    src: ['test/fixtures/a/*.coffee'],
    dest: 'foo.coffee',
    options: {
      concat: true
    }
  },
  src: ['test/fixtures/a/m.coffee'],
  dest: 'foo.coffee'
}];