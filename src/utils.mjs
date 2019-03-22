const _body = (req, type) => {
  return new Promise(resolve => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk))
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
          resolve({ file: body });
          break;
        default:
          resolve(body);
      }
    });
  });
};

const _cookie = req => {
  const { cookie } = req.headers;
  if (!cookie) return {};
  const basket = {};
  cookie.split(';').forEach(e => {
    const [prop, value] = e.split('=').map(e => e.trim());
    basket[prop] = value;
  });
  return basket;
};

const _query = (req, delimiter = '&') => {
  const { url } = req;
  const query = {};
  url.match(/[^?]+$/)[0].split(delimiter).map(e => {
    const [prop, value] = e.split('=');
    query[prop] = value;
  });
  return query;
};

const _list = (routes) => {
  const pieces = Object.keys(routes)
    .map(e => e.split('/').slice(1))
    .flat()
    .filter(e => e !== ':par');

  return Array.from(new Set(pieces))//.join();
};

const _set = (req, prop, value, writable = false) => {
  Object.defineProperty(req, prop, {
    value,
    writable,
  });
};

function _send(content, type = 'text/plain', status = 200) {
  // use this for `turbo-http`
  this.statusCode = status;
  this.setHeader('Content-Type', type);

  // use this for core `http`
  // this.writeHead(status, { 'Content-Type': type });
  
  this.end(content, false, false);
};

function _next(req, res) {
  this.index += 1;
  return this.queue[this.index](req, res);
};

function _dummy(err) {
  if (err) throw new Error(err);
  return;
};

function _express(req, res, middleware, args = []) {
  const { next } = req;
  middleware(...args)(req, res, _dummy);
  next(req, res);
};

export {
  _body,
  _cookie,
  _query,
  _send,
  _set,
  _next,
  _list,
  _express,
};

