var normalize = require('..');
var plasma = require('plasma');


var site = {
  styles   : 'test/fixtures/styles',
  content  : 'test/fixtures/content',
  templates: 'test/fixtures/templates',
  data     : 'test/fixtures/data',
  assets   : 'test/fixtures/assets',
};


// Use plasma to expand config templates
var config = plasma.process({
  // Referece the `site` variable, so plasma can expand template strings.
  site: site,

  options: {livereload: true, expand: false},
  watch: {
    styles: {
      files: ['<%= site.styles %>/*.less'],
      tasks: ['less:app']
    },
    content: {
      files: ['<%= site.content %>/*.md'],
      tasks: ['assemble:app']
    },
    templates: {
      files: ['<%= site.templates %>/*.hbs'],
      tasks: ['assemble:app']
    },
    data: {
      files: ['<%= site.data %>/*.{json,yml}'],
      tasks: ['assemble:app']
    },
    assets: {
      files: ['<%= site.assets %>/*.*'],
      tasks: ['clean', 'copy']
    }
  }
});


// Use `normalize.multi()` to normlize a config object
// with multiple files definitions
var normalized = normalize.multi(config.watch, config.options);
var result = JSON.stringify(normalized, null, 2);
console.log(result);



/**
 * Result:
 */

var result = {
  styles: {
    orig: {
      files: ["test/fixtures/styles/*.less"],
      tasks: ["less:app"],
      options: {
        livereload: true,
        expand: false
      }
    },
    files: [
      {
        src: [
          "test/fixtures/styles/a.less",
          "test/fixtures/styles/b.less"
        ],
        orig: {
          options: {
            livereload: true,
            expand: false
          },
          src: "test/fixtures/styles/*.less"
        }
      }
    ]
  },
  content: {
    orig: {
      files: ["test/fixtures/content/*.md"],
      tasks: ["assemble:app"],
      options: {
        livereload: true,
        expand: false
      }
    },
    files: [
      {
        src: [
          "test/fixtures/content/a.md",
          "test/fixtures/content/b.md"
        ],
        orig: {
          options: {
            livereload: true,
            expand: false
          },
          src: "test/fixtures/content/*.md"
        }
      }
    ]
  },
  templates: {
    orig: {
      files: ["test/fixtures/templates/*.hbs"],
      tasks: ["assemble:app"],
      options: {
        livereload: true,
        expand: false
      }
    },
    files: [
      {
        src: [
          "test/fixtures/templates/a.hbs",
          "test/fixtures/templates/b.hbs",
          "test/fixtures/templates/c.hbs"
        ],
        orig: {
          options: {
            livereload: true,
            expand: false
          },
          src: "test/fixtures/templates/*.hbs"
        }
      }
    ]
  },
  data: {
    orig: {
      files: ["test/fixtures/data/*.{json,yml}"],
      tasks: ["assemble:app"],
      options: {
        livereload: true,
        expand: false
      }
    },
    files: [
      {
        src: [
          "test/fixtures/data/a.json",
          "test/fixtures/data/b.yml",
          "test/fixtures/data/c.json"
        ],
        orig: {
          options: {
            livereload: true,
            expand: false
          },
          src: "test/fixtures/data/*.{json,yml}"
        }
      }
    ]
  },
  assets: {
    orig: {
      files: ["test/fixtures/assets/*.*"],
      tasks: ["clean", "copy"],
      options: {
        livereload: true,
        expand: false
      }
    },
    files: [
      {
        src: ["test/fixtures/assets/foo.txt"],
        orig: {
          options: {
            livereload: true,
            expand: false
          },
          src: "test/fixtures/assets/*.*"
        }
      }
    ]
  }
};