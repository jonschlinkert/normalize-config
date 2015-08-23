'use strict';

var define = require('define-property');
var forOwn = require('for-own');
var merge = require('mixin-deep');
var utils = require('./utils');

var reserved = ['options', 'dest', 'src'];
var optsProps = ['expand', 'flatten', 'cwd', 'ext', 'extDot', 'rename'];

function Node(config, parent) {
  this.normalize(config, parent);
  return this;
}

Node.prototype.normalize = function(config, parent) {
  var opts = this.normalizeOpts(config, parent);
  forOwn(config, function (val, key) {
    if (utils.contains(reserved, key)) {
      this[key] = val;
    } else {
      opts[key] = val;
      delete config[key];
    }
  }, this);
  this.options = opts;
  return this;
};

Node.prototype.normalizeOpts = function(config, parent) {
  var opts = config.options || {};
  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      this[key] = opts[key];
    }
  }
  if (parent) {
    define(this, 'parent', parent);
    if (parent.options) {
      opts = merge({}, parent.options, opts);
    }
  }

  opts.expand = opts.expand || false;
  opts.flatten = opts.flatten || false;
  opts.cwd = opts.cwd || '.';
  return opts;
};

/**
 * Expose `Node`
 */

module.exports = Node;
