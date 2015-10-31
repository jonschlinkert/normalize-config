var normalize = require('../..');
var configs = [
  ['*.js'],
  ['*.js', 'foo/'],
  ['*.js', ''],
  [['*.js'], ''],
  ['*.js', 'foo/', {cwd: ''}],
  [['*.js']],
  [['foo', 'bar', '*.js']],
  [{'foo/': '*.js', 'bar/': '*.md'}],
  [{'foo/': '*.js', cwd: 'a', a: 'b'}],
  [{'foo/': '*.js'}],
  [{'': '*.js'}],
  [{'a/b/c': '*.js'}, {cwd: 'foo'}],
  [{dest: '', src: '*.js', options: {cwd: 'b/'}}],
  [{dest: 'a/', src: '*.js', options: {cwd: 'b/'}}],
  [{dest: 'foo/', src: '*.js', cwd: 'b'}],
  [{dest: 'foo/', src: '*.js'}],
  [{dest: 'foo/', src: '*.js'}, {process: true}],
  [{dest: 'foo/', src: ['*.js'], options: {cwd: 'c'}}],
  [{dest: 'out/'}],
  [{files: ['*.js']}],
  [{files: [{'foo/': '*.js', cwd: 'f'}]}],
  [{files: {'dist/': ['*.js']}}],
  [{files: {'foo/': '*.js', cwd: 'e'}}],
  [{options: {src: '*.js', dest: 'foo/', a: 'b'}}],
].forEach(function (config) {
  var res = normalize.apply(null, config);
  console.log(res);
  // console.log(res.files);
});
