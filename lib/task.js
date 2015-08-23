'use strict';

var forOwn = require('for-own');
var Target = require('./target');
var utils = require('./utils');

var reserved = ['options', 'files', 'dest', 'src', 'parent', 'data', 'pipeline', 'run'];

function Task(config) {
  this.normalize(config);
}

Task.prototype.normalize = function(config) {
  forOwn(config, function (val, key) {
    if (!utils.contains(reserved, key)) {
      this[key] = new Target(val, this);
    } else {
      this[key] = val;
    }
  }, this);
  return this;
};

/**
 * Expose `Task`
 */

module.exports = Task;