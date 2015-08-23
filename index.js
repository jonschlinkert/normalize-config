'use strict';

var expand = require('expand');
var forOwn = require('for-own');
var set = require('set-value');
var get = require('get-value');
var Task = require('./lib/task');

function Config(config) {
  this.tasks = {};
  this.normalize(config || {});
}

Config.prototype.normalize = function(config) {
  forOwn(expand(config), function (task, name) {
    set(this.tasks, name, new Task(name, task, this));
  }, this);
  return this;
};

Config.prototype.task = function(prop) {
  return get(this.tasks, prop);
};

Config.prototype.get = function(prop) {
  return get(this, prop);
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

/**
 * Expose `Config`
 */

module.exports = Config;
