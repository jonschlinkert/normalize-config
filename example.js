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
        {src: 'fixtures/a/*.*', dest: '<%= config.base.dest %>/b', options: {}},
        {src: 'fixtures/b/*.*', dest: '<%= config.base.dest %>/d'},
        {src: 'fixtures/c/*.*', dest: '<%= config.base.dest %>/f', options: {}},
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
      src: 'fixtures/**/*.{js,txt}',
      dest: 'abc/'
    },
    whatever: {
      options: {foo: 'bar'},
      files: [
        {
          expand: true,
          cwd: 'fixtures/',
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
      options: {h: 'i'},
      pipeline: [],
      files: [
        {src: 'a', dest: 'b', options: {}},
        {src: 'c', dest: 'd'},
        {src: 'e', dest: 'f', options: {}},
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

// var res15a = new Target({
//   files: [
//     { cwd: 'fixtures', expand: true, flatten: true, src: ['files/*.txt'], dest: 'abc' }
//   ]
// });


// console.log(res15a.files)

// var target = new Target({
//   cwd: 'foo',
//   base: 'bar',
//   pipeline: [],
//   options: {a: 'b'},
//   src: 'js/*.js',
//   dest: 'dist/'
// }, {options: {c: 'd', a: 'z'}});

// target.cwd = 'baz';
// console.log(target.orig)

var config = new Config(tasks);
// var files = config.task('assemble.docs');

console.log(config);

// console.log(config.toArray('verb', 'docs'))
