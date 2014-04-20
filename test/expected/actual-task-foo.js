module.exports = [ [],
  [ { orig: { src: 'test/fixtures/a/*.md', dest: './', options: {} },
      src: [ 'test/fixtures/a/a.md', 'test/fixtures/a/b.md' ],
      dest: './' } ],
  [ { orig: 
       { src: [ 'test/fixtures/b/*.txt' ],
         dest: './',
         options: { target: true } },
      src: 
       [ 'test/fixtures/b/a.txt',
         'test/fixtures/b/b.txt',
         'test/fixtures/b/c.txt' ],
      dest: './' } ],
  [ { orig: { src: [ 'test/fixtures/**/*.coffee' ], dest: './', options: {} },
      src: 
       [ 'test/fixtures/a/m.coffee',
         'test/fixtures/c/d.coffee',
         'test/fixtures/c/z.coffee' ],
      dest: './' } ] ];