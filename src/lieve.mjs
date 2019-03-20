import { _body, _cookie } from './plugins';
import { list } from './utils';
import decor from './decor';

class Lieve {
  constructor(routes) {
    this.routes = routes;
    this.list = list(routes);
    this.index = 0;

    this.find = this.find.bind(this);
    this.router = this.router.bind(this);
  };


  find(url) {
    const params = [];

    const pieceOrParam = e => this.list.indexOf(e) > -1
      ? e
      : (() => {
        params.push(e);
        return ':par';
      })();

    const path = '/' + url
      .replace(/\/$/g, '')
      .split('/').slice(1)
      .map(pieceOrParam)
      .join('/');

    return { path, params };
  };

  router(req, res) {
    const { url, method } = req;
    decor(req, res);
    try {
      // before/after every request
      const { before = [], after = [] } = this.routes;
      const { path, params } = this.find(url);

      const route = this.routes[path] || {};
      // pre/post route handler
      const { pre = [], post = [] } = route;
      const handler = route[method];
      if (typeof handler !== 'function') throw new Error('undefined endpoint');

      const queue = [...before, ...pre, handler, ...post, ...after];
      
      req.set('params', params);
      req.set('queue', queue);
      req.set('index', 0);

      queue[0](req, res);
    } catch (err) {
      res.send({
        type: 'application/json',
        status: 404,
        content: JSON.stringify({
          error: 'Not Found',
          status: 404,
        }),
      });
    }
  };
};

export {
  Lieve,
  _body,
  _cookie,
};