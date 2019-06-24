/**
 * Utility that print registered routes
 */

const { METHODS } = require('http');
const { deSlash } = require('./_utils');

function printr() {
  // Defaults to alfabetical order
  const absolute = this.asRegistered.sort();

  const byPath = this.asRegistered
    .reduce((obj, path) => ({
      ...obj,
      [path]: Object.keys(
        this.routes.get(
          deSlash(path),
        ),
      ),
    }), {});

  const byMethod = METHODS
    .map(method => ({
      method,
      paths: this.asRegistered
        .map(path => (this.routes.get(deSlash(path)) || {})[method] && path)
        .filter(Boolean),
    }))
    .filter(method => method.paths.length > 0)
    .reduce((obj, { method, paths }) => ({
      ...obj,
      [method]: paths,
    }), {});

  return {
    absolute,
    byPath,
    byMethod,
  };
}

module.exports = printr;
