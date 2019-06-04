/**
 * Utility that print registered routes
 */

import { METHODS } from 'http';
import { deSlash } from './_utils';

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
    .reduce((obj, method) => ({
      ...obj,
      [method.method]: method.paths,
    }), {});

  return {
    absolute,
    byPath,
    byMethod,
  };
}

export default printr;
