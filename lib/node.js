'use strict';

var pick = require('object.pick');
var omit = require('object.omit');
var define = require('define-property');
var forOwn = require('for-own');
var merge = require('mixin-deep');
var utils = require('./utils');

var reserved = ['options', 'dest', 'src'];
var optsProps = ['expand', 'flatten', 'cwd', 'ext', 'extDot', 'rename'];

function Node(config, parent) {
  this.normalize(config, parent);
  return config;
}

Node.prototype.normalize = function(config, parent) {
  config.options = config.options || {};

  if (parent) {
    define(this, 'parent', parent);
    parent.options = parent.options || {};
    config.options = merge({}, parent.options, config.options);
  }

  var opts = config.options;
  opts.expand = opts.expand || false;
  opts.flatten = opts.flatten || false;

  var res = pick(config, reserved);
  res.options = merge({}, omit(config, reserved), res.options);
  return res;
};


/**
 * Expose `Node`
 */

module.exports = Node;
