const glob = require('globule');
const log = require('verbalize');
const _ = require('lodash');


/**
 * Returns true if both the `src` and `dest` values are empty
 * or undefined. This means it's probably the options object
 * or a malformed files config object.
 *
 * @param   {Object}   obj  The config object
 * @return  {Boolean}
 */

var isInvalidTarget = function(obj) {
  return _.isEmpty(obj.dest) && _.isEmpty(obj.src);
};


/**
 * Return an `orig` object with the original,
 * unexpanded src and dest config values.
 *
 * @param   {Object}  obj  [description]
 * @return  {Object}       [description]
 */

var storeOrig = function(config) {
  return {src: config.src, dest: config.dest};
};


/**
 * Expands file patterns in the `src`property.
 *
 * @param   {Object}  config   The object with optional `src` and `dest` properties
 * @param   {Object}  options  Options to pass to globule
 * @return  {Object}           normalize to an object with the following properties
 *
 *   `src`: property containing the expanded files array,
 *   `dest`: property, and
 *   `orig`: property with the original, unexpanded `src-dest` values
 *
 * @example: `{orig: {src: '', dest: ''}, src: [, ...], dest: ''}`
  */

var expandFilePair = function(config, options) {
  options = options || {};

  if (isInvalidTarget(config)) { return; }

  return {
    orig: storeOrig(config),
    src: glob.find(config.src, options) || '',
    dest: config.dest || ''
  };
};

/**
 * Expand `src` when passed in directly, e.g.
 *
 *   `{src: '', dest: ''}`
 *
 * @param   {Object}  data     Object with `src` and/or `dest` properties
 * @param   {Object}  options to pass to globule
 * @return  {Object}
 *
 *   `[{orig: {src: '', dest: ''}, src: [, ...], dest: ''}]`
 */

var expandProps = function(data, options) {
  var files = [];
  files.push(expandFilePair(data, options));
  return files;
};


/**
 * 'expand object' Normalize `files` `src` when passed in directly, e.g.
 *
 *   `{src: '', dest: ''}`
 *
 * @param   {Object}  config  Object with `src` and/or `dest` properties
 * @param   {Object}  options to pass to globule
 * @return  {Array} normalize to an array of `src-dest` mappings
 *
 *   `[{orig: {src: '', dest: ''}, src: [, ...], dest: ''}]`
 */

var expandObject = function(config, options) {
  var files = [], fp = {};

  fp.src = _.flatten(_.values(config));
  fp.dest = _.keys(config)[0];
  files.push(expandFilePair(fp, options));
  return files;
};


/**
 * 'expand array' Expand `src` file patterns and create normalized src-dest
 * mappings for each object in an array.
 *
 *   `[{src: [''], dest: ''}, {src: [''], dest: ''}]`
 *
 * @param   {Object}  config  Object with `src` and/or `dest` properties
 * @param   {Object}  options to pass to globule
 * @return  {Array}  normalize to an array of `src-dest` mappings
 *   properties, e.g.:
 *
 *   `[{orig: {src: '', dest: ''}, src: [, ...], dest: ''}]`
 */

var expandArray = function(config, options) {
  var files = [];

  config.forEach(function (filePair) {
    files.push(expandObject(filePair, options));
  });
  return files;
};


/**
 * Normalize the files and options for each target
 *
 * @param   {Object}  config  The config object with files and options.
 * @param   {String}  target  The name of the current target
 * @return  {Object}  normalized files and options.
 */

var normalizeTarget = function(targetConfig, target) {
  var opts = {}, files = [];

  log.inform('running', target);

  if ('options' in targetConfig) {
    // Copy over task level options.
    opts = _.cloneDeep(targetConfig.options);
    // Don't run task-level options as a target
    delete targetConfig.options;
  }

  if ('src' in targetConfig || 'dest' in targetConfig) {
    files.push(expandProps(targetConfig, opts));
  } else if (_.isArray(targetConfig.files)) {
    files.push(expandArray(targetConfig.files, opts));
  } else if (_.isObject(targetConfig.files)) {
    files.push(expandObject(targetConfig.files, opts));
  }

  return files;
};


/**
 * Queue all of the normalized targets for a task.
 *
 * @param   {Object}  taskConfig  The targets and options for a task.
 * @param   {String}  task        The name of the task
 * @return  {Array}  normalized targets
 */

var queueTargets = function(taskConfig, task) {
  var files = [];

  log.runner = task;
  log.inform('running', task);

  _.forEach(taskConfig, function (targetConfig, target) {
    files.push(normalizeTarget(targetConfig, target));
  });

  return _.flatten(files);
};


/**
 * Run a series of tasks.
 *
 * @param   {Object}  config   Series of tasks to run
 * @param   {Object}  options  Options to pass to globule
 * @return  {Array}  normalized tasks
 */

module.exports = function (config, options) {
  options = options || {};
  log.writeln();

  var files = [];
  _.forEach(config, function (taskConfig, task) {
    if ('options' in taskConfig) {
      options = taskConfig.options;
      delete taskConfig.options;
    }

    // Run targets
    files.push(queueTargets(taskConfig, task));

    // Done
    log.done('done');
    log.writeln();
  });

  return _.compact(_.flatten(files));
};