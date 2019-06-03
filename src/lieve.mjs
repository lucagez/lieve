import { METHODS } from 'http';
import _on from './_on';
import _redirect from './_redirect';
import _use from './_use';
import _start from './_start';
import _buildDefaultConfig from './_defaultConfig';

class Lieve {
  constructor(config = {}) {
    this.routes = new Map();
    this.asRegistered = [];
    this.middlewares = [];
    this.errMiddlewares = [];
    this.lookup = null;
    this.find = null;

    _buildDefaultConfig.bind(this)(config);

    // Adding all supported methods
    // => calling router.[method] instead of .on([method])
    METHODS.forEach((method) => {
      this[method] = _on(method).bind(this);
    });

    this.redirect = _redirect.bind(this);
    this.use = _use('middlewares').bind(this);
    this.err = _use('errMiddlewares').bind(this);
    this.start = _start.bind(this);
  }
}

export default Lieve;
