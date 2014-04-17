const file = require('fs-utils');
const normalize = require('../');

var config = {
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

var result = normalize(config);
file.writeJSONSync('tmp/result-concat.json', result);
console.log(result);



var config = {
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

normalize(config).forEach(function(fp) {
  console.log(fp);
})

file.writeJSONSync('config.json', normalize(config));
