function _send({
  content,
  type = 'text/plain',
  status = 200
}) {
  this.statusCode = status;
  this.setHeader('Content-Type', type);
  this.end(content);
}

;

function _set(prop, val) {
  this[prop] = val;
}

;

function _next(req, res) {
  this.index += 1;
  this.queue[this.index](req, res);
}

;

const decor = (req, res) => {
  req.set = _set;
  req.next = _next.bind(req);
  res.send = _send;
};

export default decor;
import { _body, _cookie } from './plugins.js';
import { list } from './utils.js';
import decor from './decor.js';

class Lieve {
  constructor(routes) {
    this.routes = routes;
    this.list = list(routes);
    this.index = 0;
    this.find = this.find.bind(this);
    this.router = this.router.bind(this);
  }

  find(url) {
    const params = [];

    const pieceOrParam = e => this.list.indexOf(e) > -1 ? e : (() => {
      params.push(e);
      return ':par';
    })();

    const path = '/' + url.replace(/\/$/g, '').split('/').slice(1).map(pieceOrParam).join('/');
    return {
      path,
      params
    };
  }

  router(req, res) {
    const {
      url,
      method
    } = req;
    decor(req, res);

    try {
      // before/after every request
      const {
        before = [],
        after = []
      } = this.routes;
      const {
        path,
        params
      } = this.find(url);
      req.set('params', params);
      const route = this.routes[path] || {}; // pre/post route handler

      const {
        pre = [],
        post = []
      } = route;
      const handler = route[method];
      if (typeof handler !== 'function') throw new Error('undefined endpoint');
      const queue = [...before, ...pre, handler, ...post, ...after];
      req.set('queue', queue);
      req.set('index', 0);
      queue[0](req, res);
    } catch (err) {
      res.send({
        type: 'application/json',
        status: 404,
        content: JSON.stringify({
          error: 'Not Found',
          status: 404
        })
      });
    }
  }

}

;
export default {
  Lieve,
  _body,
  _cookie
};
function _body(req, type) {
  return new Promise(resolve => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString();

      switch (type) {
        case 'x-www-form-urlencoded':
          const parsed = {};
          body.split('&').map(e => {
            const [prop, value] = e.split('=');
            parsed[prop] = value;
          });
          resolve(parsed);
          break;

        case 'binary':
          resolve({
            file: body
          });
          break;

        default:
          resolve(body);
      }
    });
  });
}

;

function _cookie(req) {
  const {
    cookie
  } = req.headers;
  if (!cookie) return {};
  const basket = {};
  cookie.split(';').forEach(e => {
    const [prop, value] = e.split('=').map(e => e.trim());
    basket[prop] = value;
  });
  return basket;
}

export default {
  _body,
  _cookie
};
const list = routes => {
  const pieces = Object.keys(routes).map(e => e.split('/').slice(1)).flat().filter(e => e !== ':par'); // not working => use `reduce`
  // return [...new Set(pieces)]

  return pieces;
};

export default {
  list
};
