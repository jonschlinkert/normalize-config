
'use strict';

var merge = require('mixin-deep');
var clone = require('clone-deep');
var omit = require('object.omit');
var pick = require('object.pick');
var flatten = require('arr-flatten');
var forOwn = require('for-own');
var define = require('define-property');
var Files = require('./files');
var utils = require('./utils');

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
  parent = parent || this;
  define(target, 'parent', parent);
  if (parent.options) {
    target.options = merge({}, parent.options, target.options);
  }

  var files = target.files || pick(target, ['src', 'dest']);
  if (!utils.isEmpty(files)) {
    target.files = utils.arrayify(files);
  }

  target = omit(target, ['src', 'dest']);
  forOwn(target, function (val, key) {
    this[key] = clone(val);
  }, this);

  this.files = new Files(target.files, this);
  return this;
};

Target.prototype.toArray = function() {
  return this.files.reduce(function (acc, node) {
    return acc.concat(merge(omit(this, ['files']), node));
  }.bind(this), []);
};


module.exports = Target;
