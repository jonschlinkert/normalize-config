module.exports = [ { orig: 
     { src: 'test/fixtures/a/*.md',
       one: 'two',
       three: 'four',
       dest: 'combined.md' },
    options: { one: 'two', three: 'four' },
    src: [ 'test/fixtures/a/a.md', 'test/fixtures/a/b.md' ],
    dest: 'combined.md' } ];