const _ = require('lodash');

function Target (name, config) {
  this.name = name;
  this._config = _.cloneDeep(config || {});
  this._options = this._config.options || {};
  this._srcArr = [];
  this._destArr = [];
}

Target.prototype.src = function (src, options) {
  this._srcArr.push({src: src, options: options});
};

Target.prototype.dest = function (dest, options) {
  this._destArr.push({dest: dest, options: options});
};

Target.prototype.normalize = function (config) {
  return config;
};

module.exports = Target;
