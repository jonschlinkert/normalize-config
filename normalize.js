var util = require('util');
var omit = require('object.omit');
var pick = require('object.pick');
var merge = require('mixin-deep');
var typeOf = require('kind-of');
var utils = require('./lib/utils');
var optsKeys = utils.optsKeys;

var inspect = function(obj) {
  return util.inspect(obj, null, 10);
};


// function normalize(val, args) {
//   // args is a number when `normalize` is passed to `Array.map`
//   if (arguments.length > 1 && typeof args !== 'number') {
//     val = toObject.apply(null, arguments);
//   }

//   if (typeof val === 'string' || Array.isArray(val) || !val.hasOwnProperty('files')) {
//     val = {files: arrayify(val)};
//   }

//   var opts = pick(val, ['cwd']);
//   var files = arrayify(val.files);
//   var len = files.length, i = -1;
//   var arr = [], src;

//   while (++i < len) {
//     var ele = files[i];
//     var orig = ele, eleOpts, rest;

//     if (typeof ele === 'string') {
//       arr = [{src: files}];
//       break;
//     } else if (typeof ele === 'object' && !has(ele, ['src', 'dest'])) {
//       eleOpts = pick(ele, optsKeys);
//       rest = omit(ele, optsKeys);
//       ele = toSrcDest(rest);
//       ele.options = eleOpts;
//     } else if ('src' in ele) {
//       var temp = {src: arrayify(ele.src)};
//       temp.dest = ele.dest;
//       ele = temp;
//     }

//     if (typeof orig === 'object') {
//       ele.options = pick(orig, optsKeys);
//     }
//     arr = arr.concat(arrayify(ele));
//   }

//   var res = {options: opts, files: arr};
//   return res;
// }

// function toObject(src, dest, options) {
//   if (isObject(dest)) {
//     options = dest;
//     dest = null;
//   }
//   var obj = {};
//   obj.src = isValidSrc(src) ? arrayify(src) : [];
//   if (isValidDest(dest)) {
//     obj.dest = dest;
//   }
//   if (isObject(options)) {
//     obj.options = options;
//   }
//   return obj;
// }

// function toSrcDest(obj) {
//   var files = [];
//   for (var key in obj) {
//     files.push({src: arrayify(obj[key]), dest: key});
//   }
//   return files;
// }

// // function toFiles(val) {
// //   var files = arrayify(val.files || []);
// //   delete val.files;

// //   files.push(val);
// // }

// function pickOpts(val) {
//   return pick(val, ['cwd']);
// }

// function has(val, keys) {
//   keys = arrayify(keys);
//   var len = keys.length;
//   while (len--) {
//     if (keys[len] in val) {
//       return true;
//     }
//   }
//   return false;
// }

// function pickPair(val) {
//   return pick(val, ['src', 'dest']);
// }

// function isValidSrc(val) {
//   return val && (isArray(val) || typeof val === 'string');
// }

// function isValidDest(val) {
//   return val && typeof val === 'string';
// }

// function isFilesObject(ele) {
//   return !('src' in ele)
//     && !('dest' in ele)
//     && !('files' in ele);
// }

function isArray(val) {
  return Array.isArray(val);
}

function isObject(val) {
  return val && !isArray(val)
    && typeof val === 'object';
}

function arrayify(val) {
  return isArray(val) ? val : [val];
}

function sortObjects(val) {
  val.files = val.files.map(function (ele) {
    var keys = Object.keys(ele);
    var obj = {};
    obj.options = ele.options || {};
    if (ele.src) obj.src = ele.src;
    if (ele.dest) obj.dest = ele.dest;
    keys.forEach(function (key) {
      if (key !== 'options' && key !== 'src' && key !== 'dest') {
        obj[key] = ele[key];
      }
    });
    return obj;
  });
  return val;
}

function toFiles(val) {
  return {files: [normalizeSrc(val)]};
}

function normalizeString(val) {
  return toFiles({src: [val]});
}

function normalizeOptions(obj) {
  obj.options = obj.options || {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (optsKeys.indexOf(key) > -1) {
        obj.options[key] = obj[key];
        delete obj[key];
      }
    }
  }
  return obj;
}

function normalizeFiles(val) {
  var res = normalize(val.files || val);
  return res.files;
}

// this means that src, dest and files are absent,
// so this might be file objects, like:
//=> {'foo/': '*.js'}
function filesObjects(val) {
  for (var key in val) {
    if (key !== 'options') {
      val.src = arrayify(val[key]);
      val.dest = key;
      delete val[key];
    }
  }
  return {files: [val]};
}

function normalizeSrc(val) {
  if (val.src) {
    val.src = arrayify(val.src);
  }
  return val;
}

function normalizeArray(arr) {
  if (typeof arr[0] === 'string') {
    return toFiles({src: arr});
  }
  return {files: reduceFiles(arr)};
}

function normalizeObject(val) {
  val = normalizeOptions(val);

  if ('src' in val || 'dest' in val) {
    return toFiles(val);
  }

  if (!('files' in val)) {
    return filesObjects(val);
  }

  if (isArray(val.files)) {
    val.files = reduceFiles(val.files);

  } else if (isObject(val.files)) {
    val.files = normalizeFiles(val);
  }
  return val;
}

function reduceFiles(files, fn) {
  return files.reduce(function (acc, ele) {
    var res = normalize(ele);
    acc.push.apply(acc, res.files);
    return acc;
  }, []);
}

function normalize(val) {
  var res = null;
  switch(typeOf(val)) {
    case 'string':
      res = normalizeString(val);
      break;
    case 'object':
      res = normalizeObject(val);
      break;
    case 'array':
      res = normalizeArray(val);
      break;
    default: {
      res = val;
      break;
    }
  }
  return sortObjects(res);
}


var configs = [
  '*.js',
  ['foo', 'bar', '*.js'],
  {'foo/': '*.js', cwd: 'a'},
  {files: {'foo/': '*.js', cwd: 'e'}},
  {files: [{'foo/': '*.js', cwd: 'f'}]},
  {dest: 'foo/', src: '*.js', cwd: 'b'},
  {dest: 'foo/', src: ['*.js'], options: {cwd: 'c'}},
  [{dest: 'foo/', src: ['*.js']}],
  [{dest: 'foo/', src: ['*.js'], cwd: 'd'}],
  {files: {dest: 'foo/', src: ['*.js'], cwd: 'g'}},
  {files: [{dest: 'foo/', src: ['*.js'], cwd: 'h'}]},
];

var validate = require('./validate');

var res = configs.map(function (config) {
  // console.log('BEFORE:', inspect(config))
  config = normalize(config);
  console.log('AFTER:', inspect(config))
  // validate(config);
  return config;
});
// console.log(res)


