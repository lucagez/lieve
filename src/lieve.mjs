import { _send, _next, _list } from './utils';

export class Lieve {
  constructor(routes) {
    this.routes = routes;
    // before/after every request
    this.before = routes.before || [];
    this.after = routes.after || [];
    this.list = _list(routes);
    this.matchPar = new RegExp(/[^\/]+$/);
    this.matchUrl = new RegExp(/\/$|\?(.*)/);

    this.find = this.find.bind(this);
    this.router = this.router.bind(this);
  };

  find(url) {
    // Super-fast mode finds only last :par
    const use = url.replace(this.matchUrl, '');
    const par = use.match(this.matchPar)[0];
    const path = this.list.indexOf(par) > -1
      ? use
      : use.replace(par, ':par');

    // Using the following algo you can find multiple params inside an url
    // NOTE: the following only works if `this.list` is an array => modify `_list` function
    // const path = '/' + url
    //   .replace(/\/$/g, '')
    //   .split('/').slice(1)
    //   .map(e => this.list.indexOf(e) > -1
    //     ? e
    //     : (() => {
    //       par.push(e);
    //       return ':par';
    //     })())
    //   .join('/');

    return { path, par };
  };

  router(req, res) {
    res.send = _send;
    const { url, method } = req;
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

    req.par = par;
    req.queue = queue;
    req.index = 0;
    req.next = _next.bind(req);

    queue[0](req, res);
  };
};

export { _bodyParser, _cookieParser, _queryParser, _set } from './utils';
