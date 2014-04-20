module.exports = [ { orig: 
     { options: { target: true },
       src: [ 'test/fixtures/b/*.txt' ],
       dest: './combined.txt' },
    options: { target: true },
    src: 
     [ 'test/fixtures/b/a.txt',
       'test/fixtures/b/b.txt',
       'test/fixtures/b/c.txt' ],
    dest: './combined.txt' } ];