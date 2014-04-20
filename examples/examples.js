const file = require('fs-utils');
const glob = require('globule');
const normalize = require('../');

var config1 = {
  assemble: {
    options: {
      filter: 'isFile'
    },
    aaa: {
      options: {
        cwd: 'test/fixtures'
      },
      src: ['a/*.js', 'c/b.txt'],
      dest: 'a/'
    },
    bbb: {
      options: {
        cwd: 'test/fixtures'
      },
      src: ['b/*.md'],
      dest: 'b/'
    },
    ccc: {
      files: {
        'tmp/foo/': ['test/fixtures/a/**/*.txt']
      }
    },
    ddd: {
      files: [
        {
          'tmp/bar/': ['test/fixtures/b/**']
        },
        {
          'tmp/bar/': ['test/fixtures/c/**']
        }
      ]
    },
    eee: {
      files: [
        {
          dest: 'tmp/bar/',
          src: ['test/fixtures/b/**']
        },
        {
          dest: 'tmp/bar/',
          src: ['test/fixtures/c/**']
        }
      ]
    },
    fff: {
      files: {
        'tmp/bar/': ['test/fixtures/b/**'],
        'tmp/baz/': ['test/fixtures/c/**/*.md']
      }
    },
    ggg: {
      options: {
        cwd: 'test'
      },
      files: {
        'tmp/bar/': ['fixtures/b/**'],
        'tmp/baz/': ['fixtures/c/**']
      }
    }
  }
};

var result = normalize(config1);
file.writeJSONSync('tmp/result-concat.json', result);
console.log(result);



var config2 = {
  'verb-cli': {
    options: {
      cwd: 'docs'
    },
    readme: {
      src: ['README.tmpl.md'],
      dest: 'README.md'
    },
    docs: {
      src: ['**/*.tmpl.md'],
      dest: './'
    },
    verbmd: {
      options: {
        cwd: '.'
      },
      src: ['.verbrc.md'],
      dest: 'README.md'
    },
    foo: {
      files: {
        './': ['**/*.md']
      }
    }
  }
};

normalize(config2).forEach(function(fp) {
  console.log(fp);
})

file.writeJSONSync('config2.json', normalize(config2));


// var normalized = normalize.target({
//   options: {
//     mapping: true,
//     // flatten: true,
//     prefixBase: true,
//     ext: '.txt',
//     cwd: 'test/fixtures'
//   },
//   files: {
//     './': ['**/*.js']
//   }
// });

// console.log(JSON.stringify(normalized, null, 2));




// var options = {
//   // flatten: true,
//   cwd: 'test/fixtures',
//   src: '**/*',
//   filter: 'isFile',
//   ext: '.txt',
//   // destBase: 'foo',
//   prefixBase: true
// };


// var foo = glob.findMapping(options);

// console.log(foo);