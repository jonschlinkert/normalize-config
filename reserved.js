'use strict';

/**
 * "reserved" keys. These are keys that are necessary
 * to separate from config, so we don't arbitrarily try
 * to expand options keys into src-dest mappings.
 *
 * These are keys that are typically passed as options
 * to glob, globule, globby expand-config, etc.
 */

module.exports = [
  // task keys
  'options',

  // target keys
  'files',
  'src',
  'dest',

  // opts keys
  'base',
  'cwd',
  'destBase',
  'srcBase',
  'expand',
  'ext',
  'extDot',
  'extend',
  'flatten',
  'rename',
  'process'
];
