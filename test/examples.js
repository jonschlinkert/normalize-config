const expand = require('../');

var foo = {
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

var config = JSON.stringify(expand(foo), null, 2);
// console.log(config);