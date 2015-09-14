'use strict';

var typeOf = require('kind-of');
var utils = require('./lib/utils');
var optsKeys = utils.optsKeys;

function normalize(config, dest, opts) {
  if (arguments.length > 1) {
    config = toObject(config, dest, opts);
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
      res = config;
      break;
    }
  }
  return sortObjects(res);
}

function toObject(src, dest, options) {
  var config = {};
  if (utils.isObject(src)) {
    config = src;

  } else if (isValidSrc(src)) {
    config.src = src;
  }

  if (utils.isObject(dest)) {
    config.options = dest;
    dest = '';
  } else if (utils.isObject(options)) {
    config.options = options;
  }

  if (isValidDest(dest)) {
    config.dest = dest;
  }
  return config;
}

function normalizeObject(val) {
  val = normalizeOptions(val);

  // if src/dest are on options, move them to root
  val = utils.move(val, 'src');
  val = utils.move(val, 'dest');

  // allow src to be a getter
  if ('src' in val || val.hasOwnProperty('dest')) {
    return toFiles(val);
  }

  if (!('files' in val)) {
    return filesObjects(val);
  }

  if (Array.isArray(val.files)) {
    val.files = reduceFiles(val.files);

  } else if (utils.isObject(val.files)) {
    val.files = normalizeFiles(val);
  }
  return val;
}

function normalizeString(val) {
  return toFiles({src: [val]});
}

function normalizeArray(arr) {
  if (isValidSrc(arr[0])) {
    return toFiles({src: arr});
  }
  return {files: reduceFiles(arr)};
}

function normalizeOptions(obj) {
  obj.options = obj.options || {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (optsKeys.indexOf(key) > -1) {
        obj.options[key] = obj[key];
        delete obj[key];
      }
    }
  }
  return obj;
}

function normalizeFiles(val) {
  var res = normalize(val.files || val);
  return res.files;
}


/**
 * Convert from:
 *
 * ```js
 * { src: '*.js', dest: 'foo/' }
 * ```
 * to:
 *
 * ```js
 * { files: [{ src: ['*.js'], dest: 'foo/' }] }
 * ```
 */

function toFiles(val) {
  var config = {files: [normalizeSrc(val)]};
  for (var key in val) {
    if (val.hasOwnProperty(key) && !isFilesKey(key)) {
      config[key] = val[key];
    }
  }
  return config;
}

function toSrcDest(val) {
  var files = [];
  for (var key in val) {
    if (key !== 'options') {
      var file = {};
      file.src = utils.arrayify(val[key]);
      file.dest = key;
      files.push(file);
    }
  }
  return files;
}

// this means that src, dest and files are absent,
// so this might be file objects, like:
//=> {'foo/': '*.js'}
function filesObjects(val) {
  var res = {options: val.options || {}};
  res.files = toSrcDest(val);
  return res;
}

function normalizeSrc(val) {
  if (val.src) {
    val.src = utils.arrayify(val.src);
  }
  return val;
}

function reduceFiles(files) {
  return files.reduce(function (acc, ele) {
    var res = normalize(ele);
    acc.push.apply(acc, res.files);
    return acc;
  }, []);
}


function sortObjects(val) {
  val.files = val.files.map(function (ele) {
    var keys = Object.keys(ele);
    var obj = {};
    obj.options = ele.options || {};
    if (ele.src) obj.src = ele.src;
    if (ele.dest) obj.dest = ele.dest;
    keys.forEach(function (key) {
      if (key !== 'options' && !isFilesKey(key)) {
        obj[key] = ele[key];
      }
    });
    return obj;
  });
  return val;
}

/**
 * Boolean checks
 */

function isFilesKey(key) {
  return utils.has(['src', 'dest', 'files'], key);
}

function isValidSrc(val) {
  return val && typeof val === 'string' || Array.isArray(val);
}

function isValidDest(val) {
  return val && typeof val === 'string';
}

/**
 * Expose `normalize`
 */

module.exports = normalize;
