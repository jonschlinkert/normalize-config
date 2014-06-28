/*!
 * normalize-config <https://github.com/jonschlinkert/normalize-config>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var glob = require('globule');
var Route = require('rte');
var slashify = require('normalize-path');
var _ = require('lodash');


/**
 * ## siftOptions
 *
 * Organize keys into `src`, `dest` and `options`.
 *
 * @param  {Object} `config`
 * @return {Object}
 * @api private
 */

function siftOptions(config) {
  var options = {};
  Object.keys(config).forEach(function(key) {
    if (key !== 'src' && key !== 'dest' && key !== 'options') {
      options[key] = config[key];
    }
    if (key === 'options') {
      _.extend(options, config[key]);
    }
  });
  return options;
}


/**
 * ## normalize
 *
 * Normalize any combination of files arrays, files objects,
 * src-dest pairings and options.
 *
 * **Example:**
 *
 * ```js
 * normalize({src: '*.js', dest: 'dist/'});
 * ```
 *
 * **Params:**
 *
 * @param  {Object} `config` The config object to be normalized.
 * @return {Object}
 */

var normalize = module.exports = function(config) {
  config = _.cloneDeep(config);
  var orig = _.cloneDeep(config);

  var files = [];
  if (config.hasOwnProperty('src') || config.hasOwnProperty('dest')) {
    files = normalize.filePair(config);
  }

  if (config.hasOwnProperty('files')) {
    if (Array.isArray(config.files)) {
      files = config.files.map(function(fp) {
        if (typeof fp === 'string') {
          fp = {src: fp};
        }
        var options = {};
        Object.keys(fp).forEach(function(key) {
          var value = fp[key];
          if (key !== 'src' && key !== 'dest' && key !== 'options') {
            options[key] = value;
            delete fp[key];
          }
          if (key === 'options') {
            options = _.extend({}, config.options, options, value);
          }
        });
        options = _.extend({}, config.options, fp.options, options);
        delete fp.options;
        fp = _.extend({}, {options: options}, fp);
        return fp;
      });
    } else if (!Array.isArray(config.files) && _.isObject(config.files)) {
      files = normalize.normalizeObj(config);
    }
  }

  var result = [];
  files = files.map(function(fp) {
    var opts = _.extend({}, config.options, {
      src: fp.src,
      dest: fp.dest
    }, fp.options);

    opts.destBase = opts.destBase || opts.dest;
    var ctx = _.cloneDeep(opts);
    var expanded = {};

    if (opts.expand) {
      expanded = glob.findMapping(opts);
    } else {
      expanded = [{src: glob.find(opts).map(slashify), dest: fp.dest}];
    }

    expanded = expanded.map(function(filePair) {
      ctx.src = filePair.src;

      if (ctx.hasOwnProperty('route')) {
        var route = new Route(ctx);
        route.set('dest', ctx.route);

        if (filePair.src.length) {
          filePair.dest = filePair.src.map(function(filepath) {
            var dest = route.parse(filepath, 'dest').dest;
            return slashify(dest);
          })[0];
        } else {
          var dest = route.parse(filePair.dest, 'dest').dest;
          filePair.dest = slashify(dest);
        }
      }
      result.push(_.extend(filePair, {orig: fp}));
    });
  });

  return {
    orig: orig,
    files: result
  };
};


/**
 * ## .multi
 *
 * Normlize a config object with multiple files definitions.
 *
 * **Params:**
 *
 * @param  {Object} `config`
 * @param  {Object} `options`
 * @return {Object}
 */

normalize.multi = function(config, options) {
  var obj = {};

  Object.keys(config).forEach(function(key) {
    var value = config[key];
    _.extend(value, {options: options});
    obj[key] = normalize(value);
  });

  return obj;
};


/**
 * ## .filePair
 *
 * Normalize `src`, `dest` and options definitions to an array of files objects.
 *
 * **Params:**
 *
 * @param  {Object} `config`
 * @return {Object}
 * @api public
 */

normalize.filePair = function(config) {
  var files = [], options = {};
  options = siftOptions(config);

  var src = config.src || [];
  files.push({
    options: options,
    src: !Array.isArray(src) ? [src] : src,
    dest: config.dest || ''
  });

  return files;
};


/**
 * ## .normalizeObj
 *
 * Normalize files objects with varied formats to an array of files objects.
 *
 * **Params:**
 *
 * @param  {Object} `config`
 * @return {Object}
 * @api public
 */

normalize.normalizeObj = function(config) {
  var files = [];

  Object.keys(config.files).forEach(function(key) {
    var value = config.files[key];
    value = !Array.isArray(value) ? [value] : value;
    files.push({
      options: config.options || {},
      src: value,
      dest: key
    });
  });

  return files;
};
