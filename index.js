'use strict';

var typeOf = require('kind-of');
var extend = require('extend-shallow');
var utils = require('./lib/utils');

function normalize(config, dest, opts) {
  if (arguments.length > 1) {
    config = toObject(config, dest, opts);
  }

  var context = {};
  if (utils.isObject(this) && this.options) {
    context = this.options;
  }

  var res = null;
  switch(typeOf(config)) {
    case 'string':
      res = normalizeString(config);
      break;
    case 'object':
      res = normalizeObject(config);
      break;
    case 'array':
      res = normalizeArray(config);
      break;
    default: {
      throw new TypeError('unsupported argument type: ' + config);
    }
  }

  // copy `context` options onto config root
  copyOptions(res, context);
  return formatObject(res);
}

/**
 * Convert args list to a config object.
 */

function toObject(src, dest, options) {
  var config = {};

  if (utils.isObject(dest)) {
    options = dest;
    dest = null;
  }

  if (utils.isObject(src)) {
    config = src;
  }

  if (isValidSrc(src)) {
    config.src = src;
  }

  if (typeof dest === 'string') {
    config.dest = dest;
  }

  config.options = extend({}, config.options, options);
  return config;
}

/**
 * Object
 */

function normalizeObject(val) {
  val = normalizeOptions(val);

  // if src/dest are on options, move them to root
  val = utils.move(val, 'src');
  val = utils.move(val, 'dest');

  // allow src to be a getter
  if ('src' in val || val.hasOwnProperty('dest')) {
    return toFiles(val);
  }

  if (!val.hasOwnProperty('files')) {
    return filesObjects(val);
  }

  if (Array.isArray(val.files)) {
    val.files = reduceFiles(val.files);
    return val;
  }

  if (utils.isObject(val.files)) {
    val.files = normalizeFiles(val);
  }
  return val;
}

/**
 * String
 */

function normalizeString(val) {
  return toFiles({src: [val]});
}

/**
 * Array
 */

function normalizeArray(arr) {
  if (isValidSrc(arr[0])) {
    return toFiles({src: arr});
  }
  return {files: reduceFiles(arr)};
}

/**
 * Files property
 */

function normalizeFiles(val) {
  var res = normalize(val.files || val);
  return res.files;
}

/**
 * Normalize all objects in a `files` array.
 *
 * @param {Array} `files`
 * @return {Array}
 */

function reduceFiles(files) {
  return files.reduce(function (acc, ele) {
    var res = normalize(ele);
    return acc.concat(res.files);
  }, []);
}

/**
 * Move reserved options properties from `obj` to `obj.options`
 */

function normalizeOptions(obj) {
  for (var key in obj) {
    if (utils.optsKeys.indexOf(key) > -1) {
      obj.options = obj.options || {};
      obj.options[key] = obj[key];
      delete obj[key];
    }
  }
  return obj;
}

/**
 * Copy options
 */

function copyOptions(config, context) {
  var ctx = context.options || context;
  if (utils.isObject(ctx) && ctx) {
    config.options = extend({}, ctx, config.options);
  }
  return config;
}

/**
 * Create a `files` array from a src-dest object.
 *
 * ```js
 * // converts from:
 * { src: '*.js', dest: 'foo/' }
 *
 * // to:
 * { files: [{ src: ['*.js'], dest: 'foo/' }] }
 * ```
 */

function toFiles(val) {
  var config = {files: [normalizeSrc(val)]};
  for (var key in val) {
    if (!isFilesKey(key)) {
      config[key] = val[key];
    }
  }
  return config;
}

/**
 * When `src`, `dest` and `files` are absent from the
 * object, we check to see if file objects were defined.
 *
 * ```js
 * // converts from:
 * { 'foo/': '*.js' }
 *
 * // to
 * { files: [{ src: ['*.js'], dest: 'foo/' }] }
 * ```
 */

function filesObjects(val) {
  var res = {};
  if (val.options) res.options = val.options;
  res.files = [];

  for (var key in val) {
    if (key !== 'options') {
      var file = {};
      if (val.options) file.options = val.options;
      file.src = utils.arrayify(val[key]);
      file.dest = key || '';
      res.files.push(file);
    }
  }
  return res;
}

/**
 * Ensure that `src` on the given val is an array
 *
 * @param {Object} `val` Object with a `src` property
 * @return {Object}
 */

function normalizeSrc(val) {
  if (!val.src) return val;
  val.src = utils.arrayify(val.src);
  return val;
}

/**
 * Optionally sort the keys in all of the files objects.
 * Helps with debugging.
 *
 * @param {Object} `val` Pass `{sort: true}` on `val.options` to enable sorting.
 * @return {Object}
 */

function formatObject(val) {
  if (val.options && val.options.format === false) {
    return val;
  }

  var len = val.files.length, i = -1;
  while (++i < len) {
    var ele = val.files[i];
    var obj = {};

    obj.options = ele.options;
    obj.src = ele.src || [];
    obj.dest = ele.dest || '';

    if (typeof obj.options === 'undefined') {
      obj.options = val.options || {};
    }
    val.files[i] = obj;
  }
  return val;
}

/**
 * Boolean checks
 */

function isFilesKey(key) {
  return ['src', 'dest', 'files'].indexOf(key) > -1;
}

function isValidSrc(val) {
  return typeof val === 'string' || Array.isArray(val);
}

/**
 * Expose `normalize`
 */

module.exports = normalize;
