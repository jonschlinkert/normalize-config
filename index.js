const glob = require('globule');
const _ = require('lodash');


/**
 * Run a series of tasks.
 *
 * @param   {Object}  config   Series of tasks to run
 * @param   {Object}  options  Options to pass to globule
 * @return  {Array}  normalized tasks
 */

var normalize = module.exports = function (config, opts) {
  config = _.cloneDeep(config);
  var configs = [];

  var options = _.extend({}, opts || {});

  _.map(config, function (taskConfig, taskName) {
    if ('options' in taskConfig) {
      _.extend(options, taskConfig.options);
      delete taskConfig.options;
    }

    var normalized = normalize.task(taskConfig, taskName, options);
    configs.push(normalized);
  });

  return _.flatten(configs);
};



/**
 * Returns true if both the `src` and `dest` values are empty
 * or undefined. This means it's probably the options object
 * or a malformed files config object.
 *
 * @param   {Object}   obj  The config object
 * @return  {Boolean}
 */

function isInvalidTarget(obj) {
  return _.isEmpty(obj.dest) && _.isEmpty(obj.src);
}

function slashify(arr) {
  arr = !Array.isArray(arr) ? [arr] : arr;
  return arr.map(function(filepath) {
    return filepath.replace(/\\/g, '/');
  })
}


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

normalize.expandFilePair = function(config, options) {
  options = options || {};

  if (isInvalidTarget(config)) {return;}

  if('__globule__' in options) {
    delete options.__globule__;
    _.extend(config, options);
  }

  return {
    orig: config,
    src: slashify(glob.find(config)) || '',
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

normalize.expandProps = function(config, options) {
  return [].concat.apply(normalize.expandFilePair(config, options));
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

normalize.expandObject = function(config, options) {
  return [].concat.apply(normalize.expandFilePair({
    src:  _.flatten(_.values(config)),
    dest: _.keys(config)[0]
  }, options));
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

normalize.expandArray = function(config, options) {
  return config.map(function (obj) {
    var opts = _.extend({__globule__: true}, options);
    return [].concat.apply(normalize.target(obj, opts));
  });
};


/**
 * Normalize the files and options for each target
 *
 * @param   {Object}  config  The config object with files and options.
 * @param   {String}  target  The name of the current target
 * @return  {Object}  normalized files and options.
 */

normalize.target = function(targetConfig, opts) {
  opts = opts || {};
  var files = [];

  if ('options' in targetConfig) {
    opts = _.cloneDeep(targetConfig.options);
    // Don't run task-level options as a target
    delete targetConfig.options;
  }

  if ('src' in targetConfig || 'dest' in targetConfig) {
    files = files.concat(normalize.expandProps(targetConfig, opts));
  } else if (_.isArray(targetConfig.files)) {
    files = files.concat(normalize.expandArray(targetConfig.files, opts));
  } else if (_.isObject(targetConfig.files)) {
    files = files.concat(normalize.expandObject(targetConfig.files, opts));
  }

  return _.flatten(files);
};


/**
 * Queue all of the normalized targets for a task.
 *
 * @param   {Object}  taskConfig  The targets and options for a task.
 * @param   {String}  task        The name of the task
 * @return  {Array}  normalized targets
 */

normalize.task = function(taskConfig, options) {
  return _.map(taskConfig, function (targetConfig) {
    return [].concat.apply(normalize.target(targetConfig, options || {}));
  });
};
