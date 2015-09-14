'use strict';

/**
 * Expose `utils`
 */


var utils = module.exports;

/**
 * Returns true if `val` has any of the given keys
 */

utils.has = function has(val, keys) {
  keys = utils.arrayify(keys);
  var len = keys.length;

  while (len--) {
    var key = keys[len];
    if (Array.isArray(val) && val.indexOf(key) > -1) {
      return true;
    } else if (key in val) {
      return true;
    }
  }
  return false;
};

/**
 * Return true if `val` is an object and not an array.
 *
 * @param {any} `val`
 * @return {Boolean}
 */

utils.isObject = function isObject(val) {
  return val && !Array.isArray(val) && typeof val === 'object';
};

/**
 * Cast val to any array.
 *
 * @param {any} `val`
 * @return {Array}
 */

utils.arrayify = function arrayify(val) {
  return Array.isArray(val) ? val : [val];
};

/**
 * Move `prop` from `val.options` to `val`
 *
 * @param {Object} val
 * @param {String} prop
 * @return {Object}
 */

utils.move = function move(val, prop) {
  if (val.hasOwnProperty(prop)) {
    return val;
  }
  var opts = val.options || {};
  if (opts.hasOwnProperty(prop)) {
    val[prop] = opts[prop];
    delete val.options[prop];
  }
  return val;
};


/**
 * "reserved" keys. These are keys that are necessary
 * to separate from config, so we don't arbitrarily try
 * to expand options keys into src-dest mappings.
 *
 * These are keys that are typically passed as options
 * to glob, globule, globby expand-config, etc.
 */

utils.taskKeys = [
  'options'
];

utils.targetKeys = [
  'files',
  'src',
  'dest'
];

utils.optsKeys = [
  'base',
  'cwd',
  'destBase',
  'expand',
  'ext',
  'extDot',
  'extend',
  'filter',
  'flatten',
  'glob',
  'parent',
  'process',
  'rename',
  'srcBase',
  'statType',
  'transform'
];

utils.all = utils.taskKeys
  .concat(utils.targetKeys)
  .concat(utils.optsKeys);
