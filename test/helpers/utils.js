var path = require('path');
var file = require('fs-utils');


exports.expected = function(cwd) {
  return function(filepath, obj, write) {
    var dest = path.join(__dirname, '../expected', cwd, filepath+'.json');
    if (write) {
      file.writeJSONSync(dest, obj);
    }
    return dest;
  };
};

exports.actual = function(cwd) {
  return function(filepath, obj, write) {
    var dest = path.join(__dirname, '../actual', cwd, filepath+'.json');
    if (write) {
      file.writeJSONSync(dest, obj);
    }
    return dest;
  };
};