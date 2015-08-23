'use strict';

var omit = require('object.omit');
var forOwn = require('for-own');
var extend = require('extend-shallow');
var merge = require('mixin-deep');
var Target = require('./target');
var utils = require('./utils');

var reserved = [
  'options',
  'files',
  'dest',
  'src',
  'parent',
  'target',
  'name',
  'pipeline',
  'run',
  'deps'
];

function Task(name, targets) {
  this.name = name;
  this.normalize(targets || {});
}

Task.prototype.normalize = function(targets) {
  var parent = this;
  forOwn(targets, function (val, key) {
    val.task = parent.name;
    val.target = key;

    if (!utils.contains(reserved, key)) {
      parent[key] = new Target(val, parent);
    } else {
      parent.options = parent.options || {};
      if (key !== 'options') {
        parent.options[key] = val;
      } else {
        extend(parent.options, val);
      }
    }
  });
  return this;
};

Task.prototype.toArray = function(name) {
  if (typeof name === 'string') {
    return this[name].toArray();
  }
  var targets = [];
  forOwn(this, function (target, name) {
    if (name !== 'options' && name !== 'name') {
      targets = targets.concat(target.toArray());
    }
  });
  return targets;
};

/**
 * Expose `Task`
 */

module.exports = Task;
