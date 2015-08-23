'use strict';

var define = require('define-property');
var extend = require('extend-shallow');
var merge = require('mixin-deep');
var forOwn = require('for-own');
var Files = require('./files');
var utils = require('./utils');

var reserved = ['options', 'dest', 'src'];
var optsProps = ['expand', 'flatten', 'cwd', 'ext', 'extDot', 'rename'];

function Node(config) {
  this.normalize(config || {});
}

Node.prototype.normalize = function(config, parent) {
  this.options = config.options || {};
  if (parent) {
    define(this, 'parent', parent);

    if (parent.options) {
      extend(this.options, parent.options);
    }
  }

  forOwn(config, function (val, key) {
    if (utils.contains(reserved, key)) {
      this[key] = val;
    } else {
      this.options[key] = val;
      delete config[key];
    }
  }, this);

  return this;
};

/**
 * Expose `Node`
 */

module.exports = Node;
