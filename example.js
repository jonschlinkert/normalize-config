var Target = require('./lib/target');
var Config = require('./');

var tasks = {
  config: {
    base: {
      dest: '_gh_pages'
    }
  },
  verb: {
    readme: {
      options: {e: 'f', x: 'y'},
      pipeline: [],
      src: '<%= assemble.site.src %>',
      dest: 'bar/',
      run: function() {},
    },
    docs: {
      deps: [],
      run: function() {},
      options: {hhh: 'iii'},
      pipeline: [],
      files: [
        {src: 'fixtures/files/a/*.*', dest: '<%= config.base.dest %>/b', options: {}},
        {src: 'fixtures/files/b/*.*', dest: '<%= config.base.dest %>/d'},
        {src: 'fixtures/files/c/*.*', dest: '<%= config.base.dest %>/f', options: {}},
      ]
    }
  },
  assemble: {
    options: {a: 'b'},
    pipeline: [],
    faux: {
      options: {},
      pipeline: []
    },
    site: {
      options: {c: 'd'},
      pipeline: [],
      src: 'fixtures/files/**/*.{js,txt}',
      dest: 'abc/'
    },
    whatever: {
      options: {foo: 'bar'},
      files: [
        {
          expand: true,
          cwd: 'fixtures/files/',
          src: ['**/*.js'],
          dest: 'build/',
          ext: '.min.js',
          extDot: 'first'
        }
      ]
    },
    blog: {
      deps: [],
      options: {e: 'f', x: 'y'},
      pipeline: [],
      files: {
        options: {e: 'g'},
        src: '<%= assemble.site.src %>',
        dest: 'bar/'
      },
      run: function() {},
    },
    docs: {
      deps: [],
      run: function() {},
      options: {h: 'i', expand: true},
      pipeline: [],
      files: [
        {src: 'fixtures/files/a/**/*.txt', dest: 'b'},
        {src: 'fixtures/files/b/**/*.js', dest: 'd'},
        {src: 'c/**/*.coffee', dest: 'f', cwd: 'fixtures/files'},
      ]
    }
  }
};

// var res9 = new Target({
//   files: [
//     { expand: false, src: ['fixtures/files/*.txt'], dest: 'abc' },
//   ]
// });

// var res10 = new Target({
//   options: {
//     destBase: 'site',
//     cwd: 'fixtures'
//   },
//   files: [
//     { expand: true, src: ['files/*.txt'] },
//   ]
// });

// var res11 = new Target({
//   files: [
//     { expand: true, flatten: true, src: ['fixtures/files/*.txt'], dest: 'abc' }
//   ]
// });

// var res11 = new Target({
//   files: [
//     { cwd: 'fixtures', expand: true, flatten: true, src: ['files/*.txt'], dest: 'abc' }
//   ]
// });

// var res14 = new Target({
//   options: {
//     ext: '.md',
//     destBase: 'site',
//     cwd: 'fixtures',
//   },
//   files: [
//     { expand: ':dest/:dirname/:name:ext', src: ['files/*.txt'], dest: 'site' },
//   ]
// });
// console.log(res14.files)

// var res15a = new Target({
//   files: [
//     { cwd: 'fixtures', expand: true, flatten: true, src: ['files/*.txt'], dest: 'abc' }
//   ]
// });
// console.log(res15a)



var target = new Target({
  base: 'bar',
  pipeline: [],
  options: {a: 'b'},
  expand: true,
  src: 'fixtures/files/**/*.js',
  dest: 'dist/'
});

console.log(target)

// var config = new Config(tasks);
// var docs = config.task('assemble.docs');
// console.log(docs.files);

// console.log(config.toArray('verb', 'docs'))
