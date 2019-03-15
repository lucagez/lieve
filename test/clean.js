const pipe = ops => ops.reduce((a, b) => (ctx) => b(a(ctx)));

const body = req => new Promise(resolve => {
  const chunks = [];
  req.on('data', chunk => chunks.push(chunk))
  req.on('end', () => {
    formed = Buffer.concat(chunks).toString()
    resolve(formed);
  });
});

const list = routes => {
  const pieces = Object.keys(routes)
    .map(e => e.split('/').slice(1))
    .flat().filter(e => e !== ':par');
  return [...new Set(pieces)]
};


function _find(url) {
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
}

function _router(req, res) {
  const { url, method } = req;

  try {
    // before/after every request
    const { before = [], after = [] } = this.routes;
    const { path, params } = this.find(url);

    req.params = params;
    req.body = body;
    const route = this.routes[path] || {};

    // pre/post route handler
    const { pre = [], post = [] } = route;
    const handler = route[method];

    if (typeof handler !== 'function') throw new Error('undefined endpoint');

    pipe([...before, ...pre, handler, ...post, ...after])({ req, res });
  } catch (err) {

    // Deciding on user-defined `onError` response vs. default one.
    const { onError } = this.routes;
    onError(req, res);
  }
}

class Lieve {
  constructor(routes) {
    this.routes = routes;
    this.list = list(routes);

    this.find = this.find.bind(this);
    this.router = this.router.bind(this);
  }
  
  find = _find;
  router = _router;
}

module.exports = Lieve;