/*!
 * files-objects <https://github.com/jonschlinkert/files-objects>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var extend = require('extend-shallow');
var omit = require('object.omit');
var reserved = require('./reserved');

/**
 * Expand files-objects into an array of `src-dest` mappings.
 *
 * ```js
 * var files = toMapping({
 *   'foo/': ['bar/*.js']
 * });
 * //=> {files: [{src: ['bar/*.js'], dest: 'foo/'}]}
 * ```
 */

module.exports = function filesObjects(config, target) {
  if (typeof config === 'string' || Array.isArray(config)) {
    config = toObject.apply(null, arguments);
  }

  config = fromOptions(config);

  // allow `src` to be a setter
  if ('src' in config || config.hasOwnProperty('dest')) {
    var files = {};
    files.src = arrayify(config.src);
    files.dest = config.dest || '';
    var res = {files: [files]};
    if (target) res = extend({}, target, res);
    return res;
  }

  target = target || {};
  config.files = arrayify(config.files || []);

  for (var i = 0; i < config.files.length; i++) {
    var ele = config.files[i];
    if (typeof ele === 'string') {
      config.files[i] = {src: [ele]};
    }
  }

  var opts = config.options;
  for (var key in config) {
    if (reserved.indexOf(key) > -1) {
      continue;
    }

    var obj = {};
    obj.src = arrayify(config[key]);
    obj.dest = key;
    if (opts) obj.options = opts;

    config.files.push(obj);
    delete config[key];
  }
  // extend non-files target properties onto the config
  var nonfiles = omit(target, ['files']);
  return extend({}, nonfiles, config);
};

function arrayify(val) {
  return Array.isArray(val) ? val : [val];
}

function fromOptions(config) {
  if (!config.options) return config;
  var opts = config.options;
  if (!('src' in config) && opts.src) {
    config.src = opts.src;
    delete config.options.src;
  }
  if (!('dest' in config) && opts.dest) {
    config.dest = opts.dest;
    delete config.options.dest;
  }
  return config;
}

function toObject(src, dest, options) {
  var obj = {};
  obj.src = src ? arrayify(src) : [];
  if (typeof dest !== 'string') {
    options = dest;
    dest = '';
  }
  obj.dest = dest;
  if (options) {
    obj.options = options;
  }
  return obj;
}
