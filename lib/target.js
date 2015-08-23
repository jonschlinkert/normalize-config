
'use strict';

var difference = require('arr-diff');
var merge = require('mixin-deep');
var clone = require('clone-deep');
var omit = require('object.omit');
var pick = require('object.pick');
var typeOf = require('kind-of');
var forOwn = require('for-own');
var define = require('define-property');
var defaults = require('defaults-deep');
var Node = require('./node');
var utils = require('./utils');

var reserved = ['files', 'options', 'pipeline'];

function Target(config, parent) {
  return this.normalize(config || {}, parent);
}

Target.prototype.validate = function(config) {
  var msg = function (key) {
    return 'targets may have `files` or `' + key + '`, not both: ';
  };

  if (utils.has(config, 'files') && utils.has(config, 'src')) {
    throw new Error(msg('src') + JSON.stringify(config));
  }
  if (utils.has(config, 'files') && utils.has(config, 'dest')) {
    throw new Error(msg('dest') + JSON.stringify(config));
  }
};

Target.prototype.normalize = function(target, parent) {
  this.validate(target);
  if (parent) {
    define(this, 'parent', parent);

    if (parent.options && !utils.has(target, 'options')) {
      target.options = parent.options;
    }
  }

  var files = target.files || pick(target, ['src', 'dest']);
  if (!utils.isEmpty(files)) {
    target.files = utils.arrayify(files);
  }

  target = omit(target, ['src', 'dest']);
  target.files = target.files || [];

  target.files.forEach(function (fp) {
    fp.options = merge({}, target.options, fp.options);
    fp = new Node(fp, target);
  });

  forOwn(target, function (val, key) {
    this[key] = clone(val);

  }, this);
  return this;
};

Target.prototype.toArray = function() {
  return this.files.reduce(function (acc, node) {
    return acc.concat(merge(omit(this, ['files']), node));
  }.bind(this), []);
};


module.exports = Target;
