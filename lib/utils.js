const _ = require('lodash');

var globuleFind = [
  'dest',

  'src',
  'filter',
  'nonull',
  'matchBase',
  'srcBase',
  'prefixBase',
];

var globuleMapping = [
  'dest',

  'srcBase',
  'destBase',
  'ext',
  'extDot',
  'flatten',
  'rename'
];

var globOptions = [
  'cache',
  'cwd',
  'debug',
  'dot',
  'globDebug',
  'mark',
  'nocase',
  'nomount',
  'nonull',
  'nosort',
  'nounique',
  'root',
  'silent',
  'stat',
  'statCache',
  'strict',
  'sync'
];

var globOpts = _.union(globOptions, globuleFind, globuleMapping);

exports.siftOptions = function(obj) {
  var config = {};
  var options = {};

  for (var prop in obj) {
    if (globOpts.indexOf(prop) !== -1) {
      config[prop] = obj[prop];
    } else {
      options[prop] = obj[prop];
    }
  }

  // for (var prop in config) {
  //   delete options[prop];
  // }

  _.extend(options, obj.options || {});
  delete options.options;

  if (config.dest) {
    _.extend(config, {destBase: config.dest});
    delete config.dest;
  }

  return {
    config: config,
    options: options
  };
};



/**
 * Returns true if both the `src` and `dest` values are empty
 * or undefined. This means it's probably the options object
 * or a malformed files config object.
 *
 * @param   {Object}   obj  The config object
 * @return  {Boolean}
 */

exports.isInvalidTarget = function(obj) {
  return _.isEmpty(obj.dest) && _.isEmpty(obj.src);
};

exports.arrayify = function(value) {
  return !Array.isArray(value) ? [value] : value;
};

exports.slashify = function(arr) {
  return _.map(exports.arrayify(arr), function(filepath) {
    return filepath.replace(/\\/g, '/');
  });
};
