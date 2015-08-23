
'use strict';

var omit = require('object.omit');
var pick = require('object.pick');
var define = require('define-property');
var defaults = require('defaults-deep');
var utils = require('./utils');

function Target(node) {
  return this.normalize(node || {});
}

Target.prototype.validate = function(node) {
  var msg = function (key) {
    return 'targets may have `files` or `' + key + '`, not both: ';
  };

  if (utils.has(node, 'files') && utils.has(node, 'src')) {
    throw new Error(msg('src') + JSON.stringify(node));
  }
  if (utils.has(node, 'files') && utils.has(node, 'dest')) {
    throw new Error(msg('dest') + JSON.stringify(node));
  }
};

Target.prototype.normalize = function(node, parent) {
  this.validate(node);

  if (parent) {
    define(this, 'parent', parent);

    if (parent.options && !utils.has(node, 'options')) {
      node.options = parent.options;
    }
  }

  var files = node.files || pick(node, ['src', 'dest']);
  if (!utils.isEmpty(files)) {
    node.files = utils.arrayify(files);
  } else {
    node.files = [];
  }

  node = omit(node, ['src', 'dest']);
  var len = node.files.length;

  while (len--) {
    defaults(node.files[len], pick(node, 'options'));
  }
  return node;
};

module.exports = Target;