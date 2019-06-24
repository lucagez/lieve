const { deSlash } = require('./_utils');

function redirect(arg, router) {
  // case string => route extension
  const newRoutes = new Map();
  const {
    routes, asRegistered, middlewares, errMiddlewares,
  } = router;
  const prefix = deSlash(arg);

  // Inheriting old routes and prefixing with new parent router
  routes.forEach((handler, str) => newRoutes.set(`${prefix}${str}`, handler));

  // Merging new Routes and registered endpoints with the ones that
  // were previously stored.
  this.routes = new Map([
    ...Array.from(this.routes),
    ...Array.from(newRoutes),
  ]);

  // new asRegistered => update for new prefix
  this.asRegistered = [
    ...this.asRegistered,
    ...asRegistered.map(path => `${prefix}${path}`),
  ];

  // Inheriting old middlewares
  this.middlewares = [
    ...this.middlewares,
    ...middlewares,
  ];

  // Inheriting old errMiddlewares
  this.errMiddlewares = [
    ...this.errMiddlewares,
    ...errMiddlewares,
  ];
}

module.exports = redirect;
