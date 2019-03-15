const pipe = ops => ops.reduce((a, b) => (ctx) => b(a(ctx)));

const list = routes => {
  const pieces = Object.keys(routes)
    .map(e => e.split('/').slice(1))
    .flat().filter(e => e !== ':par');
  // not working => use `reduce`
  // return [...new Set(pieces)]
  return pieces;
};

function _send(type, content, status = 200) {
  this.statusCode = status;
  this.setHeader('Content-Type', type);
  this.end(content);
};

function _body() {
  return new Promise(resolve => {
    const chunks = [];
    this.on('data', chunk => chunks.push(chunk))
    this.on('end', () => {
      const body = Buffer.concat(chunks).toString()
      resolve(body);
    });
  });
};

function _set(prop, val) {
  this[prop] = val;
};

const decor = (req, res) => {
  req.set = _set;
  req.body = _body;
  res.send = _send;
};

class Lieve {
  constructor(routes) {
    this.routes = routes;
    this.list = list(routes);

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

      req.set('params', params);
      const route = this.routes[path] || {};

      // pre/post route handler
      const { pre = [], post = [] } = route;
      const handler = route[method];


      if (typeof handler !== 'function') throw new Error('undefined endpoint');

      pipe([...before, ...pre, handler, ...post, ...after])({ req, res });
    } catch (err) {
      res.send('application/json', JSON.stringify({
        status: 404,
        error: 'Not Found'
      }), 404);
    }
  };
};

module.exports = Lieve;