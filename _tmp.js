
var normalize = require('./');

// empty config
var config = {
};

console.log('empty config', normalize(config));
console.log();


// file pair
var config = {
  options: {mapping:true},
  src: 'a/*.txt',
  dest: 'test/actual/'
};
var options = {
  cwd: 'test/fixtures/'
};

console.log('file pair', normalize.filePair(config, options));
console.log();

// files object
var config = {
  'test/actual/a/': 'a/*.txt',
  'test/actual/b/': 'b/*.md',
  'test/actual/c': 'c/*.js',
};
var options = {
  cwd: 'test/fixtures/',
  mapping: true
};

console.log('files object', normalize.filesObject(config, options));
console.log();

// files array
var config = [
  { src: '*.txt', dest: 'test/actual/a/', cwd: 'test/fixtures/a' },
  { src: '*.md', dest: 'test/actual/b/', cwd: 'test/fixtures/b' },
  { src: '*.js', dest: 'test/actual/c', cwd: 'test/fixtures/c' }
];
var options = {
  mapping: true
};

console.log('files array', normalize.filesArray(config, options));
console.log();

// normailze target
var config = {
  options: {
    mapping: true,
    cwd: 'test/fixtures'
  },
  files: [
    { src: 'a/*.txt', dest: 'test/actual/' },
    { src: 'b/*.md', dest: 'test/actual/' },
    { src: 'c/*.js', dest: 'test/actual' }
  ]
};

console.log('normailze target', normalize.target(config));
console.log();

// normalize task
var config = {
  site: {
    options: {
      mapping: true,
      cwd: 'test/fixtures/a'
    },
    files: {
      'test/actual/site/': '*.txt'
    }
  },
  blog: {
    options: {
      mapping: true,
      cwd: 'test/fixtures'
    },
    files: {
      src: '**/*.md',
      dest: 'test/actual/blog/'
    }
  }
};

console.log('normalize task', normalize.task(config));
console.log();

// empty config
var config = {
};

console.log('empty config', normalize(config));
console.log();
