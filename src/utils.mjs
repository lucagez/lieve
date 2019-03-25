function _body(req, type) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      switch (type) {
        case 'x-www-form-urlencoded':
          const parsed = {};
          body.split('&').forEach((e) => {
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
}

function _cookie(req) {
  const { cookie } = req.headers;
  if (!cookie) return {};
  const basket = {};
  cookie.split(';').forEach((e) => {
    const [prop, value] = e.split('=').map(f => f.trim());
    basket[prop] = value;
  });
  return basket;
}

function _query(req, delimiter = '&') {
  const { url } = req;
  const query = {};
  url.match(/[^?]+$/)[0].split(delimiter).forEach((e) => {
    const [prop, value] = e.split('=');
    query[prop] = value;
  });
  return query;
}

function _set(req, prop, value, writable = false) {
  Object.defineProperty(req, prop, {
    value,
    writable,
  });
}

function _send(content, type = 'text/plain', status = 200) {
  // use this for `turbo-http`
  // this.statusCode = status;
  // this.setHeader('Content-Type', type);

  // use this for core `http`
  this.writeHead(status, {
    'Content-Type': type,
    // 'Content-Length': Buffer.from(content).length,
  });
  this.end(content, null, null);
}

function _next(req, res) {
  this.index += 1;
  const func = this.queue[this.index];
  if (func) func(req, res);
}

function _dummy(err) {
  if (err) throw new Error(err);
  return 0;
}

function _express(req, res, middleware, args = []) {
  const { next } = req;
  middleware(...args)(req, res, _dummy);
  next(req, res);
}

export {
  _body,
  _cookie,
  _query,
  _send,
  _set,
  _next,
  _express,
};
