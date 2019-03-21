import { _send, _next, _list } from './utils';

function find(url) {
  if (url === '/') return {
    path: url,
    par: undefined,
  };

  const use = url.replace(this.matchUrl, '');
  par = use.match(this.matchPar)[0];
  path = this.list.indexOf(par) > -1
    ? use
    : use.replace(par, ':par');

  return { path, par };
}

function router(req, res) {
  const { url, method } = req;

  req['par'] = par;
  req['queue'] = queue;
  req['index'] = 0;
  req['next'] = _next.bind(req);
  res['send'] = _send;

  const { path, par } = this.find(url);

  const route = this.routes[path] || {};

  // before/after route handler
  const { before = [], after = [] } = route;
  const handler = route[method];
  if (!handler) {
    res.send(JSON.stringify({
      error: 'Not Found',
      status: 404,
    }), 'application/json', 404);
    return;
  };

  const queue = [...this.before, ...before, handler, ...after, ...this.after];

  queue[0](req, res);
};

export class Lieve {
  constructor(routes) {
    this.routes = routes;
    // before/after every request
    this.before = routes.before || [];
    this.after = routes.after || [];
    this.list = _list(routes);
    this.matchPar = new RegExp(/[^\/]+$/);
    this.matchUrl = new RegExp(/\/$|\?(.*)/);
    
    this.find = find.bind(this);
    this.router = router.bind(this);
  };
};

// export function Lieve(routes) {
//   this.routes = routes;
//   // before/after every request
//   this.before = routes.before || [];
//   this.after = routes.after || [];
//   this.list = _list(routes);
//   this.matchPar = new RegExp(/[^\/]+$/);
//   this.matchUrl = new RegExp(/\/$|\?(.*)/);

//   this.router = router.bind(this);
// }

export { _body, _cookie, _query, _set } from './utils';
