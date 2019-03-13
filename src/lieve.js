const pipe = ops => ops.reduce((a, b) => (ctx) => b(a(ctx)));

const body = req => new Promise(resolve => {
  const chunks = [];
  req.on('data', chunk => chunks.push(chunk))
  req.on('end', () => {
    formed = Buffer.concat(chunks).toString()
    resolve(formed);
  });
});

class Lieve {
  constructor(routes) {
    this.routes = routes;
    this.list = Object.keys(routes)
      .map(e => e.split('/').slice(1))
      .flat().filter(e => e !== ':par');

    this.find = this.find.bind(this);
    this.router = this.router.bind(this);
  }

  find(url) {
    const params = [];
    const path = '/' + url
      .replace(/\/$/g, '')
      .split('/').slice(1)
      .map(e => {
        if (this.list.indexOf(e) !== -1) return e;
        else {
          params.push(e);
          return ':par';
        }
      })
      .join('/');

    return { path, params };
  }

  router(req, res) {
    const { url, method } = req;

    try {
      // before/after every request
      const { before = [], after = []} = this.routes;
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
}

module.exports = Lieve;