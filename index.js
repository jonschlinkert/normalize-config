'use strict';

var expand = require('expand');
var forOwn = require('for-own');
var set = require('set-value');
var get = require('get-value');
var utils = require('./lib/utils');
var Task = require('./lib/task');

function Config(config) {
  this.tasks = {};
  this.normalize(config || {});
}

Config.prototype.normalize = function(config) {
  forOwn(expand(config), function (task, name) {
    if (this.isTask(task)) {
      set(this.tasks, name, new Task(name, task, this));
    } else {
      set(this, name, task);
    }
  }, this);
  return this;
};

Config.prototype.task = function(prop) {
  return get(this.tasks, prop);
};

Config.prototype.get = function(prop) {
  return get(this, prop);
};

Config.prototype.isTask = function(obj) {
  var keys = ['src', 'files'];
  if (hasAny(obj, keys)) {
    return true;
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (hasAny(obj[key], keys)) return true;
    }
  }
  return false;
};

Config.prototype.toArray = function(task, target) {
  if (typeof task === 'string') {
    return this.tasks[task].toArray(target);
  }
  var tasks = [];
  forOwn(this.tasks, function (task, name) {
    if (name !== 'options' && name !== 'name') {
      tasks.push.apply(tasks, task.toArray());
    }
  });
  return tasks;
};

function hasAny(obj, arr) {
  var len = arr.length;
  while (len--) {
    if (utils.has(obj, arr[len])) {
      return true;
    }
  }
  return false;
}

/**
 * Expose `Config`
 */

module.exports = Config;
