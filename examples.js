
var yellow = require('ansi-yellow');
var normalize = require('./');

function config() {
  var res = normalize.apply(null, arguments);
  console.log(res.files);
  return res;
}
function heading(title) {
  console.log();
  console.log(yellow(title));
  console.log();
}


/**
 * no dest
 */
heading('no dest');


config({path: '*.js'})
//=> { files: [ { src: [ '*.js' ], dest: '' } ] }
config({src: '*.js'})
//=> { files: [ { src: [ '*.js' ], dest: '' } ] }
config('*.js')
//=> { files: [ { src: [ '*.js' ], dest: '' } ] }
console.log('----');


/**
 * file object
 */
heading('file object');


config({path: '*.js'}, 'dist/')
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config({path: '*.js', dest: 'dist/'})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
console.log('----');


/**
 * cwd
 */
heading('cwd');


config('*.js', {dest: 'dist/'}, {cwd: 'foo'})
//=> { files: [ { cwd: 'foo', src: [ '*.js' ], dest: '' } ] }
config('*.js', {dest: 'dist/', cwd: 'foo'})
//=> { files: [ { cwd: 'foo', src: [ '*.js' ], dest: '' } ] }
config('*.js', 'dist/', {cwd: 'foo'})
//=> { files: [ { cwd: 'foo', src: [ '*.js' ], dest: '' } ] }
config({src: '*.js'}, {dest: 'dist/'}, {cwd: 'foo'})
//=> { files: [ { cwd: 'foo', src: [ '*.js' ], dest: '' } ] }
config({src: '*.js'}, {cwd: 'foo'}, {dest: 'dist/'})
//=> { files: [ { cwd: 'foo', src: [ '*.js' ], dest: '' } ] }
config({src: '*.js'}, {options: {cwd: 'foo'}}, {dest: 'dist/'})
//=> { files: [ { cwd: 'foo', src: [ '*.js' ], dest: '' } ] }
config({path: '*.js'}, {options: {cwd: 'foo'}}, {dest: 'dist/'})
//=> { files: [ { cwd: 'foo', src: [ '*.js' ], dest: '' } ] }
console.log('----');


/**
 * all the same
 */
heading('all the same');


config({src: '*.js'}, {dest: 'dist/'})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config({path: '*.js'}, {dest: 'dist/'})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config('*.js', {dest: 'dist/'})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config('*.js', 'dist/')
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config(['*.js'], 'dist/')
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config({'dist/': '*.js'})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config({'dist/': ['*.js']})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config({src: '*.js', dest: 'dist/'})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config({path: '*.js', dest: 'dist/'})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config({src: ['*.js'], dest: 'dist/'})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config({files: {'dist/': '*.js'}})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config({files: {'dist/': ['*.js']}})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
config({files: [{'dist/': ['*.js']}]})
//=> { files: [ { src: [ '*.js' ], dest: 'dist/' } ] }
console.log('----');

