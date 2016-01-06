'use strict';

require('mocha');
require('should');
var path = require('path');
var util = require('util');
var assert = require('assert');

// wrap `normalize` to log out results
function inspect(config) {
  var fn = require('..');
  config = config || {};
  return function(val) {
    var config = fn.apply(fn, arguments);
    if (config.debug === true) {
      console.log(util.inspect(config, null, 10));
    }
    return config;
  };
}

// change to `true` to log out results
var normalize = inspect({debug: false});

function toFile(file, dest) {
  file = file || {};
  if (typeof file === 'string') {
    var filepath = file;
    file = { path: filepath };
  }
  if (dest) file.dest = dest;
  file.relative = path.relative(process.cwd(), file.path);
  file.basename = path.basename(file.path);
  return file;
}

describe('normalize', function() {
  describe('errors', function(cb) {
    it('should throw an error on invalid arguments', function(cb) {
      try {
        normalize();
        cb(new Error('expected an error'));
      } catch(err) {
        assert(err);
        assert(err.message);
        assert(err.message === 'unsupported argument type: undefined');
        cb();
      }
    });

    it('should throw an error when `files` is an invalid type', function(cb) {
      try {
        normalize({files: 'foo'});
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert(err.message === 'expected "files" to be an array or object');
        cb();
      }
    });
  });

  describe('arguments list', function() {
    it('should normalize the first argument to src when it is a string', function() {
      var config = normalize('*.js');
      assert(config.files[0].src[0] === '*.js');
    });

    it('should normalize the first argument to src when it is an array', function() {
      assert(normalize(['*.js']).files[0].src[0] === '*.js');
      assert(normalize(['foo', 'bar', '*.js']).files[0].src[0] === 'foo');
    });

    it('should convert the second arg to dest when it is a string', function() {
      var config = normalize('*.js', 'foo/');
      assert(config.files[0].src[0] === '*.js');
      assert(config.files[0].dest === 'foo/');
    });

    it('should dest from the second arg when it is an object', function() {
      var config = normalize('*.js', {dest: 'foo/'});
      assert(config.files[0].src[0] === '*.js');
      assert(config.files[0].dest === 'foo/');
    });

    it('should convert the second arg to dest when the third args is an object', function() {
      var config = normalize('*.js', 'foo/', {cwd: ''});
      assert(config.files[0].src[0] === '*.js');
      assert(config.files[0].dest === 'foo/');
      assert(config.files[0].options.cwd === '');
    });

    it('should arrayify src when args are converted', function() {
      var config = normalize('*.js', 'foo/');
      assert(Array.isArray(config.files[0].src));
      assert(config.files[0].src[0] === '*.js');
    });

    it('should flatten nested "options.options" objects', function() {
      var config = normalize('*.js', 'dist/', {options: {cwd: 'foo'}});
      assert(config.files[0].options);
      assert(!config.files[0].options.options);
      assert(config.files[0].options.cwd === 'foo');
    });
  });

  describe('src-dest on options', function() {
    it('should support src and dest defined on options', function() {
      // this allows a default src/dest to be passed from main options
      // of consuming libraries
      var config = normalize({options: {src: '*.js', dest: 'foo/'}});
      assert(Array.isArray(config.files[0].src));
      assert(config.files[0].src[0] === '*.js');
    });

    it('should support files objects defined on options', function() {
      var config = normalize({options: {files: {src: '*.js', dest: 'foo/'}}});
      assert(Array.isArray(config.files[0].src));
      assert(config.files[0].src[0] === '*.js');
    });

    it('should support files arrays defined on options', function() {
      var config = normalize({options: {files: [{src: '*.js', dest: 'foo/'}]}});
      assert(Array.isArray(config.files[0].src));
      assert(config.files[0].src[0] === '*.js');
    });
  });

  describe('src-dest mappings', function() {
    it('should normalize src-dest mappings to a files array', function() {
      var foo = normalize({'foo/': '*.js', 'bar/': '*.md'});
      var bar = normalize({'foo/': '*.js'});

      assert(Array.isArray(foo.files));
      assert(foo.files[0].src[0] === '*.js');
      assert(foo.files[0].dest === 'foo/');

      assert(bar.files[0].src[0] === '*.js');
      assert(bar.files[0].dest === 'foo/');

      assert(foo.files[1].src[0] === '*.md');
      assert(foo.files[1].dest === 'bar/');
    });

    it('should normalize a (vinyl-like) file object', function() {
      var file = toFile(path.resolve('a/b/c.js'), 'dist/');
      var config = normalize(file);
      assert(Array.isArray(config.files));
      assert(config.files[0].src[0] === path.resolve('a/b/c.js'));
      assert(config.files[0].dest === 'dist/');
    });

    it('should retail arbitrary properties', function() {
      var config = normalize({
        data: {title: 'My Site'},
        src: '*.js', 
        dest: 'foo/'
      });
      assert(config.data);
      assert(config.data.title === 'My Site');
    });

    it('should work when no dest is defined', function() {
      var config = normalize({src: '*.js'});
      assert(config.files[0].src[0].length);
    });

    it('should work when no src is defined', function() {
      var config = normalize({dest: 'out/'});
      assert(config.files[0].dest === 'out/');
    });

    it('should keep options when a second arg is passed', function() {
      var config = normalize({
        options: {
          expand: true,
          cwd: 'a'
        },
        src: ['**/*.txt'],
        dest: 'dest'
      }, {});

      assert.equal(typeof config.options, 'object');
      assert.equal(Array.isArray(config.files), true);
      assert(config.options.expand === true);
      assert(config.options.cwd === 'a');
      assert(config.files.length === 1);
      assert(config.files[0].dest = 'dest');
    });

    it('should keep options when a third arg is passed', function() {
      var config = normalize({
        options: {
          expand: true,
          cwd: 'a'
        },
        src: ['**/*.txt'],
        dest: 'dest'
      }, {}, {});

      assert.equal(typeof config.options, 'object');
      assert.equal(Array.isArray(config.files), true);
      assert(config.options.expand === true);
      assert(config.options.cwd === 'a');
      assert(config.files.length === 1);
      assert(config.files[0].dest = 'dest');
    });

    it('should keep options when dest is a string', function() {
      var config = normalize({
        options: {
          expand: true,
          cwd: 'a'
        },
        src: ['**/*.txt']
      }, 'dest', {});

      assert.equal(typeof config.options, 'object');
      assert.equal(Array.isArray(config.files), true);
      assert(config.options.expand === true);
      assert(config.options.cwd === 'a');
      assert(config.files.length === 1);
      assert(config.files[0].dest = 'dest');
    });

    it('should extend options defined on first and last args', function() {
      var config = normalize({
        options: {
          expand: true,
          cwd: 'a'
        },
        src: ['**/*.txt']
      }, 'dest', {foo: 'bar'});

      assert.equal(typeof config.options, 'object');
      assert.equal(Array.isArray(config.files), true);
      assert(config.options.foo === 'bar');
      assert(config.options.expand === true);
      assert(config.options.cwd === 'a');
      assert(config.files.length === 1);
      assert(config.files[0].dest = 'dest');
    });

    it('should extend options defined on first and second args', function() {
      var config = normalize({
        options: {
          expand: true,
          cwd: 'a'
        },
        src: ['**/*.txt'],
        dest: 'dest'
      }, {foo: 'bar'});

      assert.equal(typeof config.options, 'object');
      assert.equal(Array.isArray(config.files), true);
      assert(config.options.foo === 'bar');
      assert(config.options.expand === true);
      assert(config.options.cwd === 'a');
      assert(config.files.length === 1);
      assert(config.files[0].dest = 'dest');
    });

    it('should convert an object with src-dest to a files array', function() {
      var config = normalize({dest: 'foo/', src: '*.js'});
      assert(Array.isArray(config.files));
      assert(Array.isArray(config.files[0].src));
      assert(config.files[0].src[0] === '*.js');
      assert(config.files[0].dest === 'foo/');
    });
  });

  describe('files objects', function() {
    it('should support files as an object', function() {
      var config = normalize({files: {'dist/': ['*.js']}});
      assert(config.files[0].src[0] === '*.js');
      assert(config.files[0].dest === 'dist/');
    });

    it('should retain arbitrary properties', function() {
      var config = normalize({
        data: {title: 'My Site'},
        files: {
          data: {title: 'My Blog'},
          src: '*.js', 
          dest: 'foo/'
        }
      });

      assert(config.data);
      assert(config.data.title);
      assert(config.data.title === 'My Site');
      assert(config.files[0].data);
      assert(config.files[0].data.title);
      assert(config.files[0].data.title === 'My Blog');
    });
  });

  describe('files glob', function() {
    it('should support files as an array', function() {
      var config = normalize({files: ['*.js']});
      assert(config.files[0].src[0] === '*.js');
    });
  });

  describe('files object > src-dest mappings', function() {
    it('should normalize src-dest mappings on a files object', function() {
      var config = normalize({
        files: {
          'foo/': '*.js',
          'bar/': '*.md'
        }
      });

      assert(Array.isArray(config.files));
      assert(config.files[0].src[0] === '*.js');
      assert(config.files[0].dest === 'foo/');
      assert(config.files[1].src[0] === '*.md');
      assert(config.files[1].dest === 'bar/');
    });

    it('should retain arbitrary properties', function() {
      var config = normalize({
        data: {title: 'My Site'},
        files: {
          'foo/': '*.js',
          'bar/': '*.md'
        }
      });

      assert(config.data);
      assert(config.data.title);
      assert(Array.isArray(config.files));
      assert(config.files[0].src[0] === '*.js');
      assert(config.files[0].dest === 'foo/');
      assert(config.files[1].src[0] === '*.md');
      assert(config.files[1].dest === 'bar/');
    });
  });

  describe('files array > src-dest mappings', function() {
    it('should normalize src-dest mappings on a files array', function() {
      var config = normalize([
        {'a/': ['a/*.js']},
        {'b/': ['b/*.js']},
        {'c/': ['c/*.js']}
      ]);

      assert(config.files[0].src[0] === 'a/*.js');
      assert(config.files[0].dest === 'a/');
      assert(config.files[1].src[0] === 'b/*.js');
      assert(config.files[1].dest === 'b/');
      assert(config.files[2].src[0] === 'c/*.js');
      assert(config.files[2].dest === 'c/');
    });

    it('should retain arbitrary properties', function() {
      var config = normalize([
        {'a/': ['a/*.js']},
        {'b/': ['b/*.js']},
        {'c/': ['c/*.js']}
      ], {data: {title: 'My Site'}});

      assert(config.options.data);
      assert(config.options.data.title);
      assert(config.files[0].src[0] === 'a/*.js');
      assert(config.files[0].dest === 'a/');
      assert(config.files[1].src[0] === 'b/*.js');
      assert(config.files[1].dest === 'b/');
      assert(config.files[2].src[0] === 'c/*.js');
      assert(config.files[2].dest === 'c/');
    });
  });

  describe('files arrays', function() {
    it('should support files arrays', function() {
      var config = normalize({files: [{src: '*.js', dest: 'foo/'}]});
      assert(Array.isArray(config.files[0].src));
      assert(config.files[0].src[0] === '*.js');
    });

    it('should retain arbitrary properties', function() {
      var config = normalize({
        files: [
          {
            data: {title: 'My Blog'},
            src: '*.js', 
            dest: 'foo/'
          }
        ]
      });

      assert(!config.data);
      assert(config.files[0].data);
      assert(config.files[0].data.title);
    });
  });

  describe('options', function() {
    it('should get options from an options object', function() {
      var config = normalize({dest: 'foo/', src: ['*.js'], options: {cwd: 'c'}});
      assert(config.options.cwd === 'c');
      assert(config.files[0].options.cwd === 'c');
    });

    it('should pick options properties from an object', function() {
      var config = normalize({dest: 'foo/', src: '*.js', cwd: 'b'});
      assert(config.options.cwd === 'b');
      assert(config.files[0].options.cwd === 'b');
    });

    it('should pick options properties from a files array', function() {
      var config = normalize({files: [{'foo/': '*.js', cwd: 'f'}]});
      assert(config.files[0].options.cwd === 'f');
    });

    it('should pick options properties from a files object', function() {
      var config = normalize({files: {'foo/': '*.js', cwd: 'e'}});
      assert(config.files[0].options.cwd === 'e');
    });

    it('should pick options properties from src-dest mapping', function() {
      var config = normalize({'foo/': '*.js', cwd: 'a'});
      assert(config.options.cwd === 'a');
      assert(config.files[0].options.cwd === 'a');
    });

    it('should extend "target" options onto objects', function() {
      var config = normalize({dest: 'foo/', src: '*.js'}, {process: true});

      assert(Array.isArray(config.files));
      assert(Array.isArray(config.files[0].src));
      assert(config.files[0].src[0] === '*.js');
      assert(config.files[0].dest === 'foo/');
      assert(config.options.process === true);
    });

    it('should extend "context" options onto config', function() {
      var ctx = {options: {process: true}};
      var fn = require('..');
      var config = fn.call(ctx, {dest: 'foo/', src: '*.js'});

      assert(Array.isArray(config.files));
      assert(Array.isArray(config.files[0].src));
      assert(config.files[0].src[0] === '*.js');
      assert(config.files[0].dest === 'foo/');
      assert(config.options.process === true);
    });

    it('should not format files objects when `format` is false', function() {
      var ctx = {options: {format: false}};
      var fn = require('..');
      var config = fn.call(ctx, {dest: 'foo/', src: '*.js'});

      assert(Array.isArray(config.files));
      assert(Array.isArray(config.files[0].src));
      assert(config.files[0].src[0] === '*.js');
      assert(config.files[0].dest === 'foo/');
      assert(config.options.format === false);
    });

    it('should format files objects by default', function() {
      var config = normalize({dest: 'a/', src: '*.js', options: {cwd: 'b/'}});
      var keys = ['options', 'src', 'dest'];
      var i = -1;

      for (var key in config.files[0]) {
        assert(keys[++i] === key);
      }
    });
  });
});
