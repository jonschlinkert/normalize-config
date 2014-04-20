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

function normalize (config) {
  var obj = _.cloneDeep(config);

  return _.flatten(_.map(obj, function (taskConfig) {
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

normalize.task = function(config, options) {
  var taskConfig = _.extend({}, config);
  var taskOpts = _.extend({}, options);

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

  if ('src' in targetConfig || 'dest' in targetConfig) {
    return normalize.filePair(targetConfig, options);
  } else if (_.isArray(targetConfig.files)) {
    return normalize.filesArray(targetConfig.files, options);
  } else if (_.isObject(targetConfig.files)) {
    return normalize.filesObject(targetConfig.files, options);
  } else {
    return _.extend({}, {options: taskOpts});
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

normalize.filePair = function(config, options) {
  // config = utils.arrayify(config);
  var arr = [];

  // console.log(config)

  // config.forEach(function(configObj) {
  //   var obj = _.cloneDeep(configObj);
  //   var sifted = utils.siftOptions(configObj);

  //   // if (isInvalidTarget(obj)) {return;}

  //   var result = {
  //     orig: configObj,
  //     options: _.defaults(sifted.options, options)
  //   };

  //   if ('mapping' in sifted.options) {
  //     glob.findMapping(sifted.config).map(function(ea) {
  //       _.extend(result, ea);
  //     });
  //   } else {
  //     _.extend(result, {
  //       src: glob.find(sifted.config),
  //       dest: obj.dest
  //     });
  //   }

  //   arr.push(result);
  // });
  return arr;
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
  var arr = [];

  for (var prop in config) {
    arr.push({src: config[prop], dest: prop});
  }

  return normalize.filePair(arr, options);
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
  return _.map(config, function (obj) {
    return normalize.filePair(obj, options);
  });
};


module.exports = normalize;