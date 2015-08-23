'use strict';

var path = require('path');
var parsePath = require('parse-filepath');
var merge = require('mixin-deep');
var clone = require('clone-deep');
var pick = require('object.pick');
var omit = require('object.omit');
var expand = require('expand');
var flatten = require('arr-flatten');
var extend = require('extend-shallow');
var glob = require('globby');
var has = require('has-value');
var utils = require('./utils');
var Node = require('./node');

var reserved = ['options', 'dest', 'src', 'files'];


function Files(files, target) {
  return this.normalize(files, target);
}

Files.prototype.normalize = function(files, target) {
  files = utils.arrayify(files || []);
  var res = files.reduce(function (acc, obj) {
    acc.push(this.mapFiles(obj, target));
    return acc;
  }.bind(this), []);
  return flatten(res);
};

Files.prototype.mapFiles = function(group, target) {
  var root = pick(target, reserved);
  var rest = omit(target, reserved);
  merge(root.options, rest);

  var node = new Node(group, root);
  this.expand(node);

  if (node.options.expand) {
    return this.expandMapping(node, root);
  }
  return node;
};

Files.prototype.expand = function(node) {
  node.src = glob.sync(node.src, node.options);
  return node;
};

Files.prototype.expandMapping = function(node, target) {
  var len = node.src.length, i = -1;
  var files = [];
  while (++i < len) {
    files.push(this.createNode(node.src[i], node, target));
  }
  return files;
};

Files.prototype.createNode = function(src, node, target) {
  var opts = extend({rename: utils.rename}, node.options);
  // var root = pick(clone(node), reserved);
  // var rest = omit(clone(node), reserved);
  // root.options = merge({}, root.options, rest);

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

  var destBase = node.dest || opts.destBase || res.dest;
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
