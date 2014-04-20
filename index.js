const glob = require('globule');
const _ = require('lodash');
const utils = require('./lib/utils');



/**
 * Run a series of tasks.
 *
 * @param   {Object}  config   Series of tasks to run
 * @param   {Object}  options  Options to pass to globule
 * @return  {Array}  normalized tasks
 */

function normalize (configObject) {
  var config = _.cloneDeep(configObject);

  return _.flatten(_.map(config, function (taskConfig) {
    var taskOpts = _.extend({}, taskConfig.options);
    return [].concat.apply(normalize.task(taskConfig, taskOpts));
  }));
}



/**
 * Queue all of the normalized targets for a task.
 *
 * @param   {Object}  taskConfig  The targets and options for a task.
 * @param   {String}  task        The name of the task
 * @return  {Array}  normalized targets
 */

normalize.task = function(config) {
  var taskConfig = _.extend({}, config);
  var taskOpts = {};

  if ('options' in config) {
    _.extend(taskOpts, config.options);
  }

  return _.map(taskConfig, function (targetConfig) {
    return normalize.target(targetConfig, taskOpts);
  });
};


/**
 * Normalize the files and options for each target
 *
 * @param   {Object}  config  The config object with files and options.
 * @param   {String}  target  The name of the current target
 * @return  {Object}  normalized files and options.
 */

normalize.target = function(targetConfig, taskOpts) {
  var targetOpts = _.extend({}, targetConfig.options);
  var options = _.extend({}, taskOpts, targetOpts);

  if (_.isArray(targetConfig.files)) {
    return normalize.filesArray(targetConfig.files, options);
  } else if (_.isObject(targetConfig.files)) {
    return normalize.filesObject(targetConfig.files, options);
  } else {
    return normalize.filePair(targetConfig, options);
  }
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

normalize.filePair = function(targetConfig, options) {
  var config = _.cloneDeep(targetConfig);
  var orig = config, files = [];
  var siftedConfig = utils.sift(config).config;
  var siftedOptions = utils.sift(config).options;

  _.extend(siftedConfig, utils.sift(options).config);
  _.extend(siftedOptions, utils.sift(options).options);

  // console.log(siftedConfig)

  if (!_.isEmpty(options)) {
    _.extend(orig, {options: options});
  }

  var result = {
    orig: orig,
    options: _.defaults(siftedOptions, options)
  };

  if ('mapping' in siftedOptions) {
    files.push(glob.findMapping(siftedConfig));
  } else {
    result.src = glob.find(siftedConfig);
    if (config.dest) {
      result.dest = config.dest;
    }
    if (result.src.length === 0) {
      delete result.src;
    }
  }
  delete result.options;

  files.push(result);
  return _.flatten(files);
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

normalize.filesObject = function(config, options) {
  var filesObjects = [];

  for (var prop in config) {
    filesObjects.push({src: config[prop], dest: prop});
  }

  return _.flatten(normalize.filesArray(filesObjects, options));
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

normalize.filesArray = function(config, options) {
  return _.flatten(_.map(config, function (targetConfig) {
    return normalize.filePair(targetConfig, options);
  }));
};


module.exports = normalize;