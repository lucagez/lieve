const { METHODS } = require('http');
const _on = require('./_on');
const _redirect = require('./_redirect');
const _use = require('./_use');
const _start = require('./_start');
const _buildDefaultConfig = require('./_defaultConfig');
const _printr = require('./_printr');

class Lieve {
  constructor(config = {}) {
    if (config && typeof config !== 'object') throw new TypeError('Config must be of type object');

    this.routes = new Map();
    this.asRegistered = [];
    this.middlewares = [];
    this.errMiddlewares = [];
    this.lookup = null;
    this.find = null;

    _buildDefaultConfig.bind(this)(config);

    // Adding all supported methods
    // => calling router.[method] instead of .on([method])
    // => mostly for saving horizontal space
    METHODS.forEach((method) => {
      this[method] = _on(method).bind(this);
    });

    this.printr = _printr.bind(this);
    this.redirect = _redirect.bind(this);
    this.use = _use('middlewares').bind(this);
    this.err = _use('errMiddlewares').bind(this);
    this.start = _start.bind(this);
  }
}

module.exports = Lieve;
