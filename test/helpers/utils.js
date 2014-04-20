const path = require('path');
const file = require('fs-utils');
const inspect = require('util').inspect;
const beautify = require('js-beautify').js_beautify;


exports.writeExpected = function(dest, str) {
  var content = 'module.exports = ';
  content +=  inspect(str, null, 10);
  content +=  ';';
  file.writeFileSync(dest, beautify(content, {
    indent_size: 2,
    indent_char: ' ',
    indent_level: 0,
    indent_with_tabs: false,
    preserve_newlines: true,
    max_preserve_newlines: 1,
    jslint_happy: true,
    brace_style: 'end-expand',
    keep_array_indentation: false,
    keep_function_indentation: true,
    space_before_conditional: true,
    break_chained_methods: false,
    unescape_strings: false,
    wrap_line_length: 0
  }));
};

exports.result = function(filepath, actual, write) {
  var dest = path.join(__dirname, '../expected', filepath);
  if (write) {
    exports.writeExpected(dest, actual);
  }
  return dest;
};

