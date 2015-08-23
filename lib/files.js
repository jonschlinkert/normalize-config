'use strict';

var define = require('define-property');
var extend = require('extend-shallow');
var forOwn = require('for-own');
var Node = require('./node');
var utils = require('./utils');

function Files(config) {
  this.expand(config);
}

Files.prototype.expand = function(config) {

    console.log(files)
  config.files.forEach(function (fp) {
    fp.options = merge({}, config.options, fp.options);
    fp = new Node(fp, config);
  });
  return config;
};

/**
 * Expose `Files`
 */

module.exports = Files;
