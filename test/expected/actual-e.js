module.exports = [ { orig: 
     { cwd: 'test/fixtures/a',
       src: [ '*.md' ],
       dest: 'one/',
       ext: '.html',
       options: {} },
    src: [ 'a.md', 'b.md' ],
    dest: 'one/' },
  { orig: 
     { cwd: 'test/fixtures/b',
       src: [ '*.md' ],
       dest: 'two/',
       ext: '.html',
       options: {} },
    src: [ 'a.md', 'b.md' ],
    dest: 'two/' },
  { orig: 
     { cwd: 'test/fixtures/c',
       src: [ '*.md' ],
       dest: 'three/',
       ext: '.html',
       options: {} },
    src: [ 'a.md', 'b.md' ],
    dest: 'three/' } ];