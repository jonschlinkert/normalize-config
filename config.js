
var _ = require('lodash');

var Target = require('./target');

function Config (target, _config) {
  if (arguments.length <= 1) {
    _config = target || {};
    target = 'default';
  }
  this._targets = {};
  this._config = _.cloneDeep(_config || {});
  this._options = this._config.options || {};
  this.currentTarget = this.createTarget(target, _config);
}

Config.prototype.createTarget = function (target, _config) {
  if (!_.has(target, this._targets)) {
    this._targets[target] = new Target(target, _config);
  }
  return this._targets[target];
};

Config.prototype.target = function (target, _config) {
  if (arguments.length <= 1) {
    _config = target || {};
    target = 'default';
  }
  this.currentTarget = this.createTarget(target, _config);
  return this;
};

module.exports = Config;
