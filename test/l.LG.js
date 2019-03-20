const pipe = ops => ops.reduce((a, b) => async (ctx) => await b(a(ctx)));

// const body = req => new Promise(resolve => {
//   const chunks = [];
//   req.on('data', chunk => chunks.push(chunk))
//   req.on('end', () => {
//     formed = Buffer.concat(chunks).toString()
//     resolve(formed);
//   });
// });

const list = routes => {
  const pieces = Object.keys(routes)
    .map(e => e.split('/').slice(1))
    .flat().filter(e => e !== ':par');
  return [...new Set(pieces)]
};

// const enrich = (req, res) => new Promise(resolve => {
//   const shared = [req, res];

//   // shared `set` prop
//   const p1 = new Promise(resolve => {
//     shared.forEach(e => {
//       Object.defineProperty(e, 'set', {
//         value: function (prop, val) {
//           Object.defineProperty(this, prop, {
//             value: val,
//             writable: true,
//           })
//         }
//       });
//     });
//     resolve();
//   });

//   const p2 = new Promise(resolve => {
//     Object.defineProperty(req, 'body', {
//       value: function () {
//         return new Promise(resolve => {
//           const chunks = [];
//           this.on('data', chunk => chunks.push(chunk))
//           this.on('end', () => {
//             const body = Buffer.concat(chunks).toString()
//             resolve(body);
//           });
//         });
//       }
//     });
//     resolve();
//   });

//   const p3 = new Promise(resolve => {
//     Object.defineProperty(res, 'send', {
//       value: function (status, type, content) {
//         this.statusCode = status;
//         this.setHeader('Content-Type', type);
//         this.end(content);
//       }
//     });
//     resolve();
//   });

//   Promise.all([p1, p2, p3]).then(() => resolve());
// });

function _send(type, content) {
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

function _status(status) {
  this.statusCode = status;
}

const enrich = (req, res) => {
  const shared = [req, res];

  shared.forEach(e => {
    e.set = function (prop, val) {
      this[prop] = val;
    }
  });

  req.body = _body;

  res.status = _status;
  res.send = _send;
}

class Lieve {
  constructor(routes) {
    this.routes = routes;
    this.list = list(routes);

    this.find = this.find.bind(this);
    this.router = this.router.bind(this);
  }

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
  }

  router(req, res) {
    const { url, method } = req;
    enrich(req, res);

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
      res.status(404);
      res.send('application/json', JSON.stringify({
        status: 404,
        error: 'Not Found'
      }));
    }
  }
}

module.exports = Lieve;