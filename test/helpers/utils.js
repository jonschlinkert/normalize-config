const path = require('path');
const file = require('fs-utils');
const inspect = require('util').inspect;


exports.writeExpected = function(dest, str) {
  var content = 'module.exports = ';
  content +=  inspect(str, null, 10);
  content +=  ';';
  file.writeFileSync(dest, content);
};

exports.result = function(filepath, actual, write) {
  var dest = path.join(__dirname, '../expected', filepath);
  if (write) {
    exports.writeExpected(dest, actual);
  }
  return dest;
};