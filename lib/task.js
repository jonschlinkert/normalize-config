'use strict';

var forOwn = require('for-own');
var extend = require('extend-shallow');
var Target = require('./target');
var utils = require('./utils');

var reserved = [
  // task "id" properties
  'name',
  'target',

  // plugin-related
  'deps',
  'pipeline',
  'run',

  // config-related
  'parent',
  'options',
  'files',
  'dest',
  'src',
];

function Task(name, targets) {
  this.name = name;
  this.normalize(targets || {});
}

Task.prototype.normalize = function(targets) {
  var parent = this;
  forOwn(targets, function (val, key) {
    if (!utils.contains(reserved, key)) {
      val.task = parent.name;
      val.target = key;
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
