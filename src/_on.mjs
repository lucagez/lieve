import { deSlash, arrayIsMadeOfFuncs } from './_utils';

function on(method) {
  return function onScoped(endpoint, middlewares, handler) {
    // error handling
    if (typeof handler !== 'function') throw new TypeError('Handler must be a function');
    if (!Array.isArray(middlewares)) throw new TypeError('Middlewares must be an array');
    if (middlewares.length > 0 && arrayIsMadeOfFuncs(middlewares)) throw new TypeError('Every middleware should be a function');

    const normalized = deSlash(endpoint);
    this.asRegistered.push(endpoint);


    // `actual` is the object containing every handler specific for every
    // method belonging to the same endpoint.
    const actual = this.routes.get(normalized) || {};
    this.routes.set(normalized, {
      ...actual,
      [method]: [
        // specific to this handler
        ...middlewares,
        // handler after all
        handler,
      ],
    });
  };
}

export default on;
