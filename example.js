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
        {src: 'a', dest: '<%= config.base.dest %>/b', options: {}},
        {src: 'c', dest: '<%= config.base.dest %>/d'},
        {src: 'e', dest: '<%= config.base.dest %>/f', options: {}},
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
      src: 'one/*.js',
      dest: 'two/'
    },
    whatever: {
      options: {foo: 'bar'},
      files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'lib/',      // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: 'build/',   // Destination path prefix.
          ext: '.min.js',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
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

var res14 = new Target({
  options: {
    ext: '.md',
    destBase: 'site',
    cwd: 'fixtures',
  },
  files: [
    { expand: ':dest/:dirname/:name:ext', src: ['files/*.txt'], dest: 'site' },
  ]
});

var res15 = new Target({
  files: [
    { cwd: 'fixtures', expand: true, flatten: true, src: ['files/*.txt'], dest: 'abc' }
  ]
});
console.log(res15)
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

// var config = new Config(tasks);
// var files = config.task('assemble.docs');

// console.log(files);

// console.log(config.toArray('verb', 'docs'))
