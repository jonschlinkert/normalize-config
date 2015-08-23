'use strict';

var path = require('path');
var extend = require('extend-shallow');
var forOwn = require('for-own');
var typeOf = require('kind-of');

/**
 * Expose `utils`
 */

var utils = module.exports;


utils.replaceExt = function replaceExt(fp, options) {
  var opts = extend({extDot: 'first'}, options);
  var re = {first: /(\.[^\/]*)?$/, last: /(\.[^\/\.]*)?$/};
  return fp.replace(re[opts.extDot], opts.ext);
};

utils.rename = function rename(destBase, destPath) {
  return path.join(destBase || '', destPath);
};

utils.arrayify = function arrayify(val) {
  return Array.isArray(val) ? val : [val];
};

utils.isString = function isString(val) {
  return typeof val === 'string';
};

utils.isEmpty = function isEmpty(val) {
  if (typeOf(val) === 'object') {
    val = Object.keys(val);
    if (!utils.values(val).length) return true;
  }
  if (Array.isArray(val)) {
    return !val.length;
  }
  return !val;
};

utils.values = function values(obj) {
  var arr = [];
  forOwn(obj, function (val) {
    arr.push(val);
  });
  return arr;
};

utils.contains = function contains(arr, val) {
  return arr.indexOf(val) > -1;
};

utils.has = function has(obj, key) {
  return obj.hasOwnProperty(key);
};
