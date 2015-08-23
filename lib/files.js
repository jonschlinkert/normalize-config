'use strict';

var path = require('path');
var parsePath = require('parse-filepath');
var merge = require('mixin-deep');
var expand = require('expand');
var extend = require('extend-shallow');
var glob = require('globby');
var has = require('has-value');
var utils = require('./utils');
var Node = require('./node');

function Files(files, target) {
  this.normalize(files, target);
  return this;
}

Files.prototype.normalize = function(files, target) {
  this.files = this.files || [];
  if (files && files.length) {
    this.files = utils.arrayify(files);
  }
  var len = this.files.length, i = -1;
  while (++i < len) {
    this.mapFiles(this.files[i], target);
    console.log(this)

  }
  return this.files;
};

Files.prototype.mapFiles = function(group, target) {
  var node = new Node(group, target);
  this.expand(node);
  if (node.options.expand) {
    this.files = this.expandMapping(node);
  }
  return this;
};

Files.prototype.expand = function(node) {
  node.src = glob.sync(node.src, node.options);
  return node;
};

Files.prototype.expandMapping = function(node) {
  var len = node.src.length, i = -1;
  var files = [];

  while (++i < len) {
    files.push(this.createNode(node.src[i], node));
  }
  return files;
};

Files.prototype.createNode = function(src, node) {
  var opts = extend({rename: utils.rename}, node.options);

  function hasOption(prop) {
    return has(opts, prop);
  }

  var basename = path.basename(src);
  var dest = src;
  var res = {};

  if (hasOption('flatten')) {
    dest = basename;
  }
  if (hasOption('ext')) {
    dest = utils.replaceExt(dest, opts);
  }

  var destBase = opts.destBase || res.dest;
  if (hasOption('cwd')) {
    src = path.join(opts.cwd, src);
  }

  if (typeof opts.expand === 'string' && /:/.test(opts.expand)) {
    var data = merge({}, res, res.options);
    merge(data, node.options);
    merge(data, parsePath(src));
    data.dest = destBase;
    res.dest = this.interpolate(opts.expand, data);
  } else {
    res.dest = opts.rename(destBase, dest, opts);
  }
  res.src = utils.arrayify(src);
  return new Node(res);
};


Files.prototype.expandParams = function(node) {
  return node;
};

Files.prototype.flatten = function(node) {
  return node;
};

/**
 * Replace params with actual values.
 */

Files.prototype.interpolate = function(fp, data) {
  return expand(fp, data, {
    regex: data.paramRegex || /:([^:\/-]+)/g
  });
};

/**
 * Expose `Files`
 */

module.exports = Files;
